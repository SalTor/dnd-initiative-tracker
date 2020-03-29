import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'

import './Entity.scss'

const Container = styled.div`
    border: 1px solid lightgrey;
    padding: 8px;
    margin-bottom: 8px;
    border-radius: 2px;
    background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};

    display: flex;
`

const Entity = props => {
    return (
        <Draggable draggableId={props.entity.id} index={props.index}>
            {(provided, snapshot) => (
                <Container
                    className="entity"
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                >
                    <div className="entity__initiative" {...provided.dragHandleProps}>
                        {props.entity.initiative}
                    </div>
                    <p className="entity__name">{props.entity.name}</p>
                </Container>
            )}
        </Draggable>
    )
}

export default Entity
