import React, { useState } from 'react'
import styled from 'styled-components'

const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 25px;
    padding: 8px;
    border: 1px solid lightgrey;
    border-radius: 4px;

    input:not([type='radio']) {
        margin-bottom: 20px;
    }

    button {
        margin-top: 20px;
    }
`

const ENTITY_TYPES = {
    player: 'entity-type::player',
    enemy: 'entity-type::enemy',
}

const EntityForm = props => {
    const [formState, setFormState] = useState({
        name: '',
        initiative: 0,
        hitpoints: 0,
        type: ENTITY_TYPES.enemy,
    })

    const canSubmit = formState.name && formState.hitpoints > 0

    const handleInputChange = field => event => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
        setFormState({
            ...formState,
            [field]: value,
        })
    }

    const handleFormSubmit = () => {
        console.log('create entity for', formState)
        props.onEntityCreated(formState)
    }

    const handleKeyDown = event => (event.key === 'Escape' ? handleFormSubmit : null)

    return (
        <FormWrapper>
            <label htmlFor="name">Entity name</label>
            <input id="name" type="text" value={formState.name} onChange={handleInputChange('name')} />

            <label htmlFor="initiative">Entity intiative</label>
            <input
                id="initiative"
                type="number"
                value={formState.initiative}
                onChange={handleInputChange('initiative')}
            />

            <label htmlFor="hitpoints">Entity hitpoints</label>
            <input id="hitpoints" type="number" value={formState.hitpoints} onChange={handleInputChange('hitpoints')} />

            <label htmlFor="playerOrFoe">
                {(type => (
                    <input
                        type="radio"
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
                        checked={formState.type === type}
                        name="type"
                        value={type}
                    />
                ))(ENTITY_TYPES.enemy)}{' '}
                Foe
            </label>

            <button type="button" disabled={!canSubmit} onClick={handleFormSubmit} onKeyDown={handleKeyDown}>
                Submit
            </button>
        </FormWrapper>
    )
}

export default EntityForm
