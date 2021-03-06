import React, { useState, useEffect } from "react"
import { Container, Row, Col, Button } from "react-bootstrap"

import { Filter } from "../../"
import PropTypes from "prop-types"

import { connect } from "react-redux"

import {
    setSearchAction,
    setAttributeAction,
    getDataAction,
    setDisplayAction,
    setResetAction,
    cleanStateAction,
} from "../../../redux/searcherDucks"

function Searcher({
    setSearchAction,
    setAttributeAction,
    getDataAction,
    setDisplayAction,
    setResetAction,
    cleanStateAction,
    filter,
}) {
    let [disable, setDisable] = useState(false)
    let [btnDisable, setBtnDisable] = useState(true)

    useEffect(() => {
        // if the filter selected is episodes, it disable's type attr
        if (filter === "episodes") {
            setDisable(true)
        } else {
            setDisable(false)
        }
    }, [filter])

    // listen to user's input
    let handleInput = e => {

        let input = e.target.value
        setSearchAction(input)
        getDataAction()
        setBtnDisable(false)
        setResetAction(false)

        // search doesn't start's until user types 3rd char
        if (input.length >= 3) {
            setDisplayAction(true)
        } 
    }

    // user select name attribute radio button
    let handleRadio = e => {
        setAttributeAction(e.target.id.toLowerCase())
    }

    // handle reset button to restart the search process
    let handleResetButton = e => {
        let searcher = document.querySelector(".searcher__input")
        setBtnDisable(true)
        setResetAction(true)
        cleanStateAction()
        setDisplayAction(false)
        setSearchAction("")
        searcher.value = ""
    }

    return (
        <div className="searcher ">
            <h4 className="searcher__title text-capitalize">{filter}</h4>
            <Container>
                <Row>
                    {/* searcher input */}
                    <input
                        className="searcher__input"
                        type="text"
                        onChange={handleInput}
                        placeholder="Enter your search..."                    
                    />
                    <Button
                        variant="outline-primary"
                        className="ml-2 search__button"
                        onClick={handleResetButton}
                        disabled={btnDisable}>
                        Reset
                    </Button>{" "}
                    {/* searcher radio buttons (name or type) */}
                    <Col lg="2" md="6" sm="4" xs="5">
                        {/* name */}
                        <div className="mt-3 searcher__name">
                            <Filter
                                filterName="Name"
                                nameAttr="attribute"
                                handleRadio={handleRadio}
                            />
                        </div>
                    </Col>
                    <Col lg="2" md="6" sm="4" xs="5">
                        {/* type */}
                        <div className="mt-3 searcher__type">
                            <Filter
                                filterName="Type"
                                nameAttr="attribute"
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
    setResetAction: PropTypes.func,
    cleanStateAction: PropTypes.func,
    filter: PropTypes.string,
}

export default connect(mapState, {
    setSearchAction,
    setAttributeAction,
    getDataAction,
    setDisplayAction,
    setResetAction,
    cleanStateAction,
})(Searcher)
