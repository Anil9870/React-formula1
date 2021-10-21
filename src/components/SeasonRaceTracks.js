import React, { useState, useEffect } from 'react';
import axios from 'axios';
import XMLParser from 'react-xml-parser';
import { Card, Button } from 'react-bootstrap';
import Loader from './Loader';
import { NavLink } from "react-router-dom";

const parseRaceTracks = (tracks) => {
    const raceTracks = [];
    var raceTrack = {};
    for (let i = 0; i < tracks.length; i++) {
        raceTrack = {};
        raceTrack.circuitId = tracks[i].attributes.circuitId;
        raceTrack.wikiUrl = tracks[i].attributes.url;
        raceTrack.name = tracks[i].children[0].value;
        raceTrack.lat = tracks[i].children[1].attributes.lat;
        raceTrack.long = tracks[i].children[1].attributes.long;
        raceTracks.push(raceTrack);
    }
    return raceTracks;
}

const SeasonRaceTracks = () => {
    const [tracks, setTracks] = useState([]);
    const [year, setYear] = useState(new Date().getFullYear());
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        axios.get(`http://ergast.com/api/f1/${year}/circuits`)
            .then((response) => {
                const jsonDataFromXml = new XMLParser().parseFromString(response.data);
                setTracks(parseRaceTracks(jsonDataFromXml.children[0].children));
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }, []);

    const getTrackCols = (rowId) => {
        const elements = [];
        for (let i = (rowId - 1) * 4; (i < (rowId * 4) && i < tracks.length); i++) {
            const card =
                <div id={tracks[i].circuitId} className="col-12  col-sm-6">
                    <Card >
                        <Card.Body>
                            <Card.Title><h2>{tracks[i].name}</h2></Card.Title>
                            <Card.Text>
                                <NavLink className="nav-link" to={`/tracks/${tracks[i].circuitId}/${tracks[i].lat}/${tracks[i].long}`}>
                                    <p className="track-font">Want To View Race Track In Map ? </p>
                                </NavLink>
                            </Card.Text>
                            <Button size="lg" variant="light"><a href={tracks[i].wikiUrl} target="blank"><p>More Info</p></a></Button>
                        </Card.Body>
                    </Card>
                </div>
            elements.push(card);
        }
        return (
            <div className="row">
                {elements}
            </div>
        );
    }

    const renderTracks = () => {
        const tracksLength = tracks.length;
        var noOfRows = parseInt((tracksLength / 4), 10) + 1;
        const gridRows = [];
        for (let i = 1; i <= noOfRows; i++) {
            gridRows.push(getTrackCols(i));
        }
        return gridRows;
    }
    const handleOnSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        axios.get(`http://ergast.com/api/f1/${year}/circuits`)
            .then((response) => {
                const jsonDataFromXml = new XMLParser().parseFromString(response.data);
                setTracks(parseRaceTracks(jsonDataFromXml.children[0].children));
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-6">
                    <form onSubmit={e => handleOnSubmit(e)}>
                        <div class="form-group">
                            <input type="text" onChange={(e) => setYear(e.target.value)} class="form-control" id="searchText" placeholder="Enter Year To Get Race Tracks" />
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
                <div className="col-6">
                    <h1>Season Race Tracks</h1>
                </div>
            </div>
            {isLoading ? <Loader /> : renderTracks()}
        </div>
    )
}


export default SeasonRaceTracks;
