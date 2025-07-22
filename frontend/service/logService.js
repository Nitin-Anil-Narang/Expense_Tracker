import axiosApi from '../config/axiosApi'

 const logAuthEvent = (data) => {
  axiosApi.post('/logging', data)
    .catch(err => console.error('Auth log error:', err));
};

 const logAppEvent = (data) => {
  axiosApi.post('/logging', data)
    .catch(err => console.error('App log error:', err));
};

export {
    logAuthEvent,logAppEvent
}