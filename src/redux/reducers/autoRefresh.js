const autoRefresh = (state = false, action) => {
  switch(action.type) {
    case 'ENABLE_AUTO_REFRESH': 
    return !state;
    default: 
    return state
  }
}
export default autoRefresh