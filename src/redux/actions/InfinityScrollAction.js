export const SET_LIST_DATA = 'STORE_DATA';
export const SET_SEARCH = 'SET_SEARCH';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER_DATA = 'SET_USER_DATA'
export const SET_STATUS='SET_STATUS'

export const setListData = (data) => {
    return {
        type: SET_LIST_DATA,
        payload: data
    }
}

export const search = (searchQuery) => {
    return {
        type: SET_SEARCH,
        payload: searchQuery
    }
}

export const filter = (userId) => {
    return {
        type: SET_FILTER,
        payload: userId
    }
}

export const setUserData = (data) => {
    return {
        type: SET_USER_DATA,
        payload: data
    }
}

export const setStatus=(name,status)=>{
    return{
        type:SET_STATUS,
        payload:{
            name:name,
            status:status
        }
    }
}