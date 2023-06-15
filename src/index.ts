import { Query } from './Query'

type ExemploTipo = {
  nome: string
  idade: number
  'endereco.name': string
  'endereco.address': string
}

const query = new Query<ExemploTipo>()

query.filters.set('idade').equals(1, 2, 3, 4, 5, 6)
query.filters.add('idade').equals(7)
query.sortBy.set('nome', 'duane', 'DESC')
