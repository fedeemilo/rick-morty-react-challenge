import React, { useState } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Alert from "react-bootstrap/Alert"
import Filter from "../filter/Filter"

import { connect } from "react-redux"

import searchReducer, {
    setSearchAction,
    setAttributeAction,
    getDataAction,
    setDisplayAction
} from "../../../redux/searcherDucks"

function Searcher({
    chars,
    setSearchAction,
    setAttributeAction,
    getDataAction,
    setDisplayAction
}) {
    let [filterResults, setFilterResults] = useState([])
    let [show, setShow] = useState(true)

    // listen to user's input
    let handleInput = (e) => {
        let input = e.target.value

        
        setSearchAction(input)
        getDataAction()
        
        // search doesn't start's until user types 3rd char
        if (input.length >= 3) {
            setDisplayAction(true)
        }

        // si no se ha ingresado nada en el input 
        // se oculta el container de resultados
        if (input.length === 0) {
            setFilterResults([])
        }
    }

    // user select name attribute radio button
    let handleRadio = (e) => {
        let input = document.querySelector("#searcher-input")

        setAttributeAction(e.target.id.toLowerCase())
        input.removeAttribute("disabled")
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
                    <Col lg='2'>
                        {/* name */}
                        <div className='mt-3 searcher__name'>
                            <Filter
                                filterName='Name'
                                nameAttr='attribute'
                                handleRadio={handleRadio}
                            />
                        </div>
                    </Col>
                    <Col lg='2'>
                        {/* type */}
                        <div className='mt-3 searcher__type'>
                            <Filter
                                filterName='Type'
                                nameAttr='attribute'
                                handleRadio={handleRadio}
                            />
                        </div>
                    </Col>
                    <Col lg='8'>
                        {show ? <Alert
                            variant='warning'
                            className='mt-3'
                            onClose={() => setShow(false)}
                            dismissible>
                            Choose a filter and an attribute (name or type)
                        </Alert> : null}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

function mapState(state) {
    return {
        chars: state.search.array.characters,
        locations: state.search.array.locations,
    }
}

export default connect(mapState, {
    setSearchAction,
    setAttributeAction,
    getDataAction,
    setDisplayAction
})(Searcher)
