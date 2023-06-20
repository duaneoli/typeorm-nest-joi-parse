import { Query } from './Query'

type ExemploTipo = {
  nome: string
  idade: number
  createdAt: Date
  disabled: boolean
  'endereco.name': string
  'endereco.address': string
}

const query = new Query<ExemploTipo>()

query.filters.add('idade').equals(1, 2, 3, 4, 5, 6)
query.filters.add('idade').equals(7)
query.filters.add('idade').not(1, 2, 3, 4, 5, 6)
query.filters.add('idade').not(7)
query.filters.add('endereco.address').between('a', 'b')
query.filters.add('createdAt').between(new Date(), new Date())

query.filters.add('nome').like('eduardo', { i: true })

query.sortBy.set('nome', 'DESC')
query.sortBy.set('idade', 'ASC')

console.log(query.stringify())
