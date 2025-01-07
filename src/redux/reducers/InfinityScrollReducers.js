import { SET_LIST_DATA, SET_USER_DATA, SET_SEARCH, SET_FILTER,SET_STATUS } from '../actions/InfinityScrollAction';

const initialState = {
    posts: [],
    filteredPosts: [],
    searchQuery: '',
    selectedUserId: 'All',
    users: [],
    options: [],
    status:{},
};

const InfinityScrollReducers = (state = initialState, action) => {
    switch (action?.type) {
        case SET_LIST_DATA:
            return {
                ...state,
                posts: action?.payload,
                filteredPosts: action?.payload,
            }
        case SET_USER_DATA:
            return {
                ...state,
                users: action?.payload,
                options: [{ label: 'All', value: 'All' }, ...state?.users?.map((value) => {
                    return {
                        label: value?.name,
                        value: value?.id
                    }
                })]
            }
        case SET_SEARCH:
            return {
                ...state,
                searchQuery: action?.payload,
                filteredPosts: state?.posts?.filter((post) => {
                    const matchesUser = state?.selectedUserId === 'All' || post?.userId == state?.selectedUserId;

                    const matchesSearch = !action?.payload ||
                        post?.title?.toLowerCase()?.includes(action?.payload?.toLowerCase()) ||
                        post?.userId?.toString()?.includes(action?.payload);

                    return matchesUser && matchesSearch;
                }),
            }
        case SET_FILTER:
            return {
                ...state,
                selectedUserId: action?.payload,
                searchQuery: "",
                filteredPosts: state?.posts?.filter((post) => {
                    if (action?.payload == 'All') {
                        return post
                    } else if (post?.userId == action?.payload) {
                        return post
                    }
                })
            }

        case SET_STATUS:
            return{
                ...state,
                status:{
                    ...state?.status,
                    [action?.payload?.name]:action?.payload?.status
                }
            }
        default:
            return state
    }
};

export default InfinityScrollReducers;