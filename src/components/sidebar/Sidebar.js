import React from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Filter from "../utilities/filter/Filter"

function Sidebar() {
    return (
        <div className='sidebar'>
            <div className='sidebar__filters'>
                <h4>Filters</h4>
                <Container>
                    <Row>
                        <Col>
                            <Filter filterName='Characters' nameAttr='filter' />
                            <Filter filterName='Locations' nameAttr='filter' />
                            <Filter filterName='Episodes' nameAttr='filter' />
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default Sidebar
