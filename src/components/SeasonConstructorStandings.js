import React, { useState, useEffect } from 'react';
import axios from 'axios';
import XMLParser from 'react-xml-parser';
import { Table } from 'react-bootstrap';
import Loader from './Loader';

const parseConstructorsStandings = (constructorStandings) => {
    const parsedConstructorsStandings = [];
    var parsedConstructorStanding = {};
    for (let i = 0; i < constructorStandings.length; i++) {
        parsedConstructorStanding = {};
        parsedConstructorStanding.position = constructorStandings[i].attributes.position;
        parsedConstructorStanding.points = constructorStandings[i].attributes.points;
        parsedConstructorStanding.wins = constructorStandings[i].attributes.wins;
        parsedConstructorStanding.constructor = constructorStandings[i].children[0].children[0].value;
        parsedConstructorsStandings.push(parsedConstructorStanding);
    }
    return parsedConstructorsStandings;
}

const SeasonConstructorStandings = () => {
    const [year, setYear] = useState(new Date().getFullYear());
    const [constructorsStandings, setConstructorsStandings] = useState([]);
    const [isLoading, setLoader] = useState(true);

    useEffect(() => {
      //  setLoader(true);
        axios.get(`http://ergast.com/api/f1/${year}/constructorStandings`)
            .then((response) => {
                const jsonDataFromXml = new XMLParser().parseFromString(response.data);
                return parseConstructorsStandings(jsonDataFromXml.children[0].children[0].children);
            })
            .then((response) => {
                setConstructorsStandings(response);
                setLoader(false);
            })
            .catch((error) => console.log(error));
          //  setLoader(false);
    }, []);

    const getConstructorTable = () => {
        const renderStandings = constructorsStandings.map((constructor) => {
            return (
                <tr>
                    <td>{constructor.position}</td>
                    <td>{constructor.constructor}</td>
                    <td>{constructor.points}</td>
                    <td>{constructor.wins}</td>
                </tr>
            );
        });

        return (<Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>Standings</th>
                    <th>Constructor</th>
                    <th>Points</th>
                    <th>Wins</th>
                </tr>
            </thead>
            <tbody>
                {renderStandings}
            </tbody>
        </Table>
        );
    }
    const handleOnSubmit = (e) => {
        e.preventDefault();
        setLoader(true);
        axios.get(`http://ergast.com/api/f1/${year}/constructorStandings`)
            .then((response) => {
                const jsonDataFromXml = new XMLParser().parseFromString(response.data);
                return parseConstructorsStandings(jsonDataFromXml.children[0].children[0].children);
            })
            .then((response) => {
                setConstructorsStandings(response);
                setLoader(false);
            })
            .catch((error) => console.log(error));
      //  setLoader(false);
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-6">
                    <form onSubmit={e => handleOnSubmit(e)}>
                        <div class="form-group">
                            <input type="text" onChange={(e) => setYear(e.target.value)} class="form-control" id="searchText" placeholder="Enter Year To Get Constructors Standings" />
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
                <div className="col-6">
                    <h1>Season Driver Standings</h1>
                </div>
            </div>
            <div>
                {isLoading ? <Loader/>: getConstructorTable()}
            </div>
        </div>
    )
}

export default SeasonConstructorStandings;
