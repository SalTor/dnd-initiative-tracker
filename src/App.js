import React from 'react'
import '@atlaskit/css-reset'
import { DragDropContext } from 'react-beautiful-dnd'
import { map, orderBy, toNumber } from 'lodash-es'

import { useSessionStorageState } from './utils/customHooks'

import { CACHE_IDS } from './constants'

import EntityForm from './components/EntityForm/EntityForm'
import Column from './components/Column/Column'

import initialData from './initialData'

import './App.scss'

const App = () => {
    const [state, setState] = useSessionStorageState(initialData, CACHE_IDS.initiative_tracker)

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

    return (
        <div style={{ padding: 10 }}>
            <div className="appHeader">
                <h1>Initiative Tracker</h1>
                <button type="button" onClick={() => sessionStorage.removeItem(CACHE_IDS.initiative_tracker)}>
                    Clear Cache
                </button>
            </div>

            <div className="formAndTracker">
                <EntityForm onEntityCreated={onEntityCreated} />

                <div className="draggableWrapper">
                    <DragDropContext onDragEnd={onDragEnd}>
                        <div className="test">
                            {state.columnOrder.map(columnId => {
                                const column = state.columns[columnId]
                                const entities = column.entityIds.map(entityId => state.entities[entityId])

                                return (
                                    <Column
                                        onSort={onOrderByInitiative}
                                        key={column.id}
                                        column={column}
                                        entities={entities}
                                    />
                                )
                            })}
                        </div>
                    </DragDropContext>
                </div>
            </div>
        </div>
    )
}

export default App
