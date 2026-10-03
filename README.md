# Delivery Tracker API

Projeto desenvolvido para a disciplina de Programação Web II. Trata-se de uma API REST robusta para gestão e rastreamento de entregas.

O sistema aplica rigorosamente conceitos de **Arquitetura em Camadas** (Repository, Service, Controller), **DTOs** (Data Transfer Objects), **Enums**, **Middlewares globais de erro** e **Injeção de Dependência**.

## Estrutura de Pastas e Arquitetura

```text
src/
├── controllers/          # Tradução de requisições e respostas HTTP
├── database/             # Persistência SIMULADA em memória
├── dtos/                 # Objetos de Transferência de Dados
├── enums/                # Definição de constantes tipadas
├── errors/               # Tratamento de erros da aplicação
├── factories/            # Composition Root para instanciação e injeção de dependências
├── interfaces/           # Contratos/Tipagens TypeScript
├── middleware/           # Interceptadores de requisições (ex: tratamento global de erros)
├── repositories/         # Acesso e manipulação direta dos dados no banco em memória
├── routes/               # Definição dos endpoints da API e agrupamento de rotas
├── services/             # Concentra as regras de negócios
└── utils/                # Funções utilitárias reutilizáveis
```

## Como Executar o Projeto

### Pré-requisitos

Certifique-se de ter o **Node.js** (versão 18 ou superior) instalado em sua máquina.

### Passos para execução

1. Clone este repositório para a sua máquina local.
2. Acesse a pasta do projeto e instale as dependências:

```bash
npm install
```

3. inicie o servidor:

```bash
npm start
```

O servidor estará rodando no endereço `http://localhost:3000`.

### Rodando os testes (Autograder)

O projeto conta com um script de avaliação automática. Para rodá-lo:

1. Mantenha o servidor rodando em um terminal.
2. Abra um **novo terminal** e execute o comando:

```bash
npm run check
```

## Exemplos de Requisição (cURL)

Os exemplos abaixo utilizam `curl` e consideram a API disponível em `http://localhost:3000`.

### Entregas

<details>
<summary><strong>1. Criar uma entrega</strong></summary>

```bash
curl -X POST http://localhost:3000/api/entregas \
  -H "Content-Type: application/json" \
  -d '{
    "descricao": "Caixa de eletrônicos",
    "origem": "Maceió",
    "destino": "Arapiraca"
  }'
```

</details>

<details>
<summary><strong>2. Listar todas as entregas</strong></summary>

```bash
curl http://localhost:3000/api/entregas
```

</details>

<details>
<summary><strong>3. Listar entregas por status</strong></summary>

```bash
curl "http://localhost:3000/api/entregas?status=CRIADA"
```

Os status disponíveis são:

- `CRIADA`
- `EM_TRANSITO`
- `ENTREGUE`
- `CANCELADA`

</details>

<details>
<summary><strong>4. Buscar uma entrega por ID</strong></summary>

```bash
curl http://localhost:3000/api/entregas/1
```

</details>

<details>
<summary><strong>5. Avançar o status da entrega</strong></summary>

```bash
curl -X PATCH http://localhost:3000/api/entregas/1/avancar
```

</details>

<details>
<summary><strong>6. Cancelar uma entrega</strong></summary>

```bash
curl -X PATCH http://localhost:3000/api/entregas/1/cancelar
```

</details>

<details>
<summary><strong>7. Atribuir um motorista à entrega</strong></summary>

```bash
curl -X PATCH http://localhost:3000/api/entregas/1/atribuir \
  -H "Content-Type: application/json" \
  -d '{
    "motoristaId": 1
  }'
```

O `motoristaId` é enviado no corpo da requisição e o ID da entrega é informado na URL.

</details>

<details>
<summary><strong>8. Consultar o histórico da entrega</strong></summary>

```bash
curl http://localhost:3000/api/entregas/1/historico
```

</details>

---

### Motoristas

<details>
<summary><strong>1. Criar um motorista</strong></summary>

```bash
curl -X POST http://localhost:3000/api/motoristas \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Timothée Chalamet",
    "cpf": "012.345.678.90",
    "placaVeiculo": "ABC1D23"
  }'
```

O campo `placaVeiculo` é opcional.

</details>

<details>
<summary><strong>2. Listar todos os motoristas</strong></summary>

```bash
curl http://localhost:3000/api/motoristas
```

</details>

<details>
<summary><strong>3. Buscar um motorista por ID</strong></summary>

```bash
curl http://localhost:3000/api/motoristas/1
```

</details>

<details>
<summary><strong>4. Listar entregas de um motorista</strong></summary>

```bash
curl http://localhost:3000/api/motoristas/1/entregas
```

</details>

<details>
<summary><strong>5. Listar entregas de um motorista por status</strong></summary>

```bash
curl "http://localhost:3000/api/motoristas/1/entregas?status=CRIADA"
```

Exemplos com outros status:

```bash
curl "http://localhost:3000/api/motoristas/1/entregas?status=EM_TRANSITO"
```

```bash
curl "http://localhost:3000/api/motoristas/1/entregas?status=ENTREGUE"
```

```bash
curl "http://localhost:3000/api/motoristas/1/entregas?status=CANCELADA"
```

O endpoint recebe o ID do motorista pela URL e o filtro de status pela query string.

</details>
