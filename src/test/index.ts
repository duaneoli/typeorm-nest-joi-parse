import { Query } from '../Query/Query'

type Example = {
  name: string
  'company.name': string
  createdAt: string
  year: number
}

const query = new Query<Example>()

query.filters.set('name').like('Duane', 'start')
query.filters.set('company.name').iLike('Consórcio', 'any')
query.filters.set('year').lessThanOrEqual(1993)
query.filters.set('createdAt').between('2020-01-01', '2020-02-01')
query.filters.remove('name')

query.sortBy.set('name', 'ASC')
query.sortBy.set('year', 'DESC')
query.sortBy.remove('name')

const stringifiedSorter = query.sortBy.stringify()
// console.log(stringifiedSorter)
// year:DESC

const stringifiedFilters = query.filters.stringify()
// console.log(stringifiedFilters)
// name:Duane$like%;year:1993$lessThanOrEqual;createdAt:2020-01-01,2020-02-01$between

const stringifiedQuery = query.stringify()
// console.log(stringifiedQuery)
// sortBy=year:DESC&filters=company.name:Consórcio$%iLike%;year:1993$lessThanOrEqual;createdAt:2020-01-01,2020-02-01$between

const query_ = Query.parse<Example>('sortBy=year:DESC&filters=aaa.name:Consórcio$%iLike%;year:1993$lessThanOrEqual;createdAt:2020-01-01,2020-02-01$between')
console.log(query_.stringify())
console.log(query_.getAll())
/*
sortBy=year:DESC&filters=aaa.name:Consórcio$%iLike%;year:1993$lessThanOrEqual;createdAt:2020-01-01,2020-02-01$between

{
  filters: {
    aaa: { name: { value: 'Consórcio', operator: '%iLike%' } },
    year: { value: [ '1993' ], operator: 'lessThanOrEqual' },
    createdAt: { value: [ '2020-01-01', '2020-02-01' ], operator: 'between' }
  },
  sortBy: { year: 'DESC' }
}
*/
