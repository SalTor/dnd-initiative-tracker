import React, { useState } from 'react'
import cuid from 'cuid'

import { ENTITY_TYPES } from '../../constants'

const initialFormState = {
    name: '',
    initiative: 0,
    hitpoints: 0,
    type: ENTITY_TYPES.enemy,
}

const EntityForm = props => {
    const [formState, setFormState] = useState(initialFormState)

    const canSubmit = formState.name && formState.hitpoints > 0

    const handleInputChange = field => event => {
        setFormState({
            ...formState,
            [field]: event.target.value,
        })
    }

    const handleFormSubmit = () => {
        props.onEntityCreated({ ...formState, id: cuid() })
        setFormState(initialFormState)
    }

    const handleKeyDown = event => (event.key === 'Escape' ? handleFormSubmit : null)

    return (
        <div className="formWrapper">
            <label htmlFor="name">Entity name</label>
            <input
                id="name"
                type="text"
                value={formState.name}
                onChange={handleInputChange('name')}
                autoComplete="off"
            />

            <label htmlFor="initiative">Entity intiative</label>
            <input
                id="initiative"
                type="number"
                value={formState.initiative}
                onChange={handleInputChange('initiative')}
                autoComplete="off"
            />

            <label htmlFor="hitpoints">Entity hitpoints</label>
            <input
                id="hitpoints"
                type="number"
                value={formState.hitpoints}
                onChange={handleInputChange('hitpoints')}
                autoComplete="off"
            />

            <label htmlFor="playerOrFoe">
                {(type => (
                    <input
                        type="radio"
                        onChange={handleInputChange('type')}
                        checked={formState.type === type}
                        name="type"
                        value={type}
                    />
                ))(ENTITY_TYPES.player)}{' '}
                Player
            </label>

            <label htmlFor="playerOrFoe">
                {(type => (
                    <input
                        type="radio"
                        onChange={handleInputChange('type')}
                        checked={formState.type === type}
                        name="type"
                        value={type}
                    />
                ))(ENTITY_TYPES.enemy)}{' '}
                Foe
            </label>

            <button type="button" disabled={!canSubmit} onClick={handleFormSubmit} onKeyDown={handleKeyDown}>
                Add Entity
            </button>
        </div>
    )
}

export default EntityForm
