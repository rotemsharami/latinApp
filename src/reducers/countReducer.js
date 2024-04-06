// redux/reducers/countReducer.js
const initialState = {
	count: {
		general:{
			lng:"he"
		},
		selectedScreen:"Lines"
	},
};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'COUNT_INCRESE':
		let newd = state.count;
		newd[action.payload.key] = action.payload.data;
		return {
			...state,
			count: newd,
		};
		case 'COUNT_DECRESE':
		return {
			...state,
			count: state.count - 1,
		};

		case 'CHANGE_LANGUAGE':
		return {
			...state,
			count: {general:{lng:action.payload}},
		};

		

		default:
		return state;
	}
};