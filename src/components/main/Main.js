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
import { setObjectIdAction, getModalDataAction } from "../../redux/modalDucks"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import Rick from "../../assets/img/rick-nobg.png"

function Main({ obj, display, reset, setObjectIdAction, getModalDataAction, character }) {
    let [filterResults, setFilterResults] = useState({})
    let [modalShow, setModalShow] = useState(false)

    useEffect(() => {
        setFilterResults(Object.assign(filterResults, obj))
    }, [obj, filterResults])

    // show modal if user click's a card
    let handleClickCard = e => {
        setObjectIdAction(e.currentTarget.id)
        // display modal
        setModalShow(true)
        // obtain data for modal completion
        getModalDataAction()
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
                                <ModalChar
                                    char={character}
                                    show={modalShow}
                                    onHide={() => setModalShow(false)}
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
        character: state.modal.object.character
    }
}

Main.propTypes = {
    obj: PropTypes.object,
    display: PropTypes.bool,
    filter: PropTypes.string,
    reset: PropTypes.bool,

}

export default connect(mapState, { setObjectIdAction, getModalDataAction })(
    Main
)
