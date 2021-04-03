import React from 'react'

const getRating = (rating, r1, r2) => {
    if(rating >= r1)
        return "fa fa-star"
    else if(rating >= r2)
        return "fa fa-star-half-o"
    else
        return "fa fa-star-o"
};

const Rating = ({rating, numReviews}) => { 
    return (
        <div className="rating">
            <span>
                <i className={getRating(rating, 1, 0.5)}></i>
            </span>
            <span>
                <i className={getRating(rating, 2, 1.5)}></i>
            </span>
            <span>
                <i className={getRating(rating, 3, 2.5)}></i>
            </span>
            <span>
                <i className={getRating(rating, 4, 3.5)}></i>
            </span>
            <span>
                <i className={getRating(rating, 5, 4.5)}></i>
            </span>
            <span>{`${numReviews} reviews`}</span>
        </div>
    )
}

export default Rating;