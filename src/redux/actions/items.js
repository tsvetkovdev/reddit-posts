export const addItems = (data) => {
  return{
    type: 'FETCHISLOADED',
    payload: data,
  }
  
}

export const refresh = () => {
  return{
    type: 'ENABLE_AUTO_REFRESH',
  }
}