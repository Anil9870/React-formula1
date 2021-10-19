
import React, { useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import Loader from './Loader';
import { fecthConstructors } from '../redux/ActionCreators';
import { connect } from 'react-redux';



const Constructors = ({ constructors, fecthConstructors }) => {
    useEffect(() => {
        fecthConstructors();
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

    return (
        <div className="container">
            {constructors.isLoading && constructors.errMess === null ? <Loader /> :
                <div>
                    {renderConstructors}
                </div>}
        </div>
    )
}

const mapStateToProps = (state) => ({
    constructors: state.constructors
});

export default connect(mapStateToProps, { fecthConstructors })(Constructors);
