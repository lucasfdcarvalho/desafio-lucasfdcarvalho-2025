class AbrigoAnimais {
  // definindo os atributos
  animaisInfo;
  brinquedosValidos;

  // inicializando o abrigo de animais
  constructor() {
    this.animaisInfo = {
      Rex: { tipo: "cao", brinquedos: ["RATO", "BOLA"] },
      Mimi: { tipo: "gato", brinquedos: ["BOLA", "LASER"] },
      Fofo: { tipo: "gato", brinquedos: ["BOLA", "RATO", "LASER"] },
      Zero: { tipo: "gato", brinquedos: ["RATO", "BOLA"] },
      Bola: { tipo: "cao", brinquedos: ["CAIXA", "NOVELO"] },
      Bebe: { tipo: "cao", brinquedos: ["LASER", "RATO", "BOLA"] },
      Loco: { tipo: "jabuti", brinquedos: ["SKATE", "RATO"] }
    };

    this.brinquedosValidos = ["RATO", "BOLA", "SKATE", "LASER", "CAIXA", "NOVELO"];
  }

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    /*colocando os brinquedos das pessoas em um vetor, removendo espaços caso tenha e filtrando o resultado para manter somente os que não forem vazios("")*/

    const pessoa1 = brinquedosPessoa1.split(",").map(brinquedo => brinquedo.trim()).filter(b => b.length > 0);

    const pessoa2 = brinquedosPessoa2.split(",").map(brinquedo => brinquedo.trim()).filter(b => b.length > 0);

    /*colocando os nomes dos animais em um vetor, removendo espaços caso haja e mantendo somente os que não forem vazios*/

    const animaisParaAdocao = ordemAnimais.split(",").map(animal => animal.trim()).filter(a => a.length > 0);

    // verificando se os parâmetros estão de acordo com a regra do problema, passando os brinquedos da pessoa 1 e pessoa 2 além dos nomes dos animais do abrigo a serem adotados como parâmetros para o método validarEntradas, o qual contém a lógica para verificar se esses valores são válidos

    const erro = this.validarEntradas(pessoa1, pessoa2, animaisParaAdocao);

    // se tiver algum erro, ou seja, se o método validarEntradas retornou alguma coisa diferente de null(nulo), retornamos esse erro e impedimos que o progresso do método

    if(erro) {
      return erro;
    }

    // Caso não tenha nenhum erro

    // adicionamos 2 variáveis: adocoesPessoa1 e adocoesPessoa2 que vão ser responsáveis por armazenar a quantidade de adoções das respectivas pessoas. Isso será usado posteriormente para verificar se a pessoa atingiu o limite de adoções

    let adocoesPessoa1 = 0;
    let adocoesPessoa2 = 0;

    // adicionamos a variável resultado que vai armazenar o resultado do processo de adoção

    const resultado = [];

    // adicionamos a variável booleana locoPendente que inicializa com false para verificarmos se o animal Loco está presente e posteriormente realizarmos a lógica para esse animal

    let locoPendente = false;

    // percorrendo os animais para verificarmos se as pesssoas passadas como parâmetro estão aptas a levarem cada animal

    for (const nomeAnimal of animaisParaAdocao) {

      // verificando se o animal se chama Loco

      if (nomeAnimal === "Loco") {
        // altera a variável locoPendente para true, afirmando que o animal está presente
        locoPendente = true;
        continue; // forçamos a próxima iteração do loop e deixamos para lidar com ele no final, pois de acordo com as regras, Loco não liga para a ordem dos brinquedos contando que ele tenha a companhia de outro animal, ou seja, a pessoa tem que ter adotado no mínimo um animal
      }

      // pegamos todos as propriedades do animal na lista das informações dos animais do abrigo(this.animaisInfo)

      const animal = this.animaisInfo[nomeAnimal];

      // verificando se a pessoa 1 e pessoa 2 estão aptos para a adotar os animais, ou seja, se os seus respectivos brinquedos estão de acordo com a regra e ordem de cada animal. A verificação é feita através do método pessoaEstaApta que pelo próprio nome já nos deduz que vai retorna true ou false

      const aptidao1 = this.pessoaEstaApta(pessoa1, animal);

      const aptidao2 = this.pessoaEstaApta(pessoa2, animal);

      // verificando se a pessoa 1 e pessoa 2 podem adotar de fato, verificando também se o limite de adoções por pessoa(3) não foi atingido

      const podeAdotar1 = aptidao1 && adocoesPessoa1 < 3;

      const podeAdotar2 = aptidao2 && adocoesPessoa2 < 3;

      // se a pesssoa 1 tem todos os requisitos para adotar o animal e a pessoa 2 não, adicionamos o resultado da adoção do animal à pessoa 1 na lista de resultado e somamos + 1 à variável que corresponde à adoções da pessoa 1

      if (podeAdotar1 && !podeAdotar2) {
        resultado.push(`${nomeAnimal} - pessoa 1`);
        adocoesPessoa1++;
      } else if (!podeAdotar1 && podeAdotar2) { // se a pesssoa 2 tem todos os requisitos para adotar o animal e a pessoa 1 não, adicionamos o resultado da adoção do animal à pessoa 2 na lista de resultado e somamos + 1 à variável que corresponde à adoções da pessoa 2
        resultado.push(`${nomeAnimal} - pessoa 2`);
        adocoesPessoa2++;
      } else { // se os dois tiverem condições e os requisitos para adotar o animal ou se os dois não tiverem condições para adotar o animal, o animal vai para o abrigo(adicionamos esse resultado)
        resultado.push(`${nomeAnimal} - abrigo`);
      }
    }

    // Por fim, se o animal Loco está presente na lista de animais passados como parâmetros da funçao, fazemos a lógica para a sua adoção

    if (locoPendente) {

      // verificamos se a pessoa 1 e pessoa 2 estão aptas a adotar Loco através do métodos pessoaAptaParaLoco o qual retorna true ou false
      const aptidaoBrinquedo1 = this.pessoaAptaParaLoco(pessoa1);
      const aptidaoBrinquedo2 = this.pessoaAptaParaLoco(pessoa2);

      // verificando se a pessoa 1 e pessoa 2 podem adotar Loco no quesito de brinquedos, verificando também se a pessoa já tem outro animal adotado para fazer companhia com Loco e se o limite de adoções por pessoa(3) não foi atingido

      const podeAdotarLocoPessoa1 = aptidaoBrinquedo1 && adocoesPessoa1 > 0 && adocoesPessoa1 < 3;
      const podeAdotarLocoPessoa2 = aptidaoBrinquedo2 && adocoesPessoa2 > 0 && adocoesPessoa2 < 3;

      // se a pesssoa 1 tem todos os requisitos para adotar Loco e a pessoa 2 não, adicionamos o resultado da adoção do animal à pessoa 1 na lista de resultado e somamos + 1 à variável que corresponde à adoções da pessoa 1

      if (podeAdotarLocoPessoa1 && !podeAdotarLocoPessoa2) {
        resultado.push("Loco - pessoa 1");
      } else if (!podeAdotarLocoPessoa1 && podeAdotarLocoPessoa2) { // se a pesssoa 2 tem todos os requisitos para adotar Loco e a pessoa 1 não, adicionamos o resultado da adoção do animal à pessoa 2 na lista de resultado e somamos + 1 à variável que corresponde à adoções da pessoa 2
        resultado.push("Loco - pessoa 2");
      } else { // se os dois tiverem condições e os requisitos para adotar Loco ou se os dois não tiverem condições para adotar ele, o animal vai para o abrigo(adicionamos esse resultado)
        resultado.push("Loco - abrigo");
      }
    }

    // no final, caso não tenha  dado nenhum erro com as verificações das entradas, retornamos a lista do resultado da adoção

    return {lista: resultado.sort()};

  }

  validarEntradas(brinquedosPessoa1, brinquedosPessoa2, animais) {
    // verificando se a pessoa 1 e pessoa 2 tem brinquedos repetidos. Caso tenha, um erro é retornado

    if (new Set(brinquedosPessoa1).size !== brinquedosPessoa1.length || new Set(brinquedosPessoa2).size !== brinquedosPessoa2.length) {
      return { erro: "Brinquedo inválido" };
    }

    // verificando se há animais repetidos

    if (new Set(animais).size !== animais.length) {
      return { erro: "Animal inválido" };
    }

    // verificando se os animais estão presentes na lista de animais cadastrados no abrigo(this.animaisInfo)

    for (const animal of animais) {
      if (!this.animaisInfo[animal]) {
        return { erro: "Animal inválido" };
      }
    }

    // juntando os brinquedos da pessoa 1 e pessoa 2 através do operador spread(...) para verificar se estão presentes na lista de brinquedos válidos

    const brinquedosTotais = [...brinquedosPessoa1, ...brinquedosPessoa2];

    for (const brinquedo of brinquedosTotais) {
      if (!this.brinquedosValidos.includes(brinquedo)) {
        return { erro: "Brinquedo inválido" };
      }
    }

    // se caso os parâmetros passarem na verificação, retornamos null(nulo)

    return null;
  }

  pessoaEstaApta(brinquedosPessoa, animal) {
    // pegamos os brinquedos requeridos do animal
    const brinquedosRequeridos = animal.brinquedos;

    // se o animal for do tipo gato
    if (animal.tipo === "gato") {
      // verificamos se a pessoa tem todos os brinquedos requeridos pelo gato. Ao final da verificação, retornamos true caso essa condição seja verdadeira e false caso não seja

      return brinquedosRequeridos.every(brinquedo => brinquedosPessoa.includes(brinquedo));
    } else { // se o animal não for do tipo gato

      // definimos uma variável indice que inicializa com 0 que vai servir para percorrer a lista de brinquedos requeridos pelo animal e possibilitar que a intercalação dos brinquedos por parte da pessoa não seja um problema
      let indice = 0;

      // percorremos a lista de brinquedos da pessoa
      for (const brinquedoAtualDaPessoa of brinquedosPessoa) {

        // se o brinquedo atual da pessoa for igual ao brinquedo requerido, aumentamos em 1 o indice e com isso possibilitamos que o próximo brinquedo do animal seja liberado para a próxima verificação
        if (brinquedoAtualDaPessoa === brinquedosRequeridos[indice]) {
          indice++;
        }

        // se o indice for igual à quantidade de brinquedos requeridos pelo animal, significa que a pessoa está apta, em questão de brinquedos, a adotar o animal(com isso retornamos true). Ou seja ao mesmo tempo que a variável indice serve como um índice para a lista de animais prosseguir, ela também serve como uma bandeira que nos revela se a pessoa está apta ou não
        if (indice === brinquedosRequeridos.length) {
          return true;
        }
      }

      // se após percorrer a lista de brinquedos da pessoa e não ter os brinquedos ou regra requerida pelo animal, retornamos false(pessoa não está apta)

      return false;
    }
  }

  pessoaAptaParaLoco(brinquedosPessoa) {
    // pegando os brinquedos requeridos por Loco

    const brinquedosLoco = this.animaisInfo.Loco.brinquedos;

    // verificamos se a pessoa tem todos os brinquedos requeridos por Loco

    return brinquedosLoco.every(brinquedo => brinquedosPessoa.includes(brinquedo));
  }
}

export { AbrigoAnimais as AbrigoAnimais };
