# Getting Started with Create React App

## Tarefas Pendentes

<ol>
  <li>Adicionar lista de atendimentos dos usuários para o doutor;</li>
  <li>Adicionar funcionalidade para iniciar atendimento;</li>
  <li>Adicionar funcionalidade de contador para contar o tempo do atendimento;</li>
  <li>Adicionar funcionalidade para finalizar o atendimento.</li>
</ol>

## Instruções Iniciais

É extremamente seguir os passos à seguir antes de executar qualquer comando do projeto. Se você fez `git pull` desse projeto, é necessário instalar os pacotes necessários listados pelo `package.json`. Para isso, digite `npm install` ou `yarn` (qualquer um desses dois gerenciadores de pacotes funcionam bem para o download das dependências), e assim, o gerenciador de pacotes escolhido irá preparar o ambiente para execução do projeto.

### `yarn start`

O comando `yarn start` inicia o projeto para executar no localhost, na porta 3000, executando pelo endereço: `http://localhost:3000`. Caso já exista algum serviço executando nessa porta, o React irá perguntar se quer executar o projeto em uma porta diferente (geralmente na 3001, e assim sucessivamente caso ele não encontre uma porta disponível).

### `yarn build`

O comando `yarn build` constrói a forma estática do projeto estático, podendo ser enviado para hospedagem de sites. Esse irá ser colocado na pasta "build", que é criada pelo comando.
