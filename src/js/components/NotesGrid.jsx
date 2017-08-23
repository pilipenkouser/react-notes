import React from 'react';
import {connect} from 'react-redux';

import Masonry from 'react-masonry-component';
import Note from './Note.jsx';

class NotesGrid extends React.Component {

	handleNoteDelete(Note, event){
		this.props.onDeleteNote(Note);
	}

	render() {
		const masonryOptions = {
			itemSelector: '.Note',
			columnWidth: 300,
			gutter: 10,
			isFitWidth: true,
			transitionDuration: 1000
		}; 
		return (
			<Masonry
				className='NotesGrid'
				options={masonryOptions}
			>
				{
					this.props.notes.map( (note, index) => 
						<Note title={note.title} 
							text={note.text} 
							color={note.color} 
							key={index}
							onDelete={this.handleNoteDelete.bind(this, note)}
						/>
					)
				}
			</Masonry>
		)
	}
}

export default connect(
	state => ({}),
	dispatch => ({
		onDeleteNote: (Note) => {
			dispatch({type: 'DELETE_NOTE', payload: Note});
		}
	})
)(NotesGrid);

// export default NotesGrid;