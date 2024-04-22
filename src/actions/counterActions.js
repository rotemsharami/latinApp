// redux/actions/countAction.js
export const increment = (value) => {
    return {
      type: 'COUNT_INCRESE',
      payload: value
    };
  };

  export const changeLanguage = (lng) => {
    return {
      type: 'CHANGE_LANGUAGE',
      payload: lng
    };
  };

  export const changeSelectedScreen = (selectedScreen) => {
    return {
      type: 'CHANGE_SELECTED_SCREEN',
      payload: selectedScreen
    };
  };

  export const setLines = (lines) => {
    return {
      type: 'SET_LINES',
      payload: lines
    };
  };

  export const setEvents = (events) => {
    return {
      type: 'SET_EVENTS',
      payload: events
    };
  };


  export const decrement = () => {
    return {
      type: 'COUNT_DECRESE',
    };
  };