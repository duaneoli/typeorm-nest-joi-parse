import { Filters } from './Filters'
import { SortBy } from './SortBy'

export class Query<T = Record<string, any>> {
  filters: Filters<T>
  sortBy: SortBy<T>
  page: number = 1
  pageSize: number = 10

  constructor() {
    this.filters = new Filters<T>()
    this.sortBy = new SortBy<T>()
  }

  stringify() {}

  parse(value: string) {
    return this
  }
}
