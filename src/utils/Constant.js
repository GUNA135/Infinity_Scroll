import axios from 'axios';

export const apiCall =async (url, method, payload = {}, headers = {},name,dispatch,action) => {
    dispatch(action(name,{loading:true}))
  if (url && method) {
    return await axios({
      url,
      method,
      data: payload,
      headers,
    })
      .then((res) => {
        dispatch(action(name,{loading:false}))
        return { success: true, data: res.data }
      })
      .catch((err) => {
        console.error('API Error:', err);
        dispatch(action(name,{loading:false,error:err}))
        return { success: false, error: err };
      });
  }
};

export const debounce = (callback, delay) => {
    let debouncedFunction;
  
    return function(value) {
      if (debouncedFunction) clearTimeout(debouncedFunction);
      debouncedFunction = setTimeout(() => {
        callback(value);
      }, delay);
    };
  };
