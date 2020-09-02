import React, { useState, useEffect } from "react"

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import Fade from "react-reveal/Fade"
import { cleanStateAction } from "../../../redux/modalDucks"

import { connect } from "react-redux"

function ModalChar({ modal, show, onHide, char, cleanStateAction }) {
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

                            <div class='modal__body--info'>
                                <Container className='mx-auto'>
                                    <Row>
                                        <Col lg='4'>
                                            <p>
                                                <span className='info-name'>Type:</span>{" "}
                                                {char.type !== "" ? char.type : "none"}
                                            </p>
                                            <p>
                                                <span className='info-name'>Gender:</span> {char.gender}
                                            </p>
                                        </Col>
                                        <Col lg='4'>
                                            <p>
                                                <span className='info-name'>Species:</span> {char.species}
                                            </p>
                                            <p>
                                                <span className='info-name'>Status:</span> {char.status}
                                            </p>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
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
