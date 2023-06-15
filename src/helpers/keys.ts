export function gerarChavesRecursivo(objeto: any, chavePai = ''): any {
  const chaves: { [key: string]: any } = {}

  for (let chave in objeto) {
    if (objeto.hasOwnProperty(chave)) {
      const valor = objeto[chave]
      const chaveCompleta = chavePai ? `${chavePai}.${chave}` : chave.toString()

      if (typeof valor === 'object' && valor !== null) {
        const chavesAninhadas = gerarChavesRecursivo(valor, chaveCompleta)
        Object.assign(chaves, chavesAninhadas)
      } else {
        chaves[chaveCompleta] = valor
      }
    }
  }

  return chaves
}

export function verificaChavesExistentes(chaves: { [key: string]: any }, tipo: any): boolean {
  for (let chave in chaves) {
    if (chaves.hasOwnProperty(chave)) {
      const partesChave = chave.split('.')
      let tipoAtual = tipo

      for (let i = 0; i < partesChave.length; i++) {
        const parte = partesChave[i]

        if (parte in tipoAtual) {
          tipoAtual = tipoAtual[parte]
        } else {
          return false
        }
      }
    }
  }

  return true
}

export function gerarObjetoRecursivo(chaves: { [key: string]: any }, tipo: any): any {
  const objeto: any = {}

  for (let chave in chaves) {
    if (chaves.hasOwnProperty(chave)) {
      const valor = chaves[chave]
      const partesChave = chave.split('.')
      let objetoAtual = objeto
      let tipoAtual = tipo

      let chaveValida = true
      for (let i = 0; i < partesChave.length; i++) {
        const parte = partesChave[i]

        if (tipoAtual && parte in tipoAtual) {
          tipoAtual = tipoAtual[parte]
          if (i === partesChave.length - 1) {
            objetoAtual[parte] = valor
          } else {
            if (!objetoAtual[parte]) {
              objetoAtual[parte] = {}
            }
            objetoAtual = objetoAtual[parte]
          }
        } else {
          chaveValida = false
          break
        }
      }

      if (chaveValida) {
        objetoAtual = valor
      }
    }
  }

  return objeto
}
