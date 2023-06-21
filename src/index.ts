import { Query } from './Query/Query'

type TExample = {
  type: string
  id: number
  'postLanguages.title': string
  category: string // not allowed
  'postLanguages.bannerImg': string
}

const query = new Query<TExample>()
const baseTestUrl = 'https://gateway.hml.ostenmoove.com.br/cms/posts?includes=postLanguages&'

query.sortBy.set('id', 'ASC')
query.sortBy.set('type', 'DESC')

query.filters.set('type').equals('BLOG')
query.filters.set('postLanguages.title').like('papel', 'any')
query.filters.set('id').between(220, 230)

query.filters.remove('postLanguages.title')
query.filters.remove('type')
query.filters.remove('id')

query.filters.set('id').between(320, 330)
query.filters.set('type').equals('NEWS', 'BLOG')

query.filters.set('category').not('20', '47') // not allowed
query.filters.remove('category')

query.filters.set('postLanguages.title').like('osten', 'any')
query.filters.set('postLanguages.title').iLike('osten', 'any')

query.filters.set('postLanguages.title').iLike('a', 'start')

query.filters.set('postLanguages.bannerImg').isEmpty() // ?
query.filters.remove('postLanguages.bannerImg')

query.filters.clear()

query.filters.set('type').not('NEWS')
query.filters.set('id').lessThanOrEqual(330)

query.filters.set('id').moreThanOrEqual(330)

query.filters.set('id').moreThan(330)

query.filters.clear()
query.filters.set('postLanguages.title').iLike('a', 'start')

query.filters.set('id').equals(5)
query.filters.set('id').equals(6)
console.log(query.filters.get('postLanguages.title'))

const stringifiedQuery = query.stringify()

console.log(stringifiedQuery)
console.log(baseTestUrl + stringifiedQuery)
