# compensar-gui

Frontend do ComPensar: Next.js 14, Material UI, React Query, react-hook-form e yup.
O backend fica em outro repositório, o [compensar-core](https://github.com/ufcg-lsd/compensar-core).

As rotas de `src/pages/api` repassam as chamadas do navegador ao backend, do lado do servidor,
usando a variável `BASE_API_URL`.

## Requisitos

- [Git](https://git-scm.com/).
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (no Windows, com WSL 2), para subir tudo com Docker.
- Para rodar sem Docker: [Node.js 24 (LTS)](https://nodejs.org/) com npm e o backend rodando.

## Subir o sistema completo com Docker

O `docker-compose.yml` fica no repositório do backend e sobe MongoDB, carga inicial, backend e
este frontend. Clone os dois repositórios lado a lado:

```text
qualquer-pasta/
├── compensar-core/   (backend, com o docker-compose.yml)
└── compensar-gui/    (este repositório)
```

```bash
cd compensar-core
cp .env.example .env   # preencha PRIVATE_KEY (veja o README do backend)
docker compose up
```

Acesse <http://localhost:3000>. O passo a passo completo, o primeiro acesso e os problemas comuns
no Windows estão no [README do compensar-core](https://github.com/ufcg-lsd/compensar-core#readme).

No compose, este repositório é montado no container: as mudanças em `src/` aparecem sem reiniciar.

Por causa dessa montagem, o `.env` e o `.env.local` desta pasta, se existirem, também aparecem
dentro do container (o `.dockerignore` só os tira da imagem). Isso não muda o endereço do backend:
o compose define `BASE_API_URL=http://backend:8080` no ambiente do container, e o Next não
substitui uma variável que já está no ambiente pelo valor dos arquivos `.env`.

## Rodar sem Docker

Com o backend rodando (com ou sem Docker) em <http://localhost:8080>:

```bash
npm ci
cp .env.example .env.local   # ajuste BASE_API_URL se o backend estiver em outro endereço
npm run dev                  # http://localhost:3000
```

Para criar o primeiro usuário, use a tela **Criar conta** (<http://localhost:3000/create-account>).

## Variáveis de ambiente

Estão no [.env.example](.env.example). Nenhum endereço fica fixo no código.

| Variável       | Obrigatória | Descrição |
|----------------|-------------|-----------|
| `BASE_API_URL` | sim         | Endereço do backend, sem barra no final. Sem Docker: `http://localhost:8080`. No compose: `http://backend:8080` (definido no próprio `docker-compose.yml`). |
