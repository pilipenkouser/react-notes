function reducer(state = [], action){
	if(action.type === 'ADD_NOTE'){
		return [...state, action.payload];
	}

	return state;
}