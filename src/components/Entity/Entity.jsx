import React from 'react'
import cn from 'classnames'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'

import { ENTITY_TYPES } from '../../constants'

import './Entity.scss'

const EntityDiv = styled.div``

const Entity = props => {
    const isType = (entity, type) => entity.type === type
    const cssEntityType = isType(props.entity, ENTITY_TYPES.player) ? 'm_player' : 'm_foe'

    return (
        <Draggable draggableId={props.entity.id} index={props.index}>
            {(provided, snapshot) => (
                <EntityDiv
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    className={cn('entity', snapshot.isDragging && 'm_isDragging', cssEntityType)}
                    isdragging={snapshot.isDragging}
                    onClick={() => props.onEditEntity(props.entity)}
                >
                    <div className="entity__leftSide">
                        <div
                            className={cn('entity__initiative', cssEntityType)}
                            {...provided.dragHandleProps}
                            role="presentation"
                        />
                        <p className="entity__name">{props.entity.name}</p>
                    </div>

                    <div className="entity__rightSide">
                        <p className="entity__hitpoints">{props.entity.hitpoints}HP</p>
                    </div>
                </EntityDiv>
            )}
        </Draggable>
    )
}

export default Entity
