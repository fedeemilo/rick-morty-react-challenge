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

function Main({ obj, display, filter }) {
    let [filterResults, setFilterResults] = useState({})

    useEffect(() => {
        setFilterResults(Object.assign(filterResults, obj))
    }, [obj, filterResults])

    return (
        <div className='main'>
            <Container className='main__container'>
                {/* searcher */}
                <Searcher />
                <Row>
                    {/* grid of cards */}
                    {display && Object.keys(filterResults).length !== 0 ? (
                        filterResults.results.sort().map(char => (
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
        display: state.search.display,
        filter: state.search.filter,
        obj: state.search.array[`${state.search.filter}`]
    }
}

Main.propTypes = {
    obj: PropTypes.object,
    display: PropTypes.bool,
    filter: PropTypes.string
}

export default connect(mapState)(Main)
