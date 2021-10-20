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


export const fetchDrivers = (year) => (dispatch) => {
    dispatch(driversLoading());

    return axios.get(`http://ergast.com/api/f1/${year}/drivers`)
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

export const fecthConstructors = (year) => (dispatch) => {
    dispatch(constructorsLoading());
    return axios.get(`http://ergast.com/api/f1/${year}/constructors`)
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

const parseStandings = (driverStandings) => {
    const processedDriversStandings = [];
    var processedDriverStanding = {};
    for (let i = 0; i < driverStandings.length; i++) {
        processedDriverStanding = {};
        processedDriverStanding.position = driverStandings[i].attributes.position;
        processedDriverStanding.points = driverStandings[i].attributes.points;
        processedDriverStanding.wins = driverStandings[i].attributes.wins;
        let driver = driverStandings[i].children[0];
        processedDriverStanding.givenName = driver.children[1].value;
        processedDriverStanding.FamilyName = driver.children[2].value;
        let constructor = driverStandings[i].children[1];
        processedDriverStanding.constructor = constructor.children[0].value;
        processedDriversStandings.push(processedDriverStanding);

    }
    console.log(processedDriversStandings);
    return processedDriversStandings;
}


export const fetchDriversStandings = (year) => (dispatch) => {
    dispatch(driversStandingsLoading());

    return axios.get(`http://ergast.com/api/f1/${year}/driverStandings`)
        .then((response) => {
            const jsonDataFromXml = new XMLParser().parseFromString(response.data);
            return parseStandings(jsonDataFromXml.children[0].children[0].children);
        })
        .then((response) => dispatch(addDriversStandings(response)))
        .catch((error) => dispatch(driversStandingsFailed(error)));
};

export const driversStandingsLoading = () => ({
    type: ActionTypes.DRIVERS_STANDINGS_LOADING,
});

export const addDriversStandings = (standings) => ({
    type: ActionTypes.ADD_DRIVERS_STANDINGS,
    payload: standings
});

export const driversStandingsFailed = (error) => ({
    type: ActionTypes.DRIVERS_STANDINGS_FAILED,
    payload: error
});


