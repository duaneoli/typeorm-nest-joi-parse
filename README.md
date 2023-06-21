Biblioteca simplificada para padrão de logs

## Exemplos de utilização

### 1. Criando um tipo para a query com as colunas que podem ser filtradas/ordenadas
```ts
type TExample = {
  id: number
  type: string
  'user.role': string
  'address.street': string
  'address.number': number
}
```
### 2. Instanciando a Query passando o tipo criado
```ts
const query = new Query<TExample>()
```

### 3. Adicionando e removendo colunas do sortBy
```ts
query.sortBy.set('id', 'ASC')
query.sortBy.set('type', 'DESC')
```

```ts
query.sortBy.remove('id')
```

### 4. Adicionando e removendo colunas do filters
```ts
query.filters.set('type').equals('BLOG')
query.filters.set('type').equals('NEWS', 'BLOG')
```

```ts
query.filters.set('type').not('NEWS')
```

```ts
query.filters.set('address.street').like('Tancredo', 'any')
query.filters.set('address.street').iLike('rua', 'start')
```

```ts
query.filters.set('id').between(220, 230)
```

```ts
query.filters.set('user.role').isEmpty()
```

```ts
query.filters.set('id').lessThanOrEqual(330)
query.filters.set('id').moreThanOrEqual(330)
query.filters.set('id').moreThan(330)
```

```ts
query.filters.remove('address.street')
query.filters.remove('type')
```

```ts
query.filters.clear()
```

### 5. Retornando a query em string
```ts
const stringifiedQuery = query.stringify()
```
