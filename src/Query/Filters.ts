import { Generic } from './Generic'

export class Filters<T = Record<string, any>> {
  private objGeneric: Generic<T>

  constructor(init: Partial<T> = {}) {
    this.objGeneric = new Generic(init)
  }

  private equals<K extends keyof T>(key: K, value: Array<T[K]>, add = true) {
    if (!add) this.objGeneric.set(key, { value, operator: 'equals' })
    else {
      const b = this.objGeneric.get(key)
      this.objGeneric.set(key, { value: [...b.value, value], operator: 'equals' })
    }
  }

  set<K extends keyof T>(key: K) {
    return {
      equals: (...value: Array<T[K]>) => this.equals(key, value, false),
    }
  }

  add<K extends keyof T>(key: K) {
    return {
      equals: (...value: Array<T[K]>) => this.equals(key, value, true),
    }
  }

  get<K extends keyof T>(key: K) {
    return this.objGeneric.get(key)
  }
}
