import * as ActionTypes from './ActionTypes';

export const DriversStandings = (
    state = { isLoading: true, errMess: null, driversStandings: [] }, action
) => {
    switch (action.type) {
        case ActionTypes.ADD_DRIVERS_STANDINGS:
            return {
                ...state, errMess: null, driversStandings: action.payload, isLoading: false
            }
        case ActionTypes.DRIVERS_STANDINGS_LOADING:
            return {
                ...state, errMess: null, isLoading: true, driversStandings: []
            }
        case ActionTypes.DRIVERS_STANDINGS_FAILED:
            return {
                ...state, errMess: action.payload, isLoading: false, driversStandings: []
            }
        default:
            return state;
    }
};