import React from 'react'
import PropTypes from 'prop-types'

function Card({name, image}) {
    return (
        <div className='card'>
			{/* card header */}
            <div className='card__header'>

				{/* imagen */}
				<img src={image} alt='rick' />

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
	image: PropTypes.string.isRequired
}

export default Card
