import React from 'react'
import Rick from '../../../assets/img/rick.webp'

function Card({name}) {
    return (
        <div className='card'>
			{/* card header */}
            <div className='card__header'>

				{/* imagen */}
				<img src={Rick} alt='rick' />

			</div>
			{/* card body */}
            <div className='card__body'>

				{/* nombre */}
				<h4>{name}</h4>

			</div>
        </div>
    )
}

export default Card
