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
    return {
      filters: this.filters.getAll(),
      sortyBy: this.sortBy.get()
    }
  }

  parse(value: string) {
    return this
  }
}
