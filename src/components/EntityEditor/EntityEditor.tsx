import React, { ChangeEvent } from 'react'

import EntityModal from '../EntityModal/EntityModal'

import './EntityEditor.scss'
import { useAtom } from 'jotai'
import { entityFocusAtom } from '../../App'

type Props = {
    onEntityRemoved(id: string): void
    onClose(): void
    onSave(): void
}

const EntityEditor: React.FC<Props> = (props) => {
    const [entity, updateEntity] = useAtom(entityFocusAtom)

    if (!entity) return null

    const handleChange = (field: string) => (event: ChangeEvent<HTMLInputElement> | undefined) =>
        updateEntity({ ...entity, [field]: event?.target?.value })

    return (
        <EntityModal onClose={props.onClose}>
            <div className="formWrapper">
                <div className="fieldsWrapper">
                    <label htmlFor="entityName">Name</label>
                    <input type="text" value={entity.name} onChange={handleChange('name')} />
                </div>

                <div className="fieldsWrapper">
                    <label htmlFor="entityInitiative">Initiative</label>
                    <input type="number" value={entity.initiative} onChange={handleChange('initiative')} />
                </div>

                <div className="fieldsWrapper">
                    <label htmlFor="entityHitpoints">Hitpoints</label>
                    <input type="number" value={entity.hitpoints} onChange={handleChange('hitpoints')} />
                </div>

                <button type="button" onClick={() => props.onEntityRemoved(entity.id)}>
                    remove
                </button>

                <button type="button" onClick={props.onSave}>
                    save
                </button>
            </div>
        </EntityModal>
    )
}

export default EntityEditor
