import React, { useState, useEffect } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
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
    setDisplayEpisodeAction
} from "../../redux/modalDucks"
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
    setDisplayEpisodeAction
}) {
    let [filterResults, setFilterResults] = useState({})
    let [modalShow, setModalShow] = useState(false)
    let [modalEpiLocShow, setModalEpiLocShow] = useState(false)
    let [currentId, setCurrentId] = useState("")

    useEffect(() => {
        setFilterResults(Object.assign(filterResults, obj))
    }, [obj, filterResults])

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
        }
    }

    return (
        <div className='main'>
            <Container className='main__container'>
                {/* searcher */}
                <Searcher />
                <Row>
                    {/* grid of cards */}
                    {display && !reset ? (
                        filterResults.results.sort().map(char => (
                            <Col lg={3} key={char.id}>
                                <Fade>
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
                                    onHideEpiLoc={() => setModalEpiLocShow(false)}
                                />
                            </Col>
                        ))
                    ) : (
                        <Zoom>
                            {/* home image */}
                            <img src={Rick} alt='rick' className='rick-pic' />
                        </Zoom>
                    )}
                </Row>
            </Container>
        </div>
    )
}

function mapState(state) {
    return {
        display: state.search.display,
        filter: state.search.filter,
        obj: state.search.array[`${state.search.filter}`],
        reset: state.search.reset,
        character: state.modal.objectChar.character,
        episode: state.modal.objectEpisode.episode,
        location: state.modal.objectLocation.location
    }
}

Main.propTypes = {
    obj: PropTypes.object,
    display: PropTypes.bool,
    filter: PropTypes.string,
    reset: PropTypes.bool,
}

export default connect(mapState, {
    setObjectIdAction,
    getCharAction,
    setDisplayCharAction,
    setDisplayLocationAction,
    setDisplayEpisodeAction,
    getLocationAction,
    getEpisodeAction,
})(Main)
