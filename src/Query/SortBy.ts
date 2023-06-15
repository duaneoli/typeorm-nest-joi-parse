import { Generic } from './Generic'

export class SortBy<T = Record<string, any>> {
  private objGeneric: Generic<T>

  constructor(init: Partial<T> = {}) {
    this.objGeneric = new Generic(init)
  }

  set<K extends keyof T>(key: K, value: T[K], operator: 'ASC' | 'DESC') {
    this.objGeneric.set(key, { value, operator })
  }

  get<K extends keyof T>(key: K): undefined | { value: T[K]; operator: 'ASC' | 'DESC' } {
    return this.objGeneric.get(key)
  }
}
