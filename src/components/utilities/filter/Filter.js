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
}) {
    let handleFilterSelect = e => {
        let filterName = e.target.id.toLowerCase()

        setFilterAction(filterName)
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
                />
                {filterName}
            </label>
        </div>
    )
}

function mapState(state) {
    return {
        state,
    }
}

export default connect(mapState, { setFilterAction, getDataAction })(Filter)
