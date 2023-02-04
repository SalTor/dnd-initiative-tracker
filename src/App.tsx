import { useCallback, useEffect, useMemo, useState } from 'react'
import { values, reduce, without, omit, get as getAttr, map, orderBy, toNumber } from 'lodash-es'
import { atom, useAtom } from 'jotai'

import { useSessionStorageState } from './utils/customHooks'

import { CACHE_IDS } from './constants'

import { IEntity } from './components/Entity/Entity'
import EntityCreator from './components/EntityCreator/EntityCreator'
import EntityEditor from './components/EntityEditor/EntityEditor'
import Column from './components/Column/Column'

import initialData from './initialData'

import './App.scss'

type EditEntityAtom = IEntity | null
export const editEntityAtom = atom<EditEntityAtom>(null)

const entitiesAtom = atom<IEntity[]>([])
const sort = (c: IEntity[]) => orderBy(c, ['initiative'], ['desc'])
const aliveEntitiesAtom = atom((get) => sort(get(entitiesAtom).filter((e) => e.hitpoints > 0)))
const deadEntitiesAtom = atom((get) => sort(get(entitiesAtom).filter((e) => e.hitpoints <= 0)))

const App = () => {
    const [entities, setEntities] = useAtom(entitiesAtom)
    const [aliveEntities] = useAtom<IEntity[]>(aliveEntitiesAtom)
    const [deadEntities] = useAtom<IEntity[]>(deadEntitiesAtom)
    const [entityCreatorIsOpen, setEntityCreatorIsOpen] = useState(false)
    const [entityBeingEdited, updateEntityBeingEdited] = useAtom(editEntityAtom)

    useEffect(() => {
        console.log({ entities, aliveEntities })
    }, [entities, aliveEntities])
    const onEntityCreated = (entity: IEntity): void => {
        setEntities((c: IEntity[]) => [...c, entity])
        setEntityCreatorIsOpen(false)
    }

    const handleRemoveEntity = (id: string): void => {
        if (!id) return

        setEntities((c: IEntity[]) => c.filter((_) => _.id !== id))

        updateEntityBeingEdited(null)
    }

    return (
        <div style={{ padding: 10 }}>
            <div className="appHeader">
                <h1 role="presentation">Initiative Tracker</h1>

                <button
                    type="button"
                    onClick={() => sessionStorage.removeItem(CACHE_IDS.initiative_tracker)}
                    style={{ paddingRight: 15, paddingLeft: 15 }}
                >
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

            <EntityCreator
                isOpen={entityCreatorIsOpen}
                onClose={() => setEntityCreatorIsOpen(false)}
                onEntityCreated={onEntityCreated}
            />

            <EntityEditor
                onClose={() => updateEntityBeingEdited(null)}
                onEntityRemoved={handleRemoveEntity}
                onSave={() => {
                    setEntities((c) =>
                        c.map((e) => (entityBeingEdited && e.id === entityBeingEdited.id ? entityBeingEdited : e)),
                    )
                    updateEntityBeingEdited(null)
                }}
            />
        </div>
    )
}

export default App
