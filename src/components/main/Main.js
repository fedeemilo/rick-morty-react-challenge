import React from "react"
import Searcher from "../utilities/searcher/Searcher"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "../utilities/card/Card"

function Main() {
    let names = ["rick", "morty", "summer"]

    return (
        <div className='main'>
            <Container>
                <Searcher />

                <Row>
                    {names.map(name => (
                        <Col>
                            <Card name={name} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    )
}

export default Main
