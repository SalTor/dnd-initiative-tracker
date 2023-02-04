import cn from 'classnames'
import { useAtom } from 'jotai'
import styled from 'styled-components'
import { entityFocusAtom } from '../../App'

import './Entity.scss'

export interface IEntity {
    id: string
    initiative: number
    name: string
    hitpoints: number
    maxHitpoints: number
    type: EntityType
}

export enum EntityType {
    Player = 'entity-type::player',
    Enemy = 'entity-type::enemy',
}

const EntityDiv = styled.div``

type Props = {
    entity: IEntity
}

const Entity: React.FC<Props> = (props) => {
    const isType = (entity: IEntity, type: EntityType) => entity.type === type
    const cssEntityType = isType(props.entity, EntityType.Player) ? 'm_player' : 'm_foe'
    const [, setEntityBeingUpdated] = useAtom(entityFocusAtom)

    return (
        <EntityDiv className={cn('entity')} onClick={() => setEntityBeingUpdated(props.entity)}>
            <div className="entity__leftSide">
                <div className={cn('entity__initiative', cssEntityType)} role="presentation">
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
