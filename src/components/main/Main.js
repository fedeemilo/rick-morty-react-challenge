import React, { useState, useEffect } from "react"
import Searcher from "../utilities/searcher/Searcher"
import Container from "react-bootstrap/Container"
import PropTypes from 'prop-types';

import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "../utilities/card/Card"
import Rick from "../../assets/img/rick-nobg.png"

import Zoom from "react-reveal/Zoom"
import Fade from "react-reveal/Fade"

import { connect } from "react-redux"

function Main({ array, display, filter }) {
    let [filterResults, setFilterResults] = useState({})

    useEffect(() => {
        setFilterResults(Object.assign(filterResults, array))
    }, [array])

    return (
        <div className='main'>
            <Container className='main__container'>
                {/* searcher */}
                <Searcher />
                <Row>
                    {/* grid of cards */}
                    {display && Object.keys(filterResults).length !== 0 ? (
                        filterResults[`${filter}`].results.sort().map(char => (
                            <Col lg={3} key={char.id}>
                                <Fade>
                                    <Card
                                        name={char.name}
                                        image={char.image}
                                        dimension={char.dimension}
                                        episode={char.episode}
                                    />
                                </Fade>
                            </Col>
                        ))
                    ) : (
                        <Zoom>
                            {/* home image */}
                            <img src={Rick} alt='rick' className='rick-pic' />
                        </Zoom>
                    )}
                </Row>
            </Container>
        </div>
    )
}

function mapState(state) {
    return {
        array: state.search.array,
        display: state.search.display,
        filter: state.search.filter,
    }
}

Main.propTypes = {
    array: PropTypes.array,
    display: PropTypes.bool,
    filter: PropTypes.string
}

export default connect(mapState)(Main)
