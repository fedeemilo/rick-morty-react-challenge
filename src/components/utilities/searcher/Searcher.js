import React, { useState, useEffect } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Filter from "../filter/Filter"
import PropTypes from "prop-types"

import { connect } from "react-redux"

import {
    setSearchAction,
    setAttributeAction,
    getDataAction,
    setDisplayAction,
} from "../../../redux/searcherDucks"

function Searcher({
    setSearchAction,
    setAttributeAction,
    getDataAction,
    setDisplayAction,
    filter,
}) {
    let [show, setShow] = useState(true)
    let [disable, setDisable] = useState(false)

    useEffect(() => {
        // if the filter selected is episodes, it disable's type attr
        if (filter === "episodes") {
            setDisable(true)
        } else {
            setDisable(false)
        }
    }, [search])

    // listen to user's input
    let handleInput = e => {
        let input = e.target.value

        setSearchAction(input)
        getDataAction()

        // search doesn't start's until user types 3rd char
        if (input.length >= 3) {
            setDisplayAction(true)
        } else {
            setDisplayAction(false)
        }
    }

    // user select name attribute radio button
    let handleRadio = e => {
        setAttributeAction(e.target.id.toLowerCase())
    }

    // capitalize string
    let capitalize = ([first, ...rest], lowerRest = false) =>
        first.toUpperCase() +
        (lowerRest ? rest.join("").toLowerCase() : rest.join(""))

    return (
        <div className='searcher '>
            <h4 className='searcher__title'>{capitalize(filter, true)}</h4>
            <Container>
                <Row>
                    {/* searcher input */}
                    <input
                        className='searcher__input'
                        type='text'
                        onChange={handleInput}
                        placeholder='Enter your search...'
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
                                isDisabled={disable}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

function mapState(state) {
    return {
        filter: state.search.filter,
    }
}

Searcher.propTypes = {
    setSearchAction: PropTypes.func,
    setAttributeAction: PropTypes.func,
    getDataAction: PropTypes.func,
    setDisplayAction: PropTypes.func,
    filter: PropTypes.string,
}

export default connect(mapState, {
    setSearchAction,
    setAttributeAction,
    getDataAction,
    setDisplayAction,
})(Searcher)
