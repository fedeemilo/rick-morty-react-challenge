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
                    <Col lg={2} md={12}>
                        <Sidebar />
                    </Col>
                    <Col lg={1}>
                        <div className='vl'></div>
                    </Col>
                    {/* Main */}
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
