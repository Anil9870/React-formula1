import React from 'react';
import Carousel from 'react-elastic-carousel';

const HomeCarousel = ({items}) => {
    return (
        <div className="container">
            <h2>TEAMS</h2>
            <Carousel>
                {items.map((item) => {
                    return <img width="300px" height="300px" src={item} alt={item} />
                })}
            </Carousel>
        </div>
    )
}


export default HomeCarousel;
