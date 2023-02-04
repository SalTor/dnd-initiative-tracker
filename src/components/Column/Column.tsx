import cn from 'classnames'
import { noop } from 'lodash'
import styled from 'styled-components'

import Entity, { IEntity } from '../Entity/Entity'

import './Column.scss'

const EntityList = styled.div``

type Props = {
    offerSort?: boolean
    title: string
    onSortRequested?: () => void
    entities: IEntity[]
}

const Column: React.FC<Props> = ({ offerSort = false, onSortRequested = noop, title, entities }) => {
    return (
        <div className="column">
            <div className="column__header">
                <h3 className="column__title">{title}</h3>
                {offerSort && <button onClick={onSortRequested}>Sort</button>}
            </div>

            <EntityList className={cn('entityList')}>
                {entities.map((entity) => (
                    <Entity key={entity.id} entity={entity} />
                ))}
            </EntityList>
        </div>
    )
}

export default Column
