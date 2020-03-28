import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'

const Container = styled.div`
    border: 1px solid lightgrey;
    padding: 8px;
    margin-bottom: 8px;
    border-radius: 2px;
    background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};

    display: flex;
`

const Handle = styled.div`
    width: 20px;
    height: 20px;
    background-color: orange;
    border-radius: 4px;
    margin-right: 8px;
`

const Entity = props => {
    return (
        <Draggable draggableId={props.entity.id} index={props.index}>
            {(provided, snapshot) => (
                <Container {...provided.draggableProps} ref={provided.innerRef} isDragging={snapshot.isDragging}>
                    <Handle {...provided.dragHandleProps} />
                    {props.entity.content}
                </Container>
            )}
        </Draggable>
    )
}

export default Entity
