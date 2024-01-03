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

   
  export const decrement = () => {
    return {
      type: 'COUNT_DECRESE',
    };
  };