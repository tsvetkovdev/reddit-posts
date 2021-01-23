

const items = (state = [] , action) => {
  switch(action.type) {
    case 'FETCHISLOADED': 
      return { 
        items: action.payload
      }
    default:
     return state;

  }
};

export default items;