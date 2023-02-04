import { IEntity } from './components/Entity/Entity'
const initialData: {
    entities: Record<string, IEntity>;
    columns: Record<string, { id: string; title: string; entityIds: string[] }>;
    columnOrder: string[]
} = {
    entities: {},
    columns: {
        column_1: {
            id: 'column_1',
            title: 'Alive',
            entityIds: [],
        },
        column_2: {
            id: 'column_2',
            title: 'Defeated',
            entityIds: [],
        },
    },
    columnOrder: ['column_1', 'column_2'],
}

export default initialData
