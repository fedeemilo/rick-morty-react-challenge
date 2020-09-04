import React, { useEffect } from "react"
import PropTypes from "prop-types"

function Card({ name, image, dimension, episode, handleClickCard, id }) {
    
    // manipulate height of card depending on content
    useEffect(() => {
        let card = document.querySelectorAll(".card")

        // first result
        card[0].classList.add("first-card")
        // custom height on location and episode card
        if (dimension !== undefined || episode !== undefined) {
            card.forEach(c => c.classList.add("custom-height"))
        }
    })


    return (
        <div id={id} className='card' onClick={handleClickCard} >
            {/* card header */}
            <div className='card__header'>
                {/* nombre */}
                <h4 className='text-primary'>{name}</h4>
            </div>
            {/* card body */}
            <div className='card__body'>
                {/* imagen */}
                {image !== undefined ? <img src={image} alt={name} /> : null}

                {/* dimension */}
                {dimension !== undefined ? (
                   
                    <p className='text-center font-italic'>{dimension}</p>
                ) : null}

                {/* episode */}
                {episode !== undefined ? (
                    <h4 className='text-center mt-3 h5'>{episode}</h4>
                ) : null}
            </div>
        </div>
    )
}

Card.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    image: PropTypes.string,
    dimension: PropTypes.string,
    episode: PropTypes.string,
    handleClickCard: PropTypes.func
}

export default Card
