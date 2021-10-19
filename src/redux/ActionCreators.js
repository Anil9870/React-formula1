import * as ActionTypes from './ActionTypes';
import axios from 'axios';
import XMLParser from 'react-xml-parser';


const processDrivers = (drivers) => {
    const processedDrivers = [];
    var processedDriver = {};
    for (let i = 0; i < drivers.length; i++) {
        processedDriver = {};
        processedDriver.driverId = drivers[i].attributes.driverId;
        processedDriver.urlWiki = drivers[i].attributes.url;
        let attributes = drivers[i].children;
        for (let j = 0; j < attributes.length; j++) {
            processedDriver[attributes[j].name] = attributes[j].value;
        }
        processedDrivers.push(processedDriver);
    }
    return processedDrivers;
}


export const fetchDrivers = () => (dispatch) => {
    dispatch(driversLoading());

    return axios.get(`http://ergast.com/api/f1/${new Date().getFullYear()}/drivers`)
        .then((response) => {
            console.log(response);
            // if (response.data.statusText.ok) {
            const jsonDataFromXml = new XMLParser().parseFromString(response.data);
            return processDrivers(jsonDataFromXml.children[0].children);

            // } else {
            //     var error = new Error(
            //         "Error " + response.status + ": " + response.statusText
            //     );
            //     error.response = response;
            //     throw error;
            // }
        })
        .then((response) => {
            dispatch(addDrivers(response));
        })
        .catch((error) => dispatch(driversFailed(error.message)));
}

export const driversLoading = () => ({
    type: ActionTypes.DRIVERS_LOADING,
});

export const addDrivers = (drivers) => ({
    type: ActionTypes.ADD_DRIVERS,
    payload: drivers
});

export const driversFailed = (errMess) => ({
    type: ActionTypes.DRIVERS_FAILED,
    payload: errMess
});

const processConstructors = (constructors) => {
    const processedConstructors = [];
    var processedConstructor = {};
    for (let i = 0; i < constructors.length; i++) {
        processedConstructor = {};
        processedConstructor.constructorId = constructors[i].attributes.constructorId;
        processedConstructor.urlWiki = constructors[i].attributes.url;
        processedConstructor.name = constructors[i].children[0].value;
        processedConstructor.nationality = constructors[i].children[1].value;
        processedConstructors.push(processedConstructor);
    }
    return processedConstructors;

}

export const fecthConstructors = () => (dispatch) => {
    dispatch(constructorsLoading());
    return axios.get(`http://ergast.com/api/f1/${new Date().getFullYear()}/constructors`)
        .then((response) => {
            const jsonDataFromXml = new XMLParser().parseFromString(response.data);
            return processConstructors(jsonDataFromXml.children[0].children);
        })
        .then((response) => dispatch(addConstructors(response)))
        .catch((error) => dispatch(constructorsFailed(error)));
}

export const constructorsLoading = () => ({
    type: ActionTypes.CONSTRUCTORS_LOADING
});

export const addConstructors = (constructors) => ({
    type: ActionTypes.ADD_CONSTRUCTORS,
    payload: constructors
});

export const constructorsFailed = (error) => ({
    type: ActionTypes.CONSTRUCTORS_FAILED,
    payload: error
});


