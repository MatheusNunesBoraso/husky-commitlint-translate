![](https://i.ibb.co/hDmkdVM/wallpaper-new.jpg#vitrinedev)

## Detalhes do projeto

O projeto husky-commitlint-translate visa facilitar e padronizar o processo de commits em projetos de desenvolvimento por meio do uso do Commitlint, Husky e um tradutor automático. O objetivo é fornecer uma ferramenta que garanta a consistência nas mensagens de commit e facilite a colaboração entre desenvolvedores de diferentes idiomas.

## Instalação

Para configurar o projeto pessoal, siga os passos abaixo:

### Passo 1: Instale a dependência do commitlint

Abra o terminal e execute o seguinte comando:

```bash
npm install --save-dev @commitlint/cli
```

### Passo 2: Instale a configuração de commit convencional

Execute o seguinte comando no terminal:

```bash
npm install --save-dev @commitlint/config-conventional
```

### Passo 3: Instale o husky

No terminal, digite o seguinte comando:

```bash
npm install husky -D
```

### Passo 4: Instale o tradutor

Digite o seguinte comando no terminal:

```bash
npm install bing-translate-api
```

### Passo 5: Configure o caminho dos hooks do Git

Execute o seguinte comando no terminal:

```bash
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
```

### Passo 6: _translate-commit.js_

Crie uma pasta chamada _scripts_ na raiz do seu projeto pessoal, caso ainda não exista.

Agora, copie o arquivo _scripts/translate-commit.js_ do meu projeto já configurado para dentro da pasta _scripts_ do seu projeto.

### Passo 7: _commitlint.config.js_

Copie o arquivo _commitlint.config.js_ já configurado do meu projeto para a raiz do seu projeto pessoal.

**Caso haja problemas no editor ou no arquivo, certifique-se de que a codificação esteja definida como UTF-8**

### Passo 8: _husky_

Dentro da pasta .husky do seu projeto, crie um arquivo chamado commit-msg ou edite o arquivo existente com as seguintes linhas:

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

node scripts/translate-commit.js && npx commitlint --edit $1
```

As instruções acima irão configurar o ambiente para uso do commitlint com o husky e o tradutor de commits em seu projeto pessoal.

## Demonstração

#### Execute no terminal:

```bash
git add .
```

```bash
git commit -m "foo: isso aqui vai falhar"
```

#### Saída:

```bash
ⓘ   original:  foo: isso aqui vai falhar

✔   translation:  foo: this here is going to fail

⧗   input: foo: this here is going to fail
✖   type must be one of [build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test] [type-enum]

✖   found 1 problems, 0 warnings
ⓘ   Get help: https://github.com/conventional-changelog/commitlint/#what-is-commitlint

husky - commit-msg hook exited with code 1 (error)
```

### Mas por que falhou?

_foo_: isso aqui vai falhar

A mensagem do commit precisa começar com um dos seguintes prefixos:

**feat** - Para novas funcionalidades

**fix** - Para correção de bugs

**docs** - Apenas para alterações na documentação

**style** - Para alterações que não afetam o significado do código

**refactor** - Para alterações de código que não corrigem bugs nem adicionam funcionalidades

**perf** - Para alterações de código que melhoram o desempenho

**test** - Para adicionar testes ausentes ou corrigir testes existentes

**build** - Para alterações que afetam o sistema de construção ou dependências externas

**ci** - Para alterações em arquivos e scripts de configuração de integração contínua

**chore** - Para outras alterações que não modificam arquivos de código-fonte ou de teste

**revert** - Para reverter um commit anterior
