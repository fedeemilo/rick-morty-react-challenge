import React from "react"
import { Container, Row, Col } from 'react-bootstrap'

import { Filter } from "../"

function Sidebar() {
    return (
        <div className='sidebar'>
            <h3 className='text-center'>Rick & Morty App</h3>
            <div className='sidebar__filters'>
                <h4>Filters</h4>
                <Container>
                    <Row>
                        <Col className='special-col'>
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
