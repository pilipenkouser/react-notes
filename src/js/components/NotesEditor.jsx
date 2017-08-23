import React from 'react';
import {connect} from 'react-redux';

class NotesEditor extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			title: '',
			text: '',
			color: '#ffff00'
		}

		this.handleTextChange = this.handleTextChange.bind(this);
		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.handleColorChange = this.handleColorChange.bind(this);

		this.handleNoteAdd = this.handleNoteAdd.bind(this);
	};

	handleColorChange(color, event) {
		event.preventDefault();

		this.setState({ color });
	}

	handleTextChange(event) {
		this.setState({text: event.target.value});
	}

	handleTitleChange(event) {
		this.setState({title: event.target.value});
	}

	handleNoteAdd(event){
		const newNote = {
			title: this.state.title,
			text: this.state.text,
			color: this.state.color || '#ffff00'
		};
		// console.log( newNote );

		this.props.onAddNote(newNote);
		this.setState({text: '', title: '', color: '#ffff00'});
	}



	render() {

		const colors = ['#ffff00', '#ff00ff', '#f00', '#fff', '#0f0', '#00f', '#0ff'];

		return (
			<div className='NotesEditor'>
				<input 
					type='text'
					className='NotesEditor__title'
					placeholder='Enter title'
					value={this.state.title}
					onChange={this.handleTitleChange}
				/>
				<textarea 
					className='NotesEditor__text'
					placeholder='Enter note text'
					value={this.state.text}
					onChange={this.handleTextChange}
				/>
				<div className='NotesEditor__btns'>
					<button
						className='NotesEditor__button'
						disabled={!this.state.text}
						onClick={this.handleNoteAdd}
					>
						Add
					</button>
					<div className='NotesEditor__color'>

						{
							colors.map( color => 
								<a key={color}
									
									className={
										this.state.color == color 
										?
											'NotesEditor__color_link NotesEditor__color_link-activ' 
										: 
											'NotesEditor__color_link '
									}
									style={{backgroundColor: color}}
									onClick={this.handleColorChange.bind(null, color)}
									>
								</a>
							)
						}
							


						
					</div>
				</div>			
			</div>
		)
	}
}

export default connect(
	state => ({}),
	dispatch => ({
		onAddNote: (newNote) => {
			dispatch({type: 'ADD_NOTE', payload: newNote});
		}
	})
)(NotesEditor);

