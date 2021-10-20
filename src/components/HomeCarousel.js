import { render } from '@testing-library/react';
import React from 'react';
import Carousel from 'react-elastic-carousel';

const HomeCarousel = ({ items }) => {
    const renderImages = () => {
        const images = [];
        for (var i = 1; i <= 10; i++) {
            let element = <img src={`images/corousel${i}.png`} alt={`corousel${i}`} />
            images.push(element);
        }
        return images;
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-6">
                    <h2>TEAMS</h2>
                </div>
                <div className="col-6">
                    <h2>WE RACE FOR UNITY</h2>
                </div>
                <div>
                    <Carousel>
                        {renderImages()}
                    </Carousel>
                </div>
            </div>
        </div>
    )
}


export default HomeCarousel;
