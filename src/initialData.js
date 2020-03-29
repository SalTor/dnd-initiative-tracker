import cuid from 'cuid'

const id1 = cuid()
const id2 = cuid()
const id3 = cuid()
const id4 = cuid()
const id5 = cuid()
const id6 = cuid()

const initialData = {
    entities: {
        [id1]: { id: id1, name: 'Aracorn', initiative: 18 },
        [id2]: { id: id2, name: 'Billy Baggon', initiative: 14 },
        [id3]: { id: id3, name: 'Celebond', initiative: 13 },
        [id4]: { id: id4, name: 'Daygol', initiative: 10 },
        [id5]: { id: id5, name: 'Eyothayne', initiative: 8 },
        [id6]: { id: id6, name: 'Gallem', initiative: 3 },
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'Alive',
            entityIds: [id1, id2, id3, id4, id5],
        },
        'column-2': {
            id: 'column-2',
            title: 'Defeated',
            entityIds: [],
        },
    },
    columnOrder: ['column-1', 'column-2'],
}

export default initialData
