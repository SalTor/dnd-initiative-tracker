import React from 'react'
import cn from 'classnames'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'

import './Entity.scss'

const EntityDiv = styled.div``

const Entity = props => {
    return (
        <Draggable draggableId={props.entity.id} index={props.index}>
            {(provided, snapshot) => (
                <EntityDiv
                    className={cn('entity', snapshot.isDragging && 'm_isDragging')}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    isdragging={snapshot.isDragging}
                >
                    <div className="entity__initiative" {...provided.dragHandleProps}>
                        {props.entity.initiative}
                    </div>
                    <p className="entity__name">{props.entity.name}</p>
                </EntityDiv>
            )}
        </Draggable>
    )
}

export default Entity
