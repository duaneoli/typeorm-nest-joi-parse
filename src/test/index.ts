import { Query } from '../Query/Query'

const query = new Query<{ nome: string; 'empresa.duane': string; createdAt: string }>()
query.filters.set('nome').equals('duane')
query.filters.set('empresa.duane').equals('duane')
query.filters.set('createdAt').between('2020-01-01', '2020-01-01')
query.sortBy.set('nome', 'ASC')
const a = Query.parse<{ nome: string }>(query.stringify())
console.log(a.filters.get('nome'))
console.log(a.stringify())
