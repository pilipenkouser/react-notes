import React from 'react';

class Note extends React.Component {	

	render() {
			const style = { backgroundColor: this.props.color}

		return (
				<div className='Note' key={this.props.index} style={style}>
					{
						this.props.title 
						?	
							<h1 className='Note__title'>{this.props.title}</h1> 
						: 
							null 
					}

					<p>{this.props.text}</p>
					<span className='Note__delete' 
					onClick={this.props.onDelete}		
					>X</span>
				</div>
			
		)
	}
}


export default Note;