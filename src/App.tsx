import { useState } from 'react'
import { orderBy } from 'lodash'
import { atom, useAtom } from 'jotai'
import { atomWithStorage, RESET } from 'jotai/utils'

import { IEntity } from './components/Entity/Entity'
import EntityCreator from './components/EntityCreator/EntityCreator'
import EntityEditor from './components/EntityEditor/EntityEditor'
import Column from './components/Column/Column'

import './App.scss'

type EditEntityAtom = IEntity | null
export const entityFocusAtom = atom<EditEntityAtom>(null)

const entitiesAtom = atomWithStorage<IEntity[]>('entities', [])
const sort = (c: IEntity[]) => orderBy(c, ['initiative'], ['desc'])
const aliveEntitiesAtom = atom((get) => sort(get(entitiesAtom).filter((e) => e.hitpoints > 0)))
const deadEntitiesAtom = atom((get) => sort(get(entitiesAtom).filter((e) => e.hitpoints <= 0)))

const App = () => {
    const [, setEntities] = useAtom(entitiesAtom)
    const [aliveEntities] = useAtom(aliveEntitiesAtom)
    const [deadEntities] = useAtom(deadEntitiesAtom)
    const [focusedEntity, setEntityFocus] = useAtom(entityFocusAtom)
    const [entityCreatorIsOpen, setEntityCreatorIsOpen] = useState(false)

    return (
        <div style={{ padding: 10 }}>
            <div className="appHeader">
                <h1 role="presentation">Initiative Tracker</h1>

                <button type="button" onClick={() => setEntities(RESET)} style={{ paddingRight: 15, paddingLeft: 15 }}>
                    Clear Cache
                </button>

                <button
                    type="button"
                    onClick={() => setEntityCreatorIsOpen(true)}
                    style={{ marginLeft: 10, paddingRight: 15, paddingLeft: 15 }}
                >
                    Add Entity
                </button>
            </div>

            <div className="formAndTracker">
                <div className="draggableWrapper">
                    <div className="test">
                        <Column title="Alive" entities={aliveEntities} />
                        <Column title="Defeated" entities={deadEntities} />
                    </div>
                </div>
            </div>

            {entityCreatorIsOpen && (
                <EntityCreator
                    onClose={() => setEntityCreatorIsOpen(false)}
                    onEntityCreated={(entity: IEntity): void => {
                        setEntities((c) => [...c, entity])
                        setEntityCreatorIsOpen(false)
                    }}
                />
            )}

            <EntityEditor
                onClose={() => setEntityFocus(null)}
                onEntityRemoved={(id: string): void => {
                    if (!id) return

                    setEntities((c) => c.filter((e) => e.id !== id))
                    setEntityFocus(null)
                }}
                onSave={() => {
                    setEntities((c) => c.map((e) => (focusedEntity && e.id === focusedEntity.id ? focusedEntity : e)))
                    setEntityFocus(null)
                }}
            />
        </div>
    )
}

export default App
