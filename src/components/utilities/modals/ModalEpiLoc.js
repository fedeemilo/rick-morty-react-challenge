import React, { useEffect } from "react"
import PropTypes from "prop-types"
import Fade from "react-reveal/Fade"
import {
    cleanEpisodeAction,
    cleanLocationAction,
    setDisplayEpisodeAction,
    setDisplayLocationAction,
} from "../../../redux/modalDucks"
import Spinner from "react-bootstrap/Spinner"
import Card from "../card/Card"
import { connect } from "react-redux"
import NoImage from "../../../assets/img/no-image.png"

function ModalEpiLoc({
    modal,
    showEpiLoc,
    onHideEpiLoc,
    epi,
    loc,
    idEpiLoc,
    setDisplayEpisodeAction,
    cleanEpisodeAction,
    cleanLocationAction,
    filter,
}) {
    let overlay = document.querySelector(".overlayEpiLoc")
    useEffect(() => {
        if (showEpiLoc) {
            overlay.classList.remove("d-none")
        }
    }, [modal, showEpiLoc, overlay])

    let handleClickOverlay = () => {
        // display overlay
        overlay.classList.add("d-none")

        switch (filter) {
            case "locations":
                setDisplayLocationAction(false)
                cleanLocationAction(idEpiLoc)
                break
            case "episodes":
                setDisplayEpisodeAction(false)
                cleanEpisodeAction(idEpiLoc)
                break
            default:
                return
        }

        // when overlay is clicked, the modal closes
        onHideEpiLoc()
    }

    return (
        <div
            id="epiloc"
            className="overlayEpiLoc d-none"
            onClick={handleClickOverlay}>
            <div className="modal-position">
                <div className="modalEpiLoc">
                    {(epi !== undefined && modal.displayEpisode) ||
                    (loc !== undefined && modal.displayLocation) ? (
                        <Fade>
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
                                              .map(char => (
                                                  <Card
                                                      name={char.name}
                                                      image={char.image}
                                                  />
                                              ))
                                        : loc.residents
                                              .slice(0, 5)
                                              .map(resident => (
                                                  <Card
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

ModalEpiLoc.propTypes = {
    idEpiLoc: PropTypes.string,
    modal: PropTypes.object,
    onHideEpiLoc: PropTypes.func,
    epi: PropTypes.object,
    loc: PropTypes.object,
    setDisplayEpisodeAction: PropTypes.func,
    cleanEpisodeAction: PropTypes.func,
    cleanLocationAction: PropTypes.func,
    filter: PropTypes.string
}

export default connect(mapState, {
    cleanEpisodeAction,
    cleanLocationAction,
    setDisplayEpisodeAction,
})(ModalEpiLoc)
