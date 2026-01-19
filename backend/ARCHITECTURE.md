# Architecture Overview

Este projeto segue uma arquitetura simples e explícita,
focada em clareza, previsibilidade e fácil manutenção.

---

## Camadas

### Controllers
- Responsáveis apenas por HTTP
- Não contêm regra de negócio
- Apenas repassam status e body retornados pelos services

---

### Services
- Contêm todas as regras de negócio
- NÃO lançam exceções
- Sempre retornam:
  { status, message?, data? }

---

### Models
- Responsáveis por acesso ao banco de dados
- Executam queries SQL puras
- Não conhecem regras de negócio

---

### Database
- connection: pool de conexão com MySQL
- migrations: versionamento do schema do banco

---

## Regras importantes

- Services nunca devem importar Express
- Controllers nunca devem acessar o banco diretamente
- Models nunca retornam response HTTP
- Validações de negócio ficam no service

---

## Fluxo de dados

Request → Controller → Service → Model → Service → Controller → Response

---

## Decisões de arquitetura

- Erros são tratados como retorno de status, não exceções
- Amizades são armazenadas em dupla (A→B e B→A)

---
