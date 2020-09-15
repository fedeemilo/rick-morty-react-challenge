import React from "react"

import { Container, Row, Col } from 'react-bootstrap'
import { Main, Sidebar, Footer} from './components'

function App() {
    return (
        <div>
            <Container fluid>
                <Row>
                    <Col lg={2} md={12}>
                        <Sidebar />
                    </Col>
                    <Col lg={1}>
                        <div className='vl'></div>
                    </Col>
                    <Col lg={8} md={12}>
                        <Main />
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    )
}

export default App
