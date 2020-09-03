import React from "react"
import Navbar from "react-bootstrap/NavBar"

import Rick from '../../assets/img/rick.png'

function NavBar() {
    return (
        <Navbar style={{background: 'none'}}>
            <Navbar.Brand href="#home">
                <img
                    src={Rick}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                />
            </Navbar.Brand>
        </Navbar>
    )
}

export default NavBar
