import React, { useEffect } from "react"
import PropTypes from "prop-types"
import Spinner from "react-bootstrap/Spinner"
import { Card } from "../.."
import { connect } from "react-redux"
import {
    cleanCharAction,
    setDisplayCharAction,
    cleanEpisodeAction,
    cleanLocationAction,
    setDisplayEpisodeAction,
    setDisplayLocationAction,
} from "../../../redux/modalDucks"
import NoImage from "../../../assets/img/no-image.png"

function Modal({
    modal,
    show,
    onHide,
    char,
    epi,
    loc,
    cleanCharAction,
    id,
    filter,
    setDisplayLocationAction,
    setDisplayCharAction,
    setDisplayEpisodeAction,
    cleanEpisodeAction,
    cleanLocationAction,
}) {
    let overlay = document.querySelector(".overlay")
    useEffect(() => {
        if (show) {
            overlay.classList.remove("d-none")
        }
    }, [modal, show, overlay])

    let handleClickOverlay = () => {
        overlay.classList.toggle("d-none")
        switch (filter) {
            case "characters":
                setDisplayCharAction(false)
                cleanCharAction(id)
                break
            case "locations":
                setDisplayLocationAction(false)
                cleanLocationAction(id)
                break
            case "episodes":
                setDisplayEpisodeAction(false)
                cleanEpisodeAction(id)
                break
            default:
                return
        }
        // when overlay is clicked, the modal closes
        onHide()
    }

    let ModalEntity = () => {
        if (!!char && modal.displayChar) {
            return (
                <div className="modal">
                    <ion-icon name="close-outline"></ion-icon>
                    <div className="modal__header">
                        <h2>{char.name}</h2>
                    </div>
                    <div className="modal__body">
                        <div className="modal__body--image">
                            <img src={char.image} alt="charImg" />
                        </div>

                        <div className="modal__body--info">
                            <div className="info1">
                                <p>
                                    <span className="info-name">Type:</span>{" "}
                                    {char.type !== "" ? char.type : "none"}
                                </p>
                                <p>
                                    <span className="info-name">Gender:</span>{" "}
                                    {char.gender}
                                </p>
                            </div>

                            <div className="info-col2">
                                <p>
                                    <span className="info-name">Species:</span>{" "}
                                    {char.species}
                                </p>
                                <p>
                                    <span className="info-name">Status:</span>{" "}
                                    {char.status}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else if (
            (!!epi && modal.displayEpisode) ||
            (!!loc && modal.displayLocation)
        ) {
            return (
                <div
                    id="epiloc"
                    className="overlayEpiLoc"
                    onClick={handleClickOverlay}>
                    <div className="modal-position">
                        <div className="modalEpiLoc">
                            <div>
                                <ion-icon name="close-outline"></ion-icon>
                                <div className="modalEpiLoc__header">
                                    <h2>
                                        {filter === "episodes"
                                            ? epi.name
                                            : loc.name}
                                    </h2>
                                </div>
                                <div className="modalEpiLoc__body">
                                    <div className="modalEpiLoc__body--info">
                                        <p>
                                            {filter === "episodes"
                                                ? "Release Date"
                                                : "Type"}
                                            :{" "}
                                            <span className="info-name">
                                                {filter === "episodes"
                                                    ? epi.air_date
                                                    : loc.type}
                                            </span>
                                        </p>
                                        <p>
                                            {filter === "episodes"
                                                ? "Episode"
                                                : "Dimension"}
                                            :{" "}
                                            <span className="info-name">
                                                {filter === "episodes"
                                                    ? epi.episode
                                                    : loc.dimension}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="modalEpiLoc__body--chars">
                                        {/* render the first five characters of the episode */}
                                        {filter === "episodes"
                                            ? epi.characters
                                                  .slice(0, 5)
                                                  .map((char, idx) => (
                                                      <Card
                                                          key={idx}
                                                          name={char.name}
                                                          image={char.image}
                                                      />
                                                  ))
                                            : loc.residents
                                                  .slice(0, 5)
                                                  .map((resident, idx) => (
                                                      <Card
                                                          key={idx}
                                                          name={resident.name}
                                                          image={
                                                              resident.image
                                                                  ? resident.image
                                                                  : NoImage
                                                          }
                                                      />
                                                  ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div className="d-flex justify-content-center align-items-center w-100 h-100">
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
        )
    }

    return (
        <div
            className="overlay overlayEpiLoc d-none"
            onClick={handleClickOverlay}>
            <div className="modal-position">
                <ModalEntity />
            </div>
        </div>
    )
}

function mapState(state) {
    return {
        modal: state.modal,
    }
}

Modal.propTypes = {
    id: PropTypes.string,
    modal: PropTypes.object,
    show: PropTypes.bool,
    onHide: PropTypes.func,
    char: PropTypes.object,
    cleanCharAction: PropTypes.func,
    setDisplayCharAction: PropTypes.func,
    setDisplayEpisodeAction: PropTypes.func,
    setDisplayLocationAction: PropTypes.func,
    cleanEpisodeAction: PropTypes.func,
    cleanLocationAction: PropTypes.func,
}

export default connect(mapState, {
    cleanEpisodeAction,
    cleanLocationAction,
    setDisplayEpisodeAction,
    setDisplayLocationAction,
    cleanCharAction,
    setDisplayCharAction,
})(Modal)
