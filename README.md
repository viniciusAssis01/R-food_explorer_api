# Food Explorer

um cardápio digital para um restaurante, conhecido como foodExplorer.

## Instalação

Entre no diretório do projeto

```bash
  cd my-project
```

Clone o projeto em sua maquína

```bash
  git clone https://link-para-o-projeto
```

Instale as dependências

```bash
  npm install
```

Em seguida, crie um arquivo **.env**, copiando o formato do arquivo **.env.example**. Nele configure suas variáveis de ambiente

```
.env
```

Execute as migrations com o comando:

```
npm run migrate
```

Inicie o servidor

```bash
  npm run dev
```

**Requisitos:**

- Node.js (versão 18.15.0)
- Um JSON do espaço de trabalho Insomnia exportado (v4)

## Stack utilizada

**Back-end:**

- Node
- Express
- bcryptjs
- dotenv
- express-async-errors
- jsonwebtoken
- cookie-parser
- cors
- knex
- multer
- sqlite
- sqlite3
- nodemon

## Diagrama ER

Diagrama ER da API definindo bem as relações entre as tabelas do banco de dados.

![rocketseat_explorer-food_explorer](https://github.com/viniciusAssis01/motorStore_fullStackProject/assets/105648671/ab7a302b-79d6-4a57-be37-7d4207a969d3)

## Endpoints

# Endpoints:

| Método | Endpoint            | Responsabilidade                                    | Autenticação                                           |
| ------ | ------------------- | --------------------------------------------------- | ------------------------------------------------------ |
| POST   | /users              | Criação de usuário                                  | Qualquer usuário, não necessita token                  |
| POST   | /login              | Gera o token de autenticação                        | Qualquer usuário, não necessita token                  |
| POST   | /dishes             | Criação de um prato                                 | Apenas usuarios do tipo admin, necessita de token      |
| GET    | /dishes             | Lista todos pratos                                  | qualquer usuario, não necessita token                  |
| GET    | /dishes/:id         | Lista um prato especifico                           | qualquer usuario, não necessita token                  |
| PUT    | /dishes/:id         | Atualiza um prato                                   | Apenas usuarios do tipo admin, necessita de token      |
| PATCH  | /imageDish/:dish_id | Atualiza a imagem de um prato especifico comentario | Apenas usuarios do tipo admin, necessita de token      |
| DELETE | /dishes/:id         | Deleta um prato especifico                          | Apenas usuarios do tipo admin, necessita de tokentoken |

## Documentação da API

### 1. **Users**

#### `/users`

Deve ser possível criar um usuário com o perfil, por padrão, de cliente (customer);

### 1.1. Criação de Usuário

#### Exemplo de Request:

```
POST /users
Host: http://suaapi.com
Authorization: nenhum
Content-type: application/json
```

#### Corpo da Requisição:

```json
{
	"name": "fulano",
	"email": "fulano@email.com",
	"password": "123"
}
```

#### Exemplo de Response:

```
201 Created
```

```json
{
	"id": 1,
	"name": "fulano",
	"email": "fulano@email.com",
	"role": "customer",
	"created_at": "2024-02-15 21:52:17",
	"updated_at": "2024-02-15 21:52:17"
}
```

#### Possíveis Erros:

| Código do Erro | Descrição                 |
| -------------- | ------------------------- |
| 409 Conflict   | Email already registered. |

### 2. **Login**

#### `/login`

#### Exemplo de Request:

```
POST /login
Host: http://suaapi.com
Authorization: nenhum
Content-type: application/json
```

#### Corpo da Requisição:

```json
{
	"email": "fulano@kenzie.com",
	"password": "1234"
}
```

#### Exemplo de Response:

```
200 OK
```

```json
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpYfdXQiOjE3sMDgwMzQwMDIsImV4cCI6MTcwODI5MzIwMiwic3ViIjoiMSJ9.-tKUznBmFM1yFdarR1mPznkZcJOX9bd3Q_S8IwT2OKI",
	"user": {
		"id": 1,
		"name": "fulano",
		"email": "fulano@email.com",
		"role": "customer",
		"created_at": "2024-02-15 21:52:09",
		"updated_at": "2024-02-15 21:52:09"
	}
}
```

### 3. **dishes**

#### `/dishes`

Todas as rotas devem ser protegidas, com exceção dos endpoints de GET;

Apenas usuários com o perfil de admin podem criar,editar e deletar um prato;

### 3.1. Criação de prato

campo "image" é opcional, ja que foi definido como "nullable"

#### Exemplo de Request:

```
POST /dishes
Host: http://suaapi.com
Authorization: precisa estar autenticado; precisa ser usuario do tipo "admin"
Content-type: application/json
```

#### Corpo da Requisição:

```json
{
	"name": "Salada Ravanello",
	"category": "refeição",
	"description": "rabanetes, folhas verdes e molho agridoce salpicados com gergelim. O pão naan da um toque especial.",
	"ingredients": [
		"alfaçe",
		"cebola",
		"pao naan",
		"pepino",
		"rabanete",
		"tomate"
	],
	"price": 49.97
}
```

#### Exemplo de Response:

```
201 OK
```

```json
{
	"id": 1,
	"name": "Salada Ravanello",
	"image": null,
	"category": "refeição",
	"price": 49.97,
	"description": "rabanetes, folhas verdes e molho agridoce salpicados com gergelim. O pão naan da um toque especial.",
	"created_at": "2024-02-15 23:50:23",
	"updated_at": "2024-02-15 23:50:23",
	"ingredientsDish": [
		{
			"id": 1,
			"dish_id": 5,
			"name": "alfaçe"
		},
		{
			"id": 2,
			"dish_id": 5,
			"name": "cebola"
		},
		{
			"id": 3,
			"dish_id": 5,
			"name": "pao naan"
		},
		{
			"id": 4,
			"dish_id": 5,
			"name": "pepino"
		},
		{
			"id": 5,
			"dish_id": 5,
			"name": "rabanete"
		},
		{
			"id": 6,
			"dish_id": 5,
			"name": "tomate"
		}
	]
}
```

### 3.2. Listando pratos

Opcional passar "request query" name (para filtrar o prato pelo seu nome) ou ingredients(para filtrar o prato pelos ingredientes)

#### Exemplo de Request:

```
GET /dishes
Host: http://suaapi.com
Authorization: nenhum
Content-type: application/json
```

#### Query request:

```json
?name=salada
ou
?ingredients=rabanete,tomate
```

#### Corpo da Requisição:

```json
vazio
```

#### Exemplo de Response:

```
200 OK
```

```json
[
	{
		"id": 2,
		"name": "Salada Ravanello",
		"image": null,
		"category": "refeição",
		"price": 49.97,
		"description": "rabanetes, folhas verdes e molho agridoce salpicados com gergelim. O pão naan da um toque especial.",
		"created_at": "2024-02-15 21:55:56",
		"updated_at": "2024-02-15 21:55:56"
	}
]
```

### 3.2.1. Listando um prato

#### Exemplo de Request:

```
GET /dishes/:id
Host: http://suaapi.com
Authorization: nenhum
Content-type: application/json
```

#### Corpo da Requisição:

```json
Vazio
```

#### Exemplo de Response:

```
200 OK
```

```json

	"id": 1,
	"name": "Salada Ravanello",
	"image": null,
	"category": "refeição",
	"price": 49.97,
	"description": "Rabanetes, folhas verdes e mlho agridoce salpicados com gergelim",
	"created_at": "2024-02-14 18:03:41",
	"updated_at": "2024-02-14 18:03:41",
	"ingredients": [
		{
			"id": 1,
			"dish_id": 1,
			"name": "alface"
		},
		{
			"id": 2,
			"dish_id": 1,
			"name": "cebola"
		},
		{
			"id": 4,
			"dish_id": 1,
			"name": "pepino"
		},
		{
			"id": 3,
			"dish_id": 1,
			"name": "pão naan"
		},
		{
			"id": 5,
			"dish_id": 1,
			"name": "rabanete"
		},
		{
			"id": 6,
			"dish_id": 1,
			"name": "tomate"
		}
	]
}
```

### 3.3. Atualização do prato

#### Exemplo de Request:

```
PUT /dishes/:id
Host: http://suaapi.com
Authorization: precisa estar autenticado; precisa ser admin.
Content-type: application/json
```

#### Corpo da Requisição:

```json
{
	"name": "Salada Ravanello",
	"category": "refeição",
	"description": "Rabanetes, folhas verdes e molho agridoce salpicados com gergelim",
	"ingredients": [
		"alface",
		"cebola",
		"pão naan",
		"pepino",
		"rabanete",
		"tomate"
	],
	"price": 49.97
}
```

#### Exemplo de Response:

```
200 OK
```

```json
{
	"message": "Prato atualizado com sucesso"
}
```

### 3.3.1. Atualização da imagem do prato

necessário enviar um arquivo de imagem

#### Exemplo de Request:

```
PATCH /imageDish/:dish_id
Host: http://suaapi.com
Authorization: precisa estar autenticado; precisa ser admin.
Content-type: application/json
```

#### Query request:

```json
arquivo da imagem
```

#### Exemplo de Response:

```
200 OK
```

```json
{
	"id": 1,
	"name": "Salada Ravanello",
	"image": "3cd782222deda05f4389 --piraiLogo.jpg",
	"category": "refeição",
	"price": 49.97,
	"description": "rabanetes, folhas verdes e molho agridoce salpicados com gergelim. O pão naan da um toque especial.",
	"created_at": "2024-02-16 21:32:58",
	"updated_at": "2024-02-16 21:32:58"
}
```

### 3.4. Deletar Prato

ao deletar o prato, os ingredientes relacionados a esse prato tambem sao deletados. o arquivo da imagem do prato tambem é deletada.

#### Exemplo de Request:

```
PATCH /dishes/:id
Host: http://suaapi.com
Authorization: precisa estar autenticado; precisa ser admin.
Content-type: application/json
```

#### Query request:

```json
vazio
```

#### Exemplo de Response:

```
200 OK
```

```json
{
	"message": "Prato excluído com sucesso"
}
```

## Licença

[MIT](https://choosealicense.com/licenses/mit/)
