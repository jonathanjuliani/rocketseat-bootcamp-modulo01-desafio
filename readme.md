# Bootcamp Rocketseat - Modulo01 - Desafio

Código do projeto para o desafio do modulo01 do bootcamp rocketseat.

### Criando Projeto

- Method: `POST`
- URL: http://localhost:3000/projects
- Body:

```
{
	"id": 1,
	"title": "Novo Projeto"
}
```

### Editando Projeto

- Method: `PUT`
- URL: http://localhost:3000/projects/:id
- Body:

```
{
	"title": "Alterando Titulo do Projeto"
}
```

### Deletando Projeto

- Method: `DELETE`
- URL: http://localhost:3000/projects/:id
- Body:

```
no body
```

### Criando Tasks

- Method: `POST`
- URL: http://localhost:3000/projects/:id/tasks
- Body:

```
{
	"title": "Nova Tarefa 2"
}
```

### Buscando um Projeto

- Method: `GET`
- URL: http://localhost:3000/projects/:id
- Body:

```
no body
```

### Buscando todos os Projetos

- Method: `GET`
- URL: http://localhost:3000/projects
- Body:

```
no body
```
