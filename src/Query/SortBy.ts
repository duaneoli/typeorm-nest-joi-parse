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

  get(key: keyof T) {
    return this.genericObject.get(key) as 'ASC' | 'DESC'
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
}
