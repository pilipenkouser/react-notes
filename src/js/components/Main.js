import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import './main.min.css';

import App from './App.jsx';


const initialState = [
	{
		title: 'lorem ipsum',
		text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint nobis minima tempore repellendus, molestias amet, reprehenderit tenetur harum hic, sequi iure, eligendi doloremque necessitatibus. Eos rem porro iste nam totam?',
		color: '#ff0'
	},
	{
		title: 'lorem ipsum',
		text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint nobis minima tempore repellendus, molestias amet, reprehenderit tenetur harum hic, sequi iure, eligendi doloremque necessitatibus. Eos rem porro iste nam totam?',
		color: '#f0f'
	},
	{
		title: 'lorem ipsum',
		text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti optio laudantium explicabo velit, eaque ullam porro nemo consequatur, neque, iste officiis dolores ab a voluptates eos ad suscipit accusamus obcaecati! Unde facere beatae eius iste ipsam sapiente accusamus! Laudantium rerum eos, hic laboriosam praesentium impedit dignissimos nemo error voluptas dolores recusandae unde expedita enim, explicabo quos quibusdam amet veritatis. Ducimus. Fugiat id at sed quis nostrum consectetur, ducimus ipsam voluptatem perferendis aliquid unde nobis, quos soluta voluptas autem, minima hic blanditiis doloremque aspernatur iste incidunt vitae. Explicabo culpa, in eaque.',
		color: '#f00'
	},
	{
		title: 'lorem ipsum',
		text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint nobis minima tempore repellendus, molestias amet, reprehenderit tenetur harum hic, sequi iure, eligendi doloremque necessitatibus. Eos rem porro iste nam totam?',
		color: '#fff'
	},
	{
		title: 'lorem ipsum',
		text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint nobis minima tempore repellendus, molestias amet, reprehenderit tenetur harum hic, sequi iure, eligendi doloremque necessitatibus. Eos rem porro iste nam totam?',
		color: '#0f0'
	},
	{
		title: 'lorem ipsum',
		text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint nobis minima tempore repellendus, molestias amet, reprehenderit tenetur harum hic, sequi iure, eligendi doloremque necessitatibus. Eos rem porro iste nam totam?',
		color: '#00f'
	},
	{
		title: 'lorem ipsum',
		text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti optio laudantium explicabo velit, eaque ullam porro nemo consequatur, neque, iste officiis dolores ab a voluptates eos ad suscipit accusamus obcaecati! Unde facere beatae eius iste ipsam sapiente accusamus! Laudantium rerum eos, hic laboriosam praesentium impedit dignissimos nemo error voluptas dolores recusandae unde expedita enim, explicabo quos quibusdam amet veritatis. Ducimus. Fugiat id at sed quis nostrum consectetur, ducimus ipsam voluptatem perferendis aliquid unde nobis, quos soluta voluptas autem, minima hic blanditiis doloremque aspernatur iste incidunt vitae. Explicabo culpa, in eaque.',
		color: '#0ff'
	},
	{
		title: '',
		text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
		color: '#0f0'
	},
	{
		title: 'lorem ipsum',
		text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint nobis minima tempore repellendus, molestias amet, reprehenderit tenetur harum hic, sequi iure, eligendi doloremque necessitatibus. Eos rem porro iste nam totam? Unde facere beatae eius iste ipsam sapiente accusamus! Laudantium rerum eos, hic laboriosam praesentium impedit dignissimos nemo error voluptas dolores recusandae unde expedita enim, explicabo quos quibusdam amet veritatis.',
		color: '#f0f'
	},
	
];

function notesList(state = initialState, action){

	switch (action.type) {
		case 'ADD_NOTE':
			return [...state, action.payload];
			break;
		case 'DELETE_NOTE':
			var newState = [...state];

			newState.map((item, index)=>{
				if(item === action.payload){
					console.log(item, action.payload);
					newState.splice(index, 1);
				}
			})
			return newState;
			break;
	}

	return state;
}

// const store = createStore(notesList);
const store = createStore(notesList, window.__REDUX_DEVTOOLS_EXTENSION__ &&
									window.__REDUX_DEVTOOLS_EXTENSION__());



ReactDom.render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById('app')
)


