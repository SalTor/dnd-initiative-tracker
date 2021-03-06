import React, { useState } from 'react'
import '@atlaskit/css-reset'
import { DragDropContext } from 'react-beautiful-dnd'
import { values, reduce, without, omit, get as getAttr, map, orderBy, toNumber } from 'lodash-es'

import { useSessionStorageState } from './utils/customHooks'

import { CACHE_IDS } from './constants'

import EntityCreator from './components/EntityCreator/EntityCreator'
import EntityEditor from './components/EntityEditor/EntityEditor'
import Column from './components/Column/Column'

import initialData from './initialData'

import './App.scss'

const App = () => {
    const [state, setState] = useSessionStorageState(initialData, CACHE_IDS.initiative_tracker)
    const [entityCreatorIsOpen, setEntityCreatorIsOpen] = useState(false)
    const [entityBeingEdited, updateEntityBeingEdited] = useState({})

    const onDragEnd = result => {
        const { destination, source, draggableId } = result

        if (destination) {
            const sameList = destination.droppableId === source.droppableId
            const sameOrder = destination.index === source.index
            if (sameList && sameOrder) {
                return
            }

            const start = state.columns[source.droppableId]
            const finish = state.columns[destination.droppableId]

            if (start === finish) {
                const newEntityIds = Array.from(start.entityIds)
                newEntityIds.splice(source.index, 1)
                newEntityIds.splice(destination.index, 0, draggableId)

                const newColumn = {
                    ...start,
                    entityIds: newEntityIds,
                }

                setState({
                    ...state,
                    columns: {
                        ...state.columns,
                        [newColumn.id]: newColumn,
                    },
                })
            } else {
                const startEntityIds = Array.from(start.entityIds)
                startEntityIds.splice(source.index, 1)
                const newStart = {
                    ...start,
                    entityIds: startEntityIds,
                }

                const finishEntityIds = Array.from(finish.entityIds)
                finishEntityIds.splice(destination.index, 0, draggableId)
                const newFinish = {
                    ...finish,
                    entityIds: finishEntityIds,
                }

                setState({
                    ...state,
                    columns: {
                        ...state.columns,
                        [newStart.id]: newStart,
                        [newFinish.id]: newFinish,
                    },
                })
            }
        } else {
            return
        }
    }

    const onEntityCreated = entity => {
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

    const onOrderByInitiative = column_id => () => {
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

    const entityFromState = entity => getAttr(state, `entities[${entity.id}]`) || {}

    const handleUpdateEntity = updatedEntity => {
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
        const { entities, columns } = state
        updateEntityBeingEdited({})
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
                    <DragDropContext onDragEnd={onDragEnd}>
                        <div className="test">
                            {state.columnOrder.map(columnId => {
                                const column = state.columns[columnId]
                                const entities = map(column.entityIds, entityId => state.entities[entityId])
                                let actionBtn = null
                                if (columnId === 'column_1') {
                                    actionBtn = (
                                        <button type="button" onClick={onOrderByInitiative(column.id)}>
                                            sort
                                        </button>
                                    )
                                }

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
                    </DragDropContext>
                </div>
            </div>

            <EntityCreator
                isOpen={entityCreatorIsOpen}
                onClose={() => setEntityCreatorIsOpen(false)}
                onEntityCreated={onEntityCreated}
            />

            <EntityEditor
                entityBeingEdited={entityFromState(entityBeingEdited)}
                onClose={() => updateEntityBeingEdited({})}
                onEntityChanged={handleUpdateEntity}
                onEntityRemoved={handleRemoveEntity}
            />
        </div>
    )
}

export default App
