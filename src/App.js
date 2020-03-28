import React from 'react'
import styled from 'styled-components'
import '@atlaskit/css-reset'
import { DragDropContext } from 'react-beautiful-dnd'

import { useSessionStorageState } from './utils/customHooks'

import Column from './components/Column/Column'

import './App.css'

const initialData = {
    entities: {
        'entity-1': { id: 'entity-1', content: 'Entity 1' },
        'entity-2': { id: 'entity-2', content: 'Entity 2' },
        'entity-3': { id: 'entity-3', content: 'Entity 3' },
        'entity-4': { id: 'entity-4', content: 'Entity 4' },
        'entity-5': { id: 'entity-5', content: 'Entity 5' },
        'entity-6': { id: 'entity-6', content: 'Entity 6' },
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'Alive',
            entityIds: ['entity-1', 'entity-2', 'entity-3', 'entity-4', 'entity-5'],
        },
        'column-2': {
            id: 'column-2',
            title: 'Killed',
            entityIds: [],
        },
    },
    columnOrder: ['column-1', 'column-2'],
}

const PageTitle = styled.h1`
    text-decoration: underline;
    margin-bottom: 15px;
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
    const [state, setState] = useSessionStorageState(initialData, 'initiative-tracker')

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

    return (
        <div style={{ padding: 10 }}>
            <PageTitle>Initiative Tracker</PageTitle>

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
        </div>
    )
}

export default App
