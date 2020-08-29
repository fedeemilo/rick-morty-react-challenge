import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { connect } from 'react-redux'

import searchReducer, { setSearchAction, setAttributeAction, getDataAction } from '../../../redux/searcherDucks'

function Searcher({ locations, setSearchAction, setAttributeAction, getDataAction }) {
	let [filterResults, setFilterResults] = useState([])
	let [cursor, setCursor] = useState(0)

	// listen to user's input
	let handleInput = (e) => {
		let dropdown = document.querySelector('.searcher__results')
		let input = e.target.value

		setSearchAction(input)


		getDataAction()


		// if the user's input matches with a result,
		// it filters the list and show the container
		if (locations.results.filter((elem) => elem.name.toLowerCase().includes(input))) {
			dropdown.classList.remove('hide')
			setFilterResults(locations.results.filter((elem) => elem.name.toLowerCase().includes(input)))
		}

		// si no se ha ingresado nada en el input se oculta el container de resultados
		if (input.length === 0) {
			setFilterResults([])
			dropdown.classList.add('hide')
			setCursor(0)
		}
	}


	// user select name attribute radio button
	let handleRadio = (e) => {
		let input = document.querySelector('#searcher-input')

		setAttributeAction(e.target.id)
		input.removeAttribute('disabled')
	}

	return (
		<div className='searcher'>
			<Container>
				<Row>
					{/* searcher input */}
					<input
						id='searcher-input'
						type='text'
						onChange={handleInput}

						placeholder='Ingresa tu búsqueda...'
						disabled
					/>
					
					{/* searcher radio buttons (name or type) */}
					<Col lg='6'>
						{/* name */}
						<div className='mt-3 searcher__name'>
							<label htmlFor='name' className='mr-1'>
								Name
							</label>
							<input type='radio' id='name' name='attr' onChange={handleRadio} />
						</div>
					</Col>
					<Col lg='6'>
						{/* type */}
						<div className='mt-3 searcher__type'>
							<label htmlFor='type' className='mr-1'>
								Type
							</label>
							<input type='radio' id='type' name='attr' onChange={handleRadio} />
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	)
}

function mapState(state) {
	return {
		chars: state.search.array.characters,
		locations: state.search.array.locations
	}
}

export default connect(mapState, { setSearchAction, setAttributeAction, getDataAction })(Searcher)
