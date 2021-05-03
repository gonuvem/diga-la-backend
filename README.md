<h1 align="center">
    <img src="https://res.cloudinary.com/gonuvem/image/upload/v1620033207/digala_staging/logo/Diga_L%C3%A1.png">
</h1>

<h1>
    <img src="https://res.cloudinary.com/gonuvem/image/upload/v1620049725/digala_staging/voyager/diga-la-voyager.png">
</h1>

<h3 align="center">
    <a href="https://dig-api-staging.herokuapp.com/voyager">Visualize a API em GraphQL com o Voyager</a>
    <br/>
    <br/>
    <a href="https://dig-api-staging.herokuapp.com/graphql">Teste a API em GraphQL com o Playground</a>
<h3 >

---

## 🔖&nbsp; Sobre

O projeto **Diga Lá** é uma plataforma para construção de formulários. Esse repositório contém a API que serve o [front end](https://github.com/gonuvem/digala-front). Existe um usuário de teste para a nossa demonstração online: email `teste@gonuvem.com` e senha `digala`.

---

## 🚀 Tecnologias utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias

- [Node.js](https://nodejs.org)
- [MongoDB](https://mongodb.com)
- [Express](https://expressjs.com)
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/)

---

## 🗂 Como executar o projeto

```bash

    # Clonar o repositório
    $ git clone https://github.com/gonuvem/diga-la-backend

    # Entrar no diretório
    $ cd diga-la-backend

    # Crie uma cópia do arquivo de configuração do docker
    $ cp docker-compose.yml.example docker-compose.yml

    # Crie uma cópia do arquivo com as configurações de ambiente e modifique-o
    $ cp .env.example .env

    # Instalar as dependências
    $ yarn install

    # Inicie e execute o aplicativo
    $ docker-compose up
```