# pipeline-test-repo
Repo de teste para pipeline Linear-to-Code

## Instalação

```bash
npm install
```

## Como executar

```bash
npm start
```

O servidor será iniciado na porta 3000 (ou na porta definida pela variável de ambiente PORT).

## Rotas disponíveis

### 1. Hello World
Retorna uma mensagem de boas-vindas.

**Endpoint:** `GET /hello`

**Resposta de sucesso:**
```json
{
  "message": "hello world"
}
```

**Exemplo com curl:**
```bash
curl http://localhost:3000/hello
```

**Exemplo com Postman:**
- Método: GET
- URL: `http://localhost:3000/hello`
- Headers: Nenhum header necessário

---

### 2. Health Check
Verifica o status de saúde da aplicação.

**Endpoint:** `GET /health`

**Resposta de sucesso:**
- Status Code: 200
```json
{
  "status": "ok"
}
```

**Exemplo com curl:**
```bash
curl http://localhost:3000/health
```

**Exemplo com Postman:**
- Método: GET
- URL: `http://localhost:3000/health`
- Headers: Nenhum header necessário

## Testes

Para executar os testes:

```bash
npm test
```
