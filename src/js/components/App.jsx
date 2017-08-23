import React from 'react';
import {connect} from 'react-redux';

import NotesGrid from './NotesGrid.jsx';
import NotesEditor from './NotesEditor.jsx';

class App extends React.Component {

	render() {
		return (
			<div className='App'>
				<h2 className='App__header'>NotesApp</h2>
				<NotesEditor />
				<NotesGrid  notes={this.props.notes} />
			</div>
		)
	}
}

export default connect(
	state => ({
		notes: state
	}),
	dispatch => ({})
)(App);