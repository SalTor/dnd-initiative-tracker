import React from 'react'
import styled from 'styled-components'
import '@atlaskit/css-reset'
import { DragDropContext } from 'react-beautiful-dnd'

import { useSessionStorageState } from './utils/customHooks'

import { CACHE_IDS } from './constants'

import EntityForm from './components/EntityForm/EntityForm'
import Column from './components/Column/Column'

import initialData from './initialData'

import './App.css'

const PageHeader = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 25px;

    > h1 {
        text-decoration: underline;
        margin-right: 15px;
    }
    > button {
        height: 30px;
        background: none;
        border-radius: 4px;
    }
`

const PageTitle = styled.h1``

const FormAndTracker = styled.div`
    display: flex;
`

const DraggableWrapper = styled.div`
    > div {
        margin: 0;
    }
`

const Container = styled.div`
    display: flex;
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
`

const App = () => {
    const [state, setState] = useSessionStorageState(initialData, CACHE_IDS.initiative_tracker)

    const onDragEnd = result => {
        const { destination, source, draggableId } = result

        if (destination) {
            if (destination.droppableId === source.droppableId && destination.index === source.index) {
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

    return (
        <div style={{ padding: 10 }}>
            <PageHeader>
                <PageTitle>Initiative Tracker</PageTitle>
                <button type="button" onClick={() => sessionStorage.removeItem(CACHE_IDS.initiative_tracker)}>
                    Clear Cache
                </button>
            </PageHeader>

            <FormAndTracker>
                <EntityForm onEntityCreated={onEntityCreated} />

                <DraggableWrapper>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Container>
                            {state.columnOrder.map(columnId => {
                                const column = state.columns[columnId]
                                const entities = column.entityIds.map(entityId => state.entities[entityId])

                                return <Column key={column.id} column={column} entities={entities} />
                            })}
                        </Container>
                    </DragDropContext>
                </DraggableWrapper>
            </FormAndTracker>
        </div>
    )
}

export default App
