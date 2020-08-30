import React, { useEffect } from "react"
import PropTypes from "prop-types"

function Card({ name, image, dimension, episode }) {
    return (
        <div className='card'>
            {/* card header */}
            <div className='card__header'>
                {/* imagen */}
                {image !== undefined ? <img src={image} alt={name} /> : null}

                {/* dimension */}
                {dimension !== undefined ? (
                    <h4 className='text-center text-primary'>{dimension}</h4>
                ) : null}

                {/* episode */}
                {episode !== undefined ? (
                    <h4 className='text-center text-primary'>{episode}</h4>
                ) : null}
            </div>
            {/* card body */}
            <div className='card__body'>
                {/* nombre */}
                <h4>{name}</h4>
            </div>
        </div>
    )
}

Card.propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string,
    dimension: PropTypes.string,
    episode: PropTypes.string,
}

export default Card
