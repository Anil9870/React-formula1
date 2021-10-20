import React from 'react';
import HomeCarousel from './HomeCarousel';
import { Card, Button } from 'react-bootstrap';


const formulaImages = 10;

const Home = props => {
    return (
        <div className="container">
            <div className="home-corousel">
                <HomeCarousel items={formulaImages} />
            </div>
            <div className="row">
                <div className="col sm-4">
                    <img className="home-img" src="images/home1.jpg" alt="max" />
                </div>
                <div className="col sm-4">
                    <img className="home-img" src="images/home2.jpg" alt="max" />
                </div>
                <div className="col sm-4">
                    <img className="home-img" src="images/home3.jpg" alt="max" />
                </div>
            </div>
            <div style={{ marginTop: '20px', marginBottom: '30px' }} className="row">
                <Card>
                    <div className="row">
                        <div className="col-5">
                            <Card.Img className="home-img" src="images/mick.jpg" />
                        </div>
                        <div className="col-5">
                            <Card.Body>
                                <Card.Title><h1>Meet the king of F1</h1></Card.Title>
                                <Card.Text style={{ marginTop: '20px' }}>
                                    <p style={{ fontSize: '20px', textAlign: 'center' }}>Legend in F1.Won total 7 championships
                                        Schumacher was noted for pushing his car to the very limit for sustained periods during races, a pioneering fitness regimen and ability to galvanise teams around him. He and his younger brother Ralf are the only siblings to win races in Formula One and the first siblings to finish first and second in the same race, a feat they repeated in four subsequent races.
                                    </p>
                                </Card.Text>
                                <Button style={{ marginTop: '30px' }} variant="info" size="lg"><a href="https://en.wikipedia.org/wiki/Michael_Schumacher" target="blank">View More Info</a></Button>
                            </Card.Body>
                        </div>
                    </div>
                </Card>
            </div>
        </div >
    )
}



export default Home
