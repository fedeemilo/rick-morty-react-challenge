import React, { useState } from "react"

import { Container, Row, Col, Pagination } from "react-bootstrap"
import { Zoom, Fade } from "react-reveal"
import { Searcher, Card } from "../"

import ModalChar from "../utilities/modals/ModalChar"
import ModalEpiLoc from "../utilities/modals/ModalEpiLoc"

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
    searchObject,
    displayCards,
    resetSearch,
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
                getCharAction()
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

    // conditional component grid of cards
    let GridOfCards = () => {
        if (displayCards && !resetSearch && searchObject !== undefined) {
            return searchObject.results.map(char => (
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
                </Col>
            ))
        }
        return (          
                <img src={Rick} alt="rick" className="rick-pic" />        
        )
    }

    // conditional component data pagination
    let DataPagination = () => {
        if (displayCards && !resetSearch && searchObject !== undefined) {
            return (
                <Container className="mt-4 d-flex justify-content-center">
                    <Row>
                        <Pagination size="lg">
                            <Pagination.Prev
                                onClick={handlePagePrev}
                                disabled={actualPage === 1}
                            />
                            {/* for each page add a pagination item */}
                            {[...Array(searchObject.info.pages)].map(
                                (page, idx) => (
                                    <Pagination.Item
                                        key={idx}
                                        onClick={handlePageItem}
                                        active={idx + 1 === actualPage}>
                                        {idx + 1}
                                    </Pagination.Item>
                                )
                            )}

                            <Pagination.Next
                                onClick={handlePageNext}
                                disabled={
                                    actualPage === searchObject.info.pages
                                }
                            />
                        </Pagination>
                    </Row>
                </Container>
            )
        }
        return null
    }

    return (
        <div className="main">
            <Container className="main__container">
                <Searcher />
                <Row className="row-cards">
                    <GridOfCards />
                    <ModalChar
                        id={currentId}
                        char={character}
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
                    <ModalEpiLoc
                        idEpiLoc={currentId}
                        epi={episode}
                        loc={location}
                        filter={filter}
                        showEpiLoc={modalEpiLocShow}
                        onHideEpiLoc={() => setModalEpiLocShow(false)}
                    />
                </Row>     
                <DataPagination />
            </Container>
        </div>
    )
}

function mapState(state) {
    return {
        displayCards: state.search.display,
        filter: state.search.filter,
        searchObject: state.search.object[`${state.search.filter}`],
        resetSearch: state.search.resetSearch,
        character: state.modal.objectChar.character,
        episode: state.modal.objectEpisode.episode,
        location: state.modal.objectLocation.location,
    }
}

Main.propTypes = {
    searchObject: PropTypes.object,
    displayCards: PropTypes.bool,
    filter: PropTypes.string,
    resetSearch: PropTypes.bool,
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
