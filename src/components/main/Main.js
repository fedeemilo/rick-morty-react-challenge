import React, { useState } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Pagination from "react-bootstrap/Pagination"
import Searcher from "../utilities/searcher/Searcher"
import Card from "../utilities/card/Card"
import ModalChar from "../utilities/modals/ModalChar"
import ModalEpiLoc from "../utilities/modals/ModalEpiLoc"
import Zoom from "react-reveal/Zoom"
import Fade from "react-reveal/Fade"
import {
    setObjectIdAction,
    getCharAction,
    getLocationAction,
    getEpisodeAction,
    setDisplayCharAction,
    setDisplayLocationAction,
    setDisplayEpisodeAction,
} from "../../redux/modalDucks"
import { itemPageAction, cleanStateAction } from "../../redux/searcherDucks"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import Rick from "../../assets/img/rick-nobg.png"

function Main({
    obj,
    display,
    reset,
    filter,
    setObjectIdAction,
    getCharAction,
    getLocationAction,
    getEpisodeAction,
    character,
    episode,
    location,
    setDisplayCharAction,
    setDisplayLocationAction,
    setDisplayEpisodeAction,
    itemPageAction,
}) {
    let [modalShow, setModalShow] = useState(false)
    let [modalEpiLocShow, setModalEpiLocShow] = useState(false)
    let [currentId, setCurrentId] = useState("")
    let [actualPage, setActualPage] = useState(1)

    // show modal if user click's a card
    let handleClickCard = e => {
        setCurrentId(e.currentTarget.id)
        setObjectIdAction(e.currentTarget.id)

        switch (filter) {
            case "characters":
                // obtain data for modal completion
                getCharAction()
                // display modal
                setModalShow(true)
                setDisplayCharAction(true)
                break
            case "locations":
                getLocationAction()
                setModalEpiLocShow(true)
                setDisplayLocationAction(true)
                break
            case "episodes":
                getEpisodeAction()
                setModalEpiLocShow(true)
                setDisplayEpisodeAction(true)
                break
            default:
                return "Data not found"
        }
    }

    // go to previous page
    let handlePagePrev = () => {
        setActualPage(actualPage - 1)
        itemPageAction(actualPage - 1)
    }

    // go to page item selected
    let handlePageItem = e => {
        let page = Number(e.currentTarget.innerText)
        setActualPage(page)
        itemPageAction(page)
    }

    // got to next page
    let handlePageNext = () => {
        setActualPage(actualPage + 1)
        itemPageAction(actualPage + 1)
    }

    return (
        <div className="main">
            <Container className="main__container">
                {/* searcher */}
                <Searcher />
                <Row className='row-cards'>
                    {/* grid of cards */}
                    {display && !reset && obj !== undefined ? (
                        obj.results.map(char => (
                            <Col key={char.id}>
                                <Fade effect="fadeInUp">
                                    <Card
                                        id={char.id}
                                        name={char.name}
                                        image={char.image}
                                        dimension={char.dimension}
                                        episode={char.episode}
                                        handleClickCard={handleClickCard}
                                    />
                                </Fade>
                                {/* modal for character */}
                                <ModalChar
                                    id={currentId}
                                    char={character}
                                    show={modalShow}
                                    onHide={() => setModalShow(false)}
                                />
                                {/* modal for location or episode */}
                                <ModalEpiLoc
                                    idEpiLoc={currentId}
                                    epi={episode}
                                    loc={location}
                                    filter={filter}
                                    showEpiLoc={modalEpiLocShow}
                                    onHideEpiLoc={() =>
                                        setModalEpiLocShow(false)
                                    }
                                />
                            </Col>
                        ))
                    ) : (
                        <Zoom>
                            {/* home image */}
                            <img src={Rick} alt="rick" className="rick-pic" />
                        </Zoom>
                    )}
                </Row>
                {display && !reset && obj !== undefined ? (
                    <Container className="mt-4 d-flex justify-content-center">
                        <Row>
                            <Pagination size="lg">
                                <Pagination.Prev
                                    onClick={handlePagePrev}
                                    disabled={actualPage === 1}
                                />
                                {/* for each page add a pagination item */}
                                {[...Array(obj.info.pages)].map((page, idx) => (
                                    <Pagination.Item
                                        key={idx}
                                        onClick={handlePageItem}
                                        active={idx + 1 === actualPage}>
                                        {idx + 1}
                                    </Pagination.Item>
                                ))}

                                <Pagination.Next
                                    onClick={handlePageNext}
                                    disabled={actualPage === obj.info.pages}
                                />
                            </Pagination>
                        </Row>
                    </Container>
                ) : null}
            </Container>
        </div>
    )
}

function mapState(state) {
    return {
        display: state.search.display,
        filter: state.search.filter,
        obj: state.search.object[`${state.search.filter}`],
        reset: state.search.reset,
        character: state.modal.objectChar.character,
        episode: state.modal.objectEpisode.episode,
        location: state.modal.objectLocation.location,
    }
}

Main.propTypes = {
    obj: PropTypes.object,
    display: PropTypes.bool,
    filter: PropTypes.string,
    reset: PropTypes.bool,
    setObjectIdAction: PropTypes.func,
    getCharAction: PropTypes.func,
    getLocationAction: PropTypes.func,
    getEpisodeAction: PropTypes.func,
    setDisplayCharAction: PropTypes.func,
    setDisplayLocationAction: PropTypes.func,
    setDisplayEpisodeAction: PropTypes.func,
    itemPageAction: PropTypes.func,
    character: PropTypes.object,
    episode: PropTypes.object,
    location: PropTypes.object,
}


export default connect(mapState, {
    setObjectIdAction,
    getCharAction,
    setDisplayCharAction,
    setDisplayLocationAction,
    setDisplayEpisodeAction,
    getLocationAction,
    getEpisodeAction,
    itemPageAction,
    cleanStateAction,
})(Main)
