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

3. Ou inicie o servidor em modo de desenvolvimento:

```bash
npm run dev
```

1. Ou inicie o servidor em build:

```bash
npm run build
npm run start
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

Abaixo estão os comandos para testar os endpoints da API via terminal.

### 1. Criar uma nova entrega

```bash
curl -X POST http://localhost:3000/api/entregas \
  -H "Content-Type: application/json" \
  -d '{
        "descricao": "Caixa de eletrônicos",
        "origem": "Maceió",
        "destino": "Arapiraca"
      }'
```

### 2. Listar todas as entregas

```bash
curl -X GET http://localhost:3000/api/entregas
```

### 3. Buscar entrega por ID

```bash
curl -X GET http://localhost:3000/api/entregas/1
```

### 4. Avançar status da entrega

```bash
curl -X PATCH http://localhost:3000/api/entregas/1/avancar
```

### 5. Cancelar entrega

```bash
curl -X PATCH http://localhost:3000/api/entregas/1/cancelar
```

### 6. Consultar histórico de uma entrega

```bash
curl -X GET http://localhost:3000/api/entregas/1/historico
```
