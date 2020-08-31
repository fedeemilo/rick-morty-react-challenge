import React, { useState } from "react"
import PropTypes from "prop-types"

import { connect } from "react-redux"

import { setFilterAction, getDataAction } from "../../../redux/searcherDucks"

function Filter({
    filterName,
    nameAttr,
    handleRadio,
    setFilterAction,
    getDataAction,
    isDisabled,
    filter,
    attribute,
    search
}) {

    let handleFilterSelect = e => {
        let filter = e.target.id.toLowerCase()
        setFilterAction(filter)
        getDataAction()
    }

    return (
        <div className='filter'>
            
            <label htmlFor={filterName} className='mr-1'>
                <input
                    type='radio'
                    id={filterName}
                    name={nameAttr}
                    onChange={
                        handleRadio === undefined
                            ? handleFilterSelect
                            : handleRadio
                    }
                    disabled={isDisabled || search !== ''}
                    checked={
                        filter === filterName.toLowerCase() ||
                        attribute === filterName.toLowerCase()
                    }
                />
                {filterName}
            </label>
        </div>
    )
}

function mapState(state) {
    return {
        search: state.search.search,
        filter: state.search.filter,
        attribute: state.search.attribute,
    }
}

export default connect(mapState, { setFilterAction, getDataAction })(Filter)
