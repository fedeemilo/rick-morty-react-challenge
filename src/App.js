import React from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Main from "./components/main/Main"
import Sidebar from "./components/sidebar/Sidebar"
import Footer from "./components/footer/Footer"

function App() {
    return (
        <div>
            <Container fluid>
                <Row>
                    {/* Sidebar */}
                    <Col sm={2}>
                        <Sidebar />
                    </Col>
                    <Col sm={1}>
                        <div className='vl'></div>
                    </Col>
                    {/* Main */}
                    <Col sm={8}>
                        <Main />
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    )
}

export default App
