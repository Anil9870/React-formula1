import React from 'react';
import HomeCarousel from './HomeCarousel';


const formulaImages = ["images/f1.jpg", "images/f2.jpg", "images/f3.jpg", "images/f4.jpg", "images/f5.jpg"]

const Home = props => {
    return (
        <div className="container">
            <HomeCarousel items={formulaImages} />
            <div className="row">
                <div className="col sm-4">
                    <img width="100%" src="images/max1.jpg" alt="max" />
                </div>
                <div className="col sm-4">
                    <img width="100%" src="images/max1.jpg" alt="max" />
                </div>
                <div className="col sm-4">
                    <img width="100%" src="images/max1.jpg" alt="max" />
                </div>
            </div>
        </div >
    )
}



export default Home
