import { formatArrayToQuery } from '../helpers/types'
import { Generic } from './Generic'

type NumberOrDate = number | Date
type BetweenValue = NumberOrDate | string

type LikeAt = 'start' | 'end' | 'any' | 'strict'

type Value<T, K extends keyof T> = Array<T[K]> | string | Date | number

type Operator =
  | 'isEmpty'
  | 'isNotEmpty'
  | 'not'
  | 'lessThan'
  | 'lessThanOrEqual'
  | 'moreThan'
  | 'moreThanOrEqual'
  | 'equals'
  | 'between'
  | 'iLike'
  | '%iLike'
  | 'iLike%'
  | '%iLike%'
  | 'like'
  | '%like'
  | 'like%'
  | '%like%'

type Filter<T, K extends keyof T> = { value?: Value<T, K>; operator: Operator }

export class Filters<T> {
  private genericObject: Generic<T>

  constructor(init: Partial<T> = {}) {
    this.genericObject = new Generic(init)
  }

  clear() {
    this.genericObject.clear()
  }

  remove(key: keyof T) {
    this.genericObject.remove(key)
  }

  format() {
    return this.genericObject.format()
  }

  get<K extends keyof T>(key: K) {
    return this.genericObject.get(key) as { value: Array<T[K]>; operator: Operator }
  }

  getAll() {
    return this.genericObject.getAll()
  }

  set<K extends keyof T>(key: K) {
    return {
      equals: (...value: Array<T[K]>) => {
        this.equals(key, value)
      },
      not: (...value: Array<T[K]>) => {
        this.not(key, value)
      },
      isEmpty: () => {
        this.isEmpty(key)
      },
      isNotEmpty: () => {
        this.isNotEmpty(key)
      },
      lessThan: (...value: Array<NumberOrDate>) => {
        this.lessThan(key, value)
      },
      lessThanOrEqual: (...value: Array<NumberOrDate>) => {
        this.lessThanOrEqual(key, value)
      },
      moreThan: (...value: Array<NumberOrDate>) => {
        this.moreThan(key, value)
      },
      moreThanOrEqual: (...value: Array<NumberOrDate>) => {
        this.moreThanOrEqual(key, value)
      },
      between: (...value: Array<BetweenValue & T[K]>) => {
        this.between(key, value)
      },
      like: (value: string, at: LikeAt = 'strict') => {
        this.like(key, value, at)
      },
      iLike: (value: string, at: LikeAt = 'strict') => {
        this.iLike(key, value, at)
      },
    }
  }

  stringify<K extends keyof T>() {
    const filters = this.getAll()

    let query: string = ''

    for (let key in filters) {
      if (filters[key]) {
        const filter = filters[key] as Filter<T, K>

        if (query !== '') {
          query += ';'
        }

        query += key

        let value = filter.value || ''

        if (Array.isArray(filter.value)) {
          value = formatArrayToQuery(filter.value as Array<T[K]>)
        }

        query += ':' + value

        if (filter.operator) {
          query += '$' + filter.operator
        }
      }
    }

    return query
  }

  static parse<T>(str: string) {
    const filter = new Filters<T>()
    str.split(';').forEach((keyValue) => {
      const [key, value] = keyValue.split(':')
      const kk = filter.set(key as any)
      const [v, operator] = value.split('$') as [any, Operator]
      if (operator === 'equals') kk.equals(...v.split(','))
      else if (operator === 'not') kk.not(...v.split(','))
      else if (operator === 'isEmpty') kk.isEmpty()
      else if (operator === 'isNotEmpty') kk.isNotEmpty()
      else if (operator === 'lessThan') kk.lessThan(v)
      else if (operator === 'lessThanOrEqual') kk.lessThanOrEqual(v)
      else if (operator === 'moreThan') kk.moreThan(v)
      else if (operator === 'moreThanOrEqual') kk.moreThanOrEqual(v)
      else if (operator === 'between') kk.between(...v.split(','))
      else if (operator.replaceAll('%', '') === 'like')
        kk.like(v, operator[0] === '%' ? (operator[operator.length - 1] === '%' ? 'any' : 'start') : operator[operator.length - 1] === '%' ? 'end' : 'strict')
      else if (operator.replaceAll('%', '') === 'iLike')
        kk.iLike(v, operator[0] === '%' ? (operator[operator.length - 1] === '%' ? 'any' : 'start') : operator[operator.length - 1] === '%' ? 'end' : 'strict')
    })

    return filter
  }

  private equals<K extends keyof T>(key: K, value: Array<T[K]>) {
    this.genericObject.add(key, { value, operator: 'equals' })
  }

  private not<K extends keyof T>(key: K, value: Array<T[K]>) {
    this.genericObject.add(key, { value, operator: 'not' })
  }

  private isEmpty<K extends keyof T>(key: K) {
    this.genericObject.add(key, { operator: 'isEmpty' })
  }

  private isNotEmpty<K extends keyof T>(key: K) {
    this.genericObject.add(key, { operator: 'isNotEmpty' })
  }

  private lessThan<K extends keyof T>(key: K, value: Array<NumberOrDate>) {
    this.genericObject.add(key, { value, operator: 'lessThan' })
  }

  private lessThanOrEqual<K extends keyof T>(key: K, value: Array<NumberOrDate>) {
    this.genericObject.add(key, { value, operator: 'lessThanOrEqual' })
  }

  private moreThan<K extends keyof T>(key: K, value: Array<NumberOrDate>) {
    this.genericObject.add(key, { value, operator: 'moreThan' })
  }

  private moreThanOrEqual<K extends keyof T>(key: K, value: Array<NumberOrDate>) {
    this.genericObject.add(key, { value, operator: 'moreThanOrEqual' })
  }

  private between<K extends keyof T>(key: K, value: Array<BetweenValue & T[K]>) {
    this.genericObject.add(key, {
      value,
      operator: 'between',
    })
  }

  private like<K extends keyof T>(key: K, value: string, at: LikeAt = 'strict') {
    let operator: string = {
      start: 'like%',
      end: '%like',
      any: '%like%',
      strict: 'like',
    }[at]

    this.genericObject.add(key, { value, operator })
  }

  private iLike<K extends keyof T>(key: K, value: string, at: LikeAt = 'strict') {
    let operator: string = {
      start: 'iLike%',
      end: '%iLike',
      any: '%iLike%',
      strict: 'iLike',
    }[at]

    this.genericObject.add(key, { value, operator })
  }
}
