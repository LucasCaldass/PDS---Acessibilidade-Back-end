# Usar a imagem oficial do Node.js como base
FROM node:18 AS builder

RUN mkdir -p /usr/app

WORKDIR /usr/app

ARG ENVIRONMENT 

# Copiar os arquivos package.json e package-lock.json
COPY ./src ./src
COPY package*.json ./
COPY ./tsconfig.build.json ./tsconfig.build.json
COPY ./tsconfig.json ./tsconfig.json
COPY ./docker ./docker

# Instalar as dependências do projeto
RUN npm install
RUN npm run build

FROM node:18 AS prod

WORKDIR /usr/app

COPY --from=builder /usr/app/dist ./dist

COPY --from=builder /usr/app/package.json ./package.json
COPY --from=builder /usr/app/package-lock.json ./package-lock.json
COPY --from=builder /usr/app/tsconfig.build.json ./tsconfig.build.json
COPY --from=builder /usr/app/tsconfig.json ./tsconfig.json
COPY --from=builder /usr/app/docker docker
COPY --from=builder /usr/app/node_modules node_modules

# Expor a porta 3000
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "run", "dev"]
