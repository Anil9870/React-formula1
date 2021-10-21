import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import Loader from './Loader';
import { connect } from 'react-redux';
import { fetchDriversStandings } from '../redux/ActionCreators';



const SeasonDriverStandings = ({ driversStandings, fetchDriversStandings }) => {
    const [year, setYear] = useState(new Date().getFullYear());

    useEffect(() => {
        fetchDriversStandings(year);
    }, []);

    const getDriverTable = () => {
        const renderDriverStandings = driversStandings.driversStandings.map((driver) => {
            return (
                <tr>
                    <td>{driver.position}</td>
                    <td>{driver.givenName + " " + driver.FamilyName}</td>
                    <td>{driver.points}</td>
                    <td>{driver.wins}</td>
                    <td>{driver.constructor}</td>
                </tr>
            );
        });

        return (<Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>Standings</th>
                    <th>Driver</th>
                    <th>Points</th>
                    <th>Wins</th>
                    <th>Constructor</th>
                </tr>
            </thead>
            <tbody>
                {renderDriverStandings}
            </tbody>
        </Table>
        );
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        fetchDriversStandings(year);
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-6">
                    <form onSubmit={e => handleOnSubmit(e)}>
                        <div class="form-group">
                            <input type="text" onChange={(e) => setYear(e.target.value)} class="form-control" id="searchText" placeholder="Enter Year To Get Drivers Standings" />
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
                <div className="col-6">
                    <h1>Season Driver Standings</h1>
                </div>
            </div>
            <div>
                {driversStandings.isLoading ? <Loader /> : getDriverTable()}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    driversStandings: state.driversStandings
});

export default connect(mapStateToProps, { fetchDriversStandings })(SeasonDriverStandings);

