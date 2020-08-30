import React from "react"
import Searcher from "../utilities/searcher/Searcher"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "../utilities/card/Card"

import { connect } from "react-redux"

function Main({ chars, display }) {
    let names = ["rick", "morty", "summer"]

    return (
        <div className='main'>
            <Container>
                <Searcher />
                <Row>
                    {display
                        ? chars.results.map((char) => (
                              <Col key={char.id}>
                                  <Card name={char.name} image={char.image} />
                              </Col>
                          ))
                        : null}
                </Row>
            </Container>
        </div>
    )
}

function mapState(state) {
    return {
        chars: state.search.array.characters,
        display: state.search.display,
    }
}

export default connect(mapState)(Main)
