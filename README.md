# Getting Started with Create React App

## Instruções de Configuração

É extremamente seguir os passos à seguir antes de executar qualquer comando do projeto. Se você fez `git pull` desse projeto, é necessário instalar os pacotes necessários listados pelo `package.json`. Para isso, digite `npm install` ou `yarn` (qualquer um desses dois gerenciadores de pacotes funcionam bem para o download das dependências), e assim, o gerenciador de pacotes escolhido irá preparar o ambiente para execução do projeto.

### `yarn start`

O comando `yarn start` inicia o projeto para executar no localhost, na porta 3000, executando pelo endereço: `http://localhost:3000`. Caso já exista algum serviço executando nessa porta, o React irá perguntar se quer executar o projeto em uma porta diferente (geralmente na 3001, e assim sucessivamente caso ele não encontre uma porta disponível).

### `yarn build`

O comando `yarn build` constrói a forma estática do projeto estático, podendo ser enviado para hospedagem de sites. Esse irá ser colocado na pasta "build", que é criada pelo comando.

## Instruções de Uso

No backend, através da inserção de dados padrão (feita pela inserção de seeds do Knex), é possível já ter noção do funcionamento da aplicação com os dados e o banco de dados funcionando. No repositório do backend há instruções de configuração para isso.

A aplicação frontend atende a seguinte lista de histórias de usuário:

<ol>
  <li>O usuário pode criar uma conta;</li>
  <li>O usuário pode realizar login com sua conta;</li>
  <li>O doutor pode criar uma conta;</li>
  <li>O doutor pode realizar login com sua conta;</li>
  <li>O administrador pode realizar login com sua conta;</li>
  <li>O administrador pode adicionar novos tipos de atendimento e seus serviços;</li>
  <li>O administrador pode deletar qualquer tipo de atendimento;</li>
  <li>O usuário pode agendar atendimentos com data, tipo de atendimento e seus serviços;</li>
  <li>O usuário pode excluir seus atendimentos agendados;</li>
  <li>O doutor pode visualizar suas comissões;</li>
  <li>O doutor pode visualizar os atendimentos disponíveis não realizados ou que não estão em progresso por nenhum outro doutor;</li>
  <li>O doutor pode realizar um atendimento de um usuário (o que lhe gera uma comissão);</li>
  <li>O doutor dispõe de um cronometro para saber quanto tempo se passou desde o início do atendimento.</li>
</ol>

A partir dessas histórias de usuário, as funcionalidades foram abrangidas no projeto (tanto backend quanto frontend).

## Teste em Execução

Para teste em execução foram disponibilizados dados padrão para acessar o site, como logins prontos e outros dados como atendimentos, serviços, atendimentos dos usuários e comissões.

Essas informações também estão disponíveis no repositório do backend, mas à seguir estão:

Para acessar uma conta administradora, utilize as informações à seguir:

```text
Email: admin@admin.com
Senha: 123456
```

Para acessar uma conta de usuário normal, utilize as informações à seguir:

```text
Email: user@user.com
Senha: 123456
```

Para acessar uma conta de doutor, utilize as informações à seguir:

```text
Email: doc@doc.com
Senha: 123456
```

A partir dessas informações, você terá acesso às funcionalidades descritas nas histórias de usuário.
