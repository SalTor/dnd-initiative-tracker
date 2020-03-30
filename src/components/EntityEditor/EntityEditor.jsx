import React from 'react'
import { isNil } from 'lodash-es'

import './EntityEditor.scss'

const EntityEditor = props => {
    const handleSubmit = () => {}

    if (isNil(props.id)) {
        return null
    }

    return (
        <div className="entityEditor">
            <div className="mask" />

            <div className="formWrapper">
                <div className="fieldsWrapper">
                    <label htmlFor="entityName">Name</label>
                    <input type="text" value={props.name} onChange={handleSubmit} />
                </div>

                <button type="button" onClick={handleSubmit}>
                    Save Changes
                </button>
            </div>
        </div>
    )
}

export default EntityEditor
