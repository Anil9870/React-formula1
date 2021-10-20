import * as ActionTypes from './ActionTypes';


export const Constructors = (
    state = { isLoading: true, errMess: null, constructors: [] }, action
) => {
    switch (action.type) {
        case ActionTypes.CONSTRUCTORS_LOADING:
            return {
                ...state, isLoading: true, errMess: null
            }
        case ActionTypes.CONSTRUCTORS_FAILED:
            return {
                ...state, isLoading: false, constructors: [], errMess: action.payload
            }
        case ActionTypes.ADD_CONSTRUCTORS:
            return {
                ...state, isLoading: false, constructors: action.payload, errMess: null
            }
        default:
            return state;
    }
};