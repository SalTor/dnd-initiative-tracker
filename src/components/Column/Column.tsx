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

            <EntityList
                className={cn('entityList')}
            >
                {props.entities.map((entity, index) => (
                    <Entity {...props.entityProps} key={entity.id} entity={entity} index={index} />
                ))}
            </EntityList>
        </div>
    )
}

export default Column
