import React, { useEffect } from "react"

import Fade from "react-reveal/Fade"
import {
    cleanCharAction,
    setDisplayCharAction,
} from "../../../redux/modalDucks"

import Spinner from "react-bootstrap/Spinner"
import { connect } from "react-redux"

function ModalChar({
    modal,
    show,
    onHide,
    char,
    cleanCharAction,
    id,
    setDisplayCharAction,
}) {
    let overlay = document.querySelector(".overlay")
    useEffect(() => {
        if (show) {
            overlay.classList.remove("d-none")
        }
    }, [modal, show])

    let handleClickOverlay = () => {
        overlay.classList.toggle("d-none")
        setDisplayCharAction(false)
        cleanCharAction(id)
        // when overlay is clicked, the modal closes
        onHide()
    }

    return (
        <div className="overlay d-none" onClick={handleClickOverlay}>
            <div className="modal-position">
                <div className="modal">
                    {char !== undefined && modal.displayChar ? (
                        <Fade>
                            <div className="modal__header">
                                <h2>{char.name}</h2>
                            </div>
                            <div className="modal__body">
                                <Fade>
                                    <div className="modal__body--image">
                                        <img src={char.image} alt="charImg" />
                                    </div>

                                    <div className="modal__body--info">
                                        <div className="info1">
                                            <p>
                                                <span className="info-name">
                                                    Type:
                                                </span>{" "}
                                                {char.type !== ""
                                                    ? char.type
                                                    : "none"}
                                            </p>
                                            <p>
                                                <span className="info-name">
                                                    Gender:
                                                </span>{" "}
                                                {char.gender}
                                            </p>
                                        </div>

                                        <div className="info-col2">
                                            <p>
                                                <span className="info-name">
                                                    Species:
                                                </span>{" "}
                                                {char.species}
                                            </p>
                                            <p>
                                                <span className="info-name">
                                                    Status:
                                                </span>{" "}
                                                {char.status}
                                            </p>
                                        </div>
                                    </div>
                                </Fade>
                            </div>
                        </Fade>
                    ) : (
                        <div className="d-flex justify-content-center align-items-center w-100 h-100">
                            <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        </div>
                    )}
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

export default connect(mapState, { cleanCharAction, setDisplayCharAction })(
    ModalChar
)
