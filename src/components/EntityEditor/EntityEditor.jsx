import React from 'react'
import { isNil } from 'lodash-es'

import EntityModal from '../EntityModal/EntityModal'

import './EntityEditor.scss'

const EntityEditor = props => {
    const { entityBeingEdited } = props
    const { id, name, initiative, hitpoints } = entityBeingEdited

    const handleChange = field => event => props.onEntityChanged({ ...entityBeingEdited, [field]: event.target.value })

    return (
        <EntityModal isOpen={!isNil(id)} onClose={props.onClose}>
            <div className="formWrapper">
                <div className="fieldsWrapper">
                    <label htmlFor="entityName">Name</label>
                    <input type="text" value={name} onChange={handleChange('name')} />
                </div>

                <div className="fieldsWrapper">
                    <label htmlFor="entityInitiative">Initiative</label>
                    <input type="number" value={initiative} onChange={handleChange('initiative')} />
                </div>

                <div className="fieldsWrapper">
                    <label htmlFor="entityHitpoints">Hitpoints</label>
                    <input type="number" value={hitpoints} onChange={handleChange('hitpoints')} />
                </div>
            </div>
        </EntityModal>
    )
}

export default EntityEditor
