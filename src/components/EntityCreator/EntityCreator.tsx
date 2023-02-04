import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'

import { IEntity, EntityType } from '../Entity/Entity'

import EntityModal from '../EntityModal/EntityModal'

import './EntityCreator.scss'

const initialFormState = {
    name: '',
    initiative: 0,
    maxHitpoints: 0,
    type: EntityType.Player,
}

interface Props {
    onClose(): void
    onEntityCreated(entity: IEntity): void
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
        props.onEntityCreated({ ...formState, hitpoints: formState.maxHitpoints, id: uuid() })
        setFormState(initialFormState)
    }

    return (
        <EntityModal onClose={props.onClose}>
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
                        value={formState.maxHitpoints}
                        onChange={handleInputChange('maxHitpoints')}
                        autoComplete="off"
                    />

                    <label htmlFor="playerOrFoe">
                        <input
                            type="radio"
                            onChange={handleInputChange('type')}
                            checked={formState.type === EntityType.Player}
                            name="type"
                            value={EntityType.Player}
                        />{' '}
                        Player
                    </label>

                    <label htmlFor="playerOrFoe">
                        <input
                            type="radio"
                            onChange={handleInputChange('type')}
                            checked={formState.type === EntityType.Enemy}
                            name="type"
                            value={EntityType.Enemy}
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
