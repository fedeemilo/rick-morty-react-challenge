import React, { useState, useEffect } from "react"
import Searcher from "../utilities/searcher/Searcher"
import Container from "react-bootstrap/Container"
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
            <Container>
                <Searcher />
                <Row>
                    {display ? (
                        filterResults[`${filter}`].results.map(char => (
                            <Col key={char.id}>
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

export default connect(mapState)(Main)
