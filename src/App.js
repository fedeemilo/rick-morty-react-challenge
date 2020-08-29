import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Main from './components/main/Main'

function App() {
	return (
		<div>
			<Container fluid>
				<Row>
					{/* Sidebar */}
					<Col sm={4}>
						<h1>Hola testeando</h1>
						<p>dasdasdasdasdasdasd</p>
					</Col>
					{/* Main */}
					<Col sm={8}>
						<Main />
					</Col>
				</Row>
			</Container>
		</div>
	)
}

export default App
