# Imagem de desenvolvimento do frontend (next dev). Usada pelo docker-compose.yml do
# repositório do backend (compensar-core), que sobe o sistema completo.
FROM node:24-bookworm-slim

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
