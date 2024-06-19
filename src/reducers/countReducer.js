// redux/reducers/countReducer.js
const initialState = {
	count: {
		lng:"he",
		selectedScreen:"Lines",
		lines:undefined,
		events:undefined,
		showFilter:false,
		eventsSelectedFilters:{},
		organizationsSelectedFilters:{},
		linesSelectedFilters:{},
		learnsSelectedFilters:{}
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
			count:{
				...state.count,
				lng:action.payload
			}
			
		};

		case 'CHANGE_EVENTS_SELECTED_FILTERS':
		return {
			...state,
			count:{
				...state.count,
				eventsSelectedFilters:action.payload
			}
		};


		case 'CHANGE_ORGANIZATIONS_SELECTED_FILTERS':
		return {
			...state,
			count:{
				...state.count,
				organizationsSelectedFilters:action.payload
			}
		};


		case 'CHANGE_LINES_SELECTED_FILTERS':
		return {
			...state,
			count:{
				...state.count,
				linesSelectedFilters:action.payload
			}
		};

		case 'CHANGE_LEARNS_SELECTED_FILTERS':
		return {
			...state,
			count:{
				...state.count,
				learnsSelectedFilters:action.payload
			}
		};



		case 'CHANGE_SHOW_FILTER':
		return {
			...state,
			count:{
				...state.count,
				showFilter: action.payload
			}
			
		};


		case 'CHANGE_SELECTED_SCREEN':
		return {
			...state,
			count: {
				...state.count,
				selectedScreen:action.payload
			},
		};

		case 'SET_LINES':
		return {
			...state,
			count: {
				...state.count,
				lines:action.payload
			},
		};


		case 'SET_EVENTS':
		return {
			...state,
			count: {
				...state.count,
				events:action.payload
			},
		};

		

		default:
		return state;
	}
};