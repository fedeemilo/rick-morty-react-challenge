import React, { useState, useEffect } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Fade from "react-reveal/Fade"
import { cleanStateAction } from "../../../redux/modalDucks"

import { connect } from "react-redux"

function ModalChar({ modal, show, onHide, char ,cleanStateAction}) {
    let overlay = document.querySelector(".overlay")
    let modalBox = document.querySelector(".modal")
    useEffect(() => {
        if (show) {
            overlay.classList.remove("d-none")
        }
    }, [modal, show])

    let handleClickOverlay = () => {
        overlay.classList.toggle("d-none")
        cleanStateAction()
        // when overlay is clicked, the modal closes
        onHide()
    }

    return (
        <div className='overlay d-none' onClick={handleClickOverlay}>
            <div className='modal-position'>
                <div className='modal'>
                    <Fade>
                        <div className='modal__header'>
                            <h2>{char.name}</h2>
                        </div>
                        <div className='modal__body'>
                            <div className='modal__body--image'>
                                <img src={char.image} alt='charImg' />
                            </div>
                            <Container>
                                <Row>
                                    <Col lg='6'></Col>
                                    <Col lg='6'></Col>
                                </Row>
                            </Container>
                        </div>
                    </Fade>
                </div>
            </div>
        </div>
    )
}

function mapState(state) {
    return {
        modal: state.modal,
    }
}

export default connect(mapState, { cleanStateAction })(ModalChar)
