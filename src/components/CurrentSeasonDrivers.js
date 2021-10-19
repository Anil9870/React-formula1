import React, { useEffect, useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import Loader from './Loader';
import { connect } from "react-redux";
import { fetchDrivers } from '../redux/ActionCreators';


const CurrentSeasonDrivers = ({ drivers, fetchDrivers }) => {

    const [year, setYear] = useState(new Date().getFullYear());

    useEffect(() => {
        fetchDrivers(year);
    }, []);

    const getDrivers = drivers.drivers.map((driver, id) => {
        return (
            <div key={driver.driverId} className="driver-card">
                <Card className="text-center">
                    <div className="row">
                        <div className="col-3">
                            <Card.Img width="200px" height="200px" variant="left" src={`https://cdn.sportmonks.com/images/f1/drivers/${driver.GivenName.toLowerCase() + "" + driver.FamilyName.toLowerCase()}.png`} />
                        </div>
                        <div className="col">
                            <Card.Header><h2>{driver.GivenName} {driver.FamilyName}</h2></Card.Header>
                            <Card.Body>
                                <Card.Title>Racing No : {driver.PermanentNumber}</Card.Title>
                                <Card.Text>
                                    <p>Nationality : {driver.Nationality} </p>
                                    <p>Date of Birth : {driver.DateOfBirth}</p>
                                </Card.Text>
                                <Button variant="primary"><a style={{ color: "white" }} target="blank" href={driver.urlWiki}>View More About {driver.GivenName}</a></Button>
                            </Card.Body>
                        </div>
                    </div>
                </Card>
            </div>
        );
    });

    const handleOnSubmit = (e) => {
        e.preventDefault();
        fetchDrivers(year);
    }

    return (
        <div className="container">
            {drivers.isLoading === true && drivers.errMess === null ? <Loader /> :
                <div>
                    <div className="row">
                        <div className="col-6">
                            <form onSubmit={e => handleOnSubmit(e)}>
                                <div class="form-group">
                                    <input type="text" onChange={(e) => setYear(e.target.value)} class="form-control" id="searchText" placeholder="Enter Year To Get Driver Details" />
                                </div>
                                <button type="submit" class="btn btn-primary">Submit</button>
                            </form>
                        </div>
                        <div className="col">
                        <h1>F1 DRIVERS LIST</h1>
                        </div>
                    </div>
                    
                    {getDrivers}
                    {console.log(drivers)}
                </div>
            }
        </div>
    )
}


const mapStateToProps = (state) => ({
    drivers: state.drivers
});

export default connect(mapStateToProps, { fetchDrivers })(CurrentSeasonDrivers);
