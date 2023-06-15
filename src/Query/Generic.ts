export class Generic<T = Record<string, any>> {
  private obj: Partial<T>

  constructor(init: Partial<T> = {}) {
    this.obj = init
  }

  get(key: keyof T): any | undefined {
    return this.obj[key]
  }

  set(key: keyof T, value: any): any | undefined {
    return (this.obj[key] = value)
  }
}
