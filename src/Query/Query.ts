import { Filters } from './Filters'
import { SortBy } from './SortBy'

type TSortBy<T> = Record<keyof T, 'ASC' | 'DESC'>

export class Query<T> {
  filters: Filters<T>
  sortBy: SortBy<TSortBy<T>>
  // criar nova classe Page para gerenciar a paginacao
  // pageIndex: number = 0
  // pageSize: number = 10
  // page = this.pageIndex + 1

  constructor() {
    this.filters = new Filters<T>()
    this.sortBy = new SortBy<TSortBy<T>>()
  }

  stringify() {
    const stringifieds: string[] = []
    const stringifiedFilters = this.filters.stringify()
    const stringifiedSorter = this.sortBy.stringify()

    if (stringifiedSorter) {
      stringifieds.push('sortBy=' + stringifiedSorter)
    }

    if (stringifiedFilters) {
      stringifieds.push('filters=' + stringifiedFilters)
    }

    const stringified = stringifieds.join('&')

    return stringified
  }

  getAll() {
    return {
      filters: this.filters.format(),
      sortBy: this.sortBy.getAll(),
    }
  }

  static parse<T>(str: string) {
    const params = str.split('&')
    const query = new Query<T>()

    for (const param of params) {
      if (param.includes('filters')) query.filters = Filters.parse(param.replace('filters=', ''))
      if (param.includes('sortBy')) query.sortBy = SortBy.parse(param.replace('sortBy=', ''))
    }

    return query
  }
}