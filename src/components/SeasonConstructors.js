
import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import Loader from './Loader';
import { fecthConstructors } from '../redux/ActionCreators';
import { connect } from 'react-redux';



const Constructors = ({ constructors, fecthConstructors }) => {

    const [year, setYear] = useState(new Date().getFullYear());
    useEffect(() => {
        fecthConstructors(year);
        return () => {
            console.log("unmounting");
        }
    }, []);

    const renderConstructors = constructors.constructors.map((constructor) => {
        return (
            <div key={constructor.constructorId} className="driver-card">
                <Card>
                    <div className="row">
                        <div className="col-3">
                            <Card.Img variant="left" width="200px" height="200px" src={`https://cdn.sportmonks.com/images/f1/teams/${constructor.name.toLowerCase().replace(" ", "")}.png`} />
                        </div>
                        <div className="col">
                            <Card.Header><h2>{constructor.name}</h2></Card.Header>
                            <Card.Body>
                                <Card.Title>Nationality : {constructor.nationality}</Card.Title>
                                <Button variant="primary"><a style={{ color: "white" }} target="blank" href={constructor.urlWiki}>View More About {constructor.name}</a></Button>
                            </Card.Body>
                        </div>
                    </div>
                </Card>
            </div>
        );
    });

    const handleOnSubmit = (e) => {
        e.preventDefault();
        fecthConstructors(year);
    }

    return (
        <div className="container">
            <div>
                <div className="row">
                    <div className="col-6">
                        <form onSubmit={e => handleOnSubmit(e)}>
                            <div class="form-group">
                                <input type="text" onChange={(e) => setYear(e.target.value)} class="form-control" id="searchText" placeholder="Enter Year To Get Constructor Details" />
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                    </div>
                    <div className="col">
                        <h1>F1 CONSTRUCTORS LIST</h1>
                    </div>
                </div>
                {constructors.isLoading ? <Loader /> : renderConstructors}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    constructors: state.constructors
});

export default connect(mapStateToProps, { fecthConstructors })(Constructors);
