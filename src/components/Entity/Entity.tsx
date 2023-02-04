import cn from 'classnames'
import styled from 'styled-components'

import { ENTITY_TYPES } from '../../constants'

import './Entity.scss'

export interface IEntity {
    id: string;
    initiative: number;
    name: string;
    hitpoints: number;
}

const EntityDiv = styled.div``

const Entity = props => {
    const isType = (entity: IEntity, type) => entity.type === type
    const cssEntityType = isType(props.entity, ENTITY_TYPES.player) ? 'm_player' : 'm_foe'

    return (
        <EntityDiv
            className={cn('entity')}
            onClick={() => props.onEditEntity(props.entity)}
        >
            <div className="entity__leftSide">
                <div
                    className={cn('entity__initiative', cssEntityType)}
                    role="presentation"
                >
                    {props.entity.initiative}
                </div>
                <p className="entity__name">{props.entity.name}</p>
            </div>

            <div className="entity__rightSide">
                <p className="entity__hitpoints">{props.entity.hitpoints}HP</p>
            </div>
        </EntityDiv>
    )
}

export default Entity
