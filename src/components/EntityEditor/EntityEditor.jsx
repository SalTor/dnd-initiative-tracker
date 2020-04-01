import React from 'react'
import { isNil, get as getAttr } from 'lodash-es'

import EntityModal from '../EntityModal/EntityModal'

import './EntityEditor.scss'

const EntityEditor = props => {
    const handleSubmit = () => {}

    const { entityBeingEdited } = props
    const name = getAttr(entityBeingEdited, 'name')
    const id = getAttr(entityBeingEdited, 'id')

    return (
        <EntityModal isOpen={!isNil(id)} onClose={props.onClose}>
            <div className="formWrapper">
                <div className="fieldsWrapper">
                    <label htmlFor="entityName">Name</label>
                    <input type="text" value={name} onChange={handleSubmit} />
                </div>

                <button type="button" onClick={handleSubmit}>
                    Save Changes
                </button>
            </div>
        </EntityModal>
    )
}

export default EntityEditor
