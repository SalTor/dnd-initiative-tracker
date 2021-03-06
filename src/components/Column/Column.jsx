import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import cn from 'classnames'
import styled from 'styled-components'

import Entity from '../Entity/Entity'

import './Column.scss'

const EntityList = styled.div``

const Column = props => {
    return (
        <div className="column">
            <div className="column__header">
                <h3 className="column__title">{props.column.title}</h3>
                {props.actionBtn}
            </div>

            <Droppable droppableId={props.column.id}>
                {(provided, snapshot) => (
                    <EntityList
                        {...provided.droppableProps}
                        className={cn('entityList', snapshot.isDraggingOver && 'm_isDraggingOver')}
                        ref={provided.innerRef}
                        isdraggingover={snapshot.isDraggingOver}
                    >
                        {props.entities.map((entity, index) => (
                            <Entity {...props.entityProps} key={entity.id} entity={entity} index={index} />
                        ))}
                        {provided.placeholder}
                    </EntityList>
                )}
            </Droppable>
        </div>
    )
}

export default Column
