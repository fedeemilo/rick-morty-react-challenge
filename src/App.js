import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Main from './components/main/Main'
import Sidebar from './components/sidebar/Sidebar'

function App() {
	return (
		<div>
			<Container fluid>
				<Row>
					{/* Sidebar */}
					<Col sm={3}>
						<Sidebar />
					</Col>
					{/* Main */}
					<Col sm={9}>
						<Main />
					</Col>
				</Row>
			</Container>
		</div>
	)
}

export default App
