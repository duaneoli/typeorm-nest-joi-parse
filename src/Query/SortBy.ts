import { Generic } from './Generic'

type SortOperator = 'ASC' | 'DESC'

export class SortBy<T extends Record<string, SortOperator>> {
  private genericObject: Generic<T>

  constructor(init: Partial<T> = {}) {
    this.genericObject = new Generic(init)
  }

  set<K extends keyof T>(key: K, operator: SortOperator) {
    this.genericObject.add(key, operator)
  }

  remove<K extends keyof T>(key: K) {
    this.genericObject.remove(key)
  }

  get(key: keyof T) {
    return this.genericObject.get(key) as SortOperator
  }

  getAll() {
    return this.genericObject.getAll()
  }

  stringify() {
    return Object.keys(this.getAll()).length
      ? JSON.stringify(this.getAll())
          .replace(/"(\w+)":"(\w+)"/g, '$1:$2')
          .replace(/[{}]/g, '')
          .replace(/,/g, ';')
      : ''
  }

  static parse<T extends Record<string, SortOperator>>(str: string): SortBy<T> {
    const sortBy = new SortBy<T>()

    const entries = str.split(';')
    
    for (const entry of entries) {
      const [key, value] = entry.split(':') as [keyof T, SortOperator]
      sortBy.set(key, value)
    }

    return sortBy
  }
}
