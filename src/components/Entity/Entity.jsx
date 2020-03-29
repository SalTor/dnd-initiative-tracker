import React from 'react'
import cn from 'classnames'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'

import { ENTITY_TYPES } from '../../constants'

import './Entity.scss'

const EntityDiv = styled.div``

const Entity = props => {
    const isType = (entity, type) => entity.type === type

    return (
        <Draggable draggableId={props.entity.id} index={props.index}>
            {(provided, snapshot) => (
                <EntityDiv
                    className={cn(
                        'entity',
                        snapshot.isDragging && 'm_isDragging',
                        isType(props.entity, ENTITY_TYPES.player) ? 'm_player' : 'm_foe',
                    )}
                    ref={provided.innerRef}
                    isdragging={snapshot.isDragging}
                    {...provided.draggableProps}
                >
                    <div className="entity__leftSide">
                        <div className="entity__initiative" {...provided.dragHandleProps}>
                            {props.entity.initiative}
                        </div>
                        <p className="entity__name">{props.entity.name}</p>
                    </div>

                    <div className="entity__rightSide">
                        <p className="entity__hitpoints">
                            {props.entity.hitpoints} / {props.entity.hitpoints}
                        </p>
                    </div>
                </EntityDiv>
            )}
        </Draggable>
    )
}

export default Entity
