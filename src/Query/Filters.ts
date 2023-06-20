import { Generic } from './Generic'

type EmptyValue = Record<string, any> | Array<any> | string
type NumberOrDate = number | Date
type BetweenValue = NumberOrDate | string

type LikeConfig = Partial<{
  i: boolean // case insensitive
  at: 'start' | 'end' | 'any' | 'strict'
}>

export class Filters<T> {
  private genericObject: Generic<T>

  constructor(init: Partial<T> = {}) {
    this.genericObject = new Generic(init)
  }

  reset() {
    this.genericObject.clear()
  }

  clear(key: keyof T) {
    this.genericObject.remove(key)
  }

  getAll() {
    return this.genericObject.getAll()
  }

  get(key: keyof T) {
    return this.genericObject.get(key)
  }

  add<K extends keyof T>(key: K) {
    return {
      equals: (...value: Array<T[K]>) => {
        this.equals(key, value)
      },
      not: (...value: Array<T[K]>) => {
        this.not(key, value)
      },
      isEmpty: (value: EmptyValue) => {
        this.isEmpty(key, value)
      },
      isNotEmpty: (value: EmptyValue) => {
        this.isNotEmpty(key, value)
      },
      lessThan: (value: NumberOrDate) => {
        this.lessThan(key, value)
      },
      lessThanOrEqual: (value: NumberOrDate) => {
        this.lessThanOrEqual(key, value)
      },
      moreThan: (value: NumberOrDate) => {
        this.moreThan(key, value)
      },
      moreThanOrEqual: (value: NumberOrDate) => {
        this.moreThanOrEqual(key, value)
      },
      between: (from: BetweenValue & T[K], to: BetweenValue & T[K]) => {
        this.between(key, from, to)
      },
      like: (value: string, config?: LikeConfig) => {
        this.like(key, value, config)
      },
    }
  }

  set(key: keyof T) {
    this.clear(key)

    return this.add(key)
  }

  private equals<K extends keyof T>(key: K, value: Array<T[K]>) {
    const prevKeyValue = this.genericObject.get(key)?.value || []
    this.genericObject.add(key, { value: [...prevKeyValue, ...value], operator: 'equals' })
  }

  private not<K extends keyof T>(key: K, value: Array<T[K]>) {
    const prevKeyValue = this.genericObject.get(key)?.value || []
    this.genericObject.add(key, { value: [...prevKeyValue, ...value], operator: 'not' })
  }

  private isEmpty<K extends keyof T>(key: K, value: EmptyValue) {
    this.genericObject.add(key, { value, operator: 'isEmpty' })
  }

  private isNotEmpty<K extends keyof T>(key: K, value: EmptyValue) {
    this.genericObject.add(key, { value, operator: 'isNotEmpty' })
  }

  private lessThan<K extends keyof T>(key: K, value: NumberOrDate) {
    this.genericObject.add(key, { value, operator: 'lessThan' })
  }

  private lessThanOrEqual<K extends keyof T>(key: K, value: NumberOrDate) {
    this.genericObject.add(key, { value, operator: 'lessThanOrEqual' })
  }

  private moreThan<K extends keyof T>(key: K, value: NumberOrDate) {
    this.genericObject.add(key, { value, operator: 'moreThan' })
  }

  private moreThanOrEqual<K extends keyof T>(key: K, value: NumberOrDate) {
    this.genericObject.add(key, { value, operator: 'moreThanOrEqual' })
  }

  private between<K extends keyof T>(key: K, from: BetweenValue & T[K], to: BetweenValue & T[K]) {
    this.genericObject.add(key, {
      from,
      to,
      operator: 'between',
    })
  }

  private like<K extends keyof T>(key: K, value: string, config: LikeConfig = { i: false, at: 'strict' }) {
    const { i, at = 'strict' } = config

    let operator: string = {
      start: 'like%',
      end: '%like',
      any: '%like%',
      strict: 'like',
    }[at]

    if (i) {
      operator = operator.replace('like', 'iLike')
    }

    this.genericObject.add(key, { value, operator })
  }
}
