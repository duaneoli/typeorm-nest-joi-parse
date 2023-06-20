import { Generic } from './Generic'

export class SortBy<T extends Record<string, 'ASC' | 'DESC'>> {
  private genericObject: Generic<T>

  constructor(init: Partial<T> = {}) {
    this.genericObject = new Generic(init)
  }

  set<K extends keyof T>(key: K, operator: 'ASC' | 'DESC') {
    this.genericObject.add(key, operator)
  }

  remove<K extends keyof T>(key: K) {
    this.genericObject.remove(key)
  }

  get() {
    return this.genericObject.getAll()
  }
}
