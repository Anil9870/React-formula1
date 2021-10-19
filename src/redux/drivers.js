import * as ActionTypes from './ActionTypes';


export const Drivers = (
    state = { isLoading: true, errMess: null, drivers: [] }, action
) => {
    switch (action.type) {
        case ActionTypes.DRIVERS_LOADING:
            return {
                ...state, isLoading: true, errMess: null, drivers: []
            }
        case ActionTypes.ADD_DRIVERS:
            return {
                ...state, isLoading: false, errMess: null, drivers: action.payload
            }
        case ActionTypes.DRIVERS_FAILED:
            return {
                ...state, isLoading: false, errMess: action.payload
            }
        default:
            return state;
    }
};