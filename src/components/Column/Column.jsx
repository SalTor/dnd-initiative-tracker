import React from 'react'
import styled from 'styled-components'
import { Droppable } from 'react-beautiful-dnd'
import { toNumber } from 'lodash-es'

import Entity from '../Entity/Entity'

import './Column.scss'

const Container = styled.div`
    width: 300px;
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;

    display: flex;
    flex-direction: column;
`
const Title = styled.h3`
    padding: 8px;
`
const EntityList = styled.div`
    padding: 8px;
    background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
    flex-grow: 1;
    min-height: 200px;
`

const Column = props => {
    return (
        <Container className="column">
            <div className="column__header">
                <Title>{props.column.title}</Title>
                <button
                    type="button"
                    onClick={props.onOrderBy(props.column.id, entity => toNumber(entity.initiative), ['desc'])}
                >
                    sort
                </button>
            </div>
            <Droppable droppableId={props.column.id}>
                {(provided, snapshot) => (
                    <EntityList
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        isDraggingOver={snapshot.isDraggingOver}
                    >
                        {props.entities.map((entity, index) => (
                            <Entity key={entity.id} entity={entity} index={index} />
                        ))}
                        {provided.placeholder}
                    </EntityList>
                )}
            </Droppable>
        </Container>
    )
}

export default Column
