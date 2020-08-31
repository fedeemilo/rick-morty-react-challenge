import React, { useEffect } from "react"
import PropTypes from "prop-types"

function Card({ name, image, dimension, episode }) {

    // manipulate height of card depending on content
    useEffect(() => {
        let card = document.querySelectorAll('.card')
        // custom location and episode card
        if (dimension !== undefined || episode !== undefined) {
            card.forEach(c => c.classList.add('custom-height'))
        }
    })

    return (
        <div className='card'>
            {/* card header */}
            <div className='card__header'>
                {/* imagen */}
                {image !== undefined ? <img src={image} alt={name} /> : null}

                {/* dimension */}
                {dimension !== undefined ? (
                    <h4 className='text-center text-primary h5'>{dimension}</h4>
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
