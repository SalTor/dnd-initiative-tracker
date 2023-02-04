import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'

import { ENTITY_TYPES } from '../../constants'
import { IEntity } from '../Entity/Entity'

import EntityModal from '../EntityModal/EntityModal'

import './EntityCreator.scss'

const initialFormState = {
    name: '',
    initiative: 0,
    hitpoints: 0,
    type: ENTITY_TYPES.Enemy,
}

interface Props {
    isOpen: boolean
    onClose: (next: boolean) => void
    onEntityCreated: (entity: IEntity) => void
}

const EntityCreator: React.FC<Props> = (props) => {
    const [formState, setFormState] = useState(initialFormState)

    const handleInputChange =
        (field: string) =>
        (event: React.ChangeEvent<HTMLInputElement>): void => {
            setFormState({
                ...formState,
                [field]: event.target.value,
            })
        }

    const handleFormSubmit = () => {
        props.onEntityCreated({ ...formState, id: uuid() })
        setFormState(initialFormState)
    }

    return (
        <EntityModal isOpen={props.isOpen} onClose={props.onClose}>
            <div className="formWrapper">
                <div className="fieldsWrapper">
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
                        <input
                            type="radio"
                            onChange={handleInputChange('type')}
                            checked={formState.type === ENTITY_TYPES.Player}
                            name="type"
                            value={ENTITY_TYPES.Player}
                        />{' '}
                        Player
                    </label>

                    <label htmlFor="playerOrFoe">
                        <input
                            type="radio"
                            onChange={handleInputChange('type')}
                            checked={formState.type === ENTITY_TYPES.Enemy}
                            name="type"
                            value={ENTITY_TYPES.Enemy}
                        />{' '}
                        Foe
                    </label>
                </div>

                <button type="button" onClick={handleFormSubmit}>
                    Add Entity
                </button>
            </div>
        </EntityModal>
    )
}

export default EntityCreator
