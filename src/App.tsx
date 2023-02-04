import { useEffect, useState } from 'react'
import { values, reduce, without, omit, get as getAttr, map, orderBy, toNumber } from 'lodash-es'

import { useSessionStorageState } from './utils/customHooks'

import { CACHE_IDS } from './constants'

import { IEntity } from './components/Entity/Entity'
import EntityCreator from './components/EntityCreator/EntityCreator'
import EntityEditor from './components/EntityEditor/EntityEditor'
import Column from './components/Column/Column'

import initialData from './initialData'

import './App.scss'

const App = () => {
    const [state, setState] = useSessionStorageState(initialData, CACHE_IDS.initiative_tracker)
    const [entities, setEntities] = useState<IEntity[]>([])
    const [aliveEntities, setAliveEntities] = useState<IEntity[]>([])
    const [entityCreatorIsOpen, setEntityCreatorIsOpen] = useState(false)
    const [entityBeingEdited, updateEntityBeingEdited] = useState<IEntity | null>(null)

    useEffect(() => {
        console.log({entities, aliveEntities})
    }, [entities, aliveEntities])
    const onEntityCreated = (entity: IEntity) => {
        // todo: opportunity to move the entity list into jotai and let the modal add it there
        setEntities(c=>([...c, entity]))
        setAliveEntities(c=>([...c, entity]))
        const { column_1 } = state.columns
        setState({
            ...state,
            entities: {
                ...state.entities,
                [entity.id]: entity,
            },
            columns: {
                ...state.columns,
                column_1: {
                    ...column_1,
                    entityIds: [...column_1.entityIds, entity.id],
                },
            },
        })
        setEntityCreatorIsOpen(false)
    }

    const onOrderByInitiative = (column_id: string) => () => {
        // I don't think we need to order dead entities..
        setAliveEntities(c=>{
            const next = orderBy(c, _=>_.initiative)
            console.log('onOrderByInitiative, next order', next)
            return next
        })
        const column = state.columns[column_id]
        const { entities } = state
        const vals = map(
            orderBy(
                map(column.entityIds, id => entities[id]),
                [entity => toNumber(entity.initiative)],
                ['desc'],
            ),
            entity => entity.id,
        )
        setState({
            ...state,
            columns: {
                ...state.columns,
                [column_id]: {
                    ...column,
                    entityIds: vals,
                },
            },
        })
    }

    const entityFromState = (entity: IEntity | null) => entity ? getAttr(state, `entities[${entity.id}]`) : null

    const handleUpdateEntity = (updatedEntity: IEntity) => {
        setEntities(c=>{
            const next = c.filter(_ => _.id !== updatedEntity.id)
            next.push(updatedEntity)
            return next
        })

        const { id } = updatedEntity
        const { entities } = state
        setState({
            ...state,
            entities: {
                ...entities,
                [id]: updatedEntity,
            },
        })
    }

    const handleRemoveEntity = () => {
        const entity = entityBeingEdited
        if (!entity) return

        const filter = (c:IEntity[])=>c.filter(_=>_.id!==entity.id)
        setEntities(filter)
        // todo, based on alive/dead status of entity, filter appropriate list
        //       or maybe hide an entity that is "removed" regardless of which list they're in
        setAliveEntities(filter)

        const { entities, columns } = state
        updateEntityBeingEdited(null)
        setState({
            ...state,
            columns: reduce(
                values(columns),
                (acc, col) => ({
                    ...acc,
                    [col.id]: {
                        ...col,
                        entityIds: without(col.entityIds, entity.id),
                    },
                }),
                {},
            ),
            entities: omit(entities, [entity.id]),
        })
    }

    return (
        <div style={{ padding: 10 }}>
            <div className="appHeader">
                <h1 role="presentation" onClick={() => console.log(state)}>
                    Initiative Tracker
                </h1>

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
                        {state.columnOrder.map((columnId: string) => {
                            const column = state.columns[columnId]
                            const entities = map(column.entityIds, entityId => state.entities[entityId])
                            let actionBtn = (
                                <button type="button" onClick={onOrderByInitiative(column.id)}>
                                    sort
                                </button>
                            )

                            return (
                                <Column
                                    actionBtn={actionBtn}
                                    key={column.id}
                                    column={column}
                                    entities={entities}
                                    entityProps={{
                                        onEditEntity: updateEntityBeingEdited,
                                    }}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>

            <EntityCreator
                isOpen={entityCreatorIsOpen}
                onClose={() => setEntityCreatorIsOpen(false)}
                onEntityCreated={onEntityCreated}
            />

            <EntityEditor
                entityBeingEdited={entityFromState(entityBeingEdited)}
                onClose={() => updateEntityBeingEdited(null)}
                onEntityChanged={handleUpdateEntity}
                onEntityRemoved={handleRemoveEntity}
            />
        </div>
    )
}

export default App
