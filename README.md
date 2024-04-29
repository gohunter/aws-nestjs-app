# Reto Técnico - Backend NodeJS AWS

Serverless para un despliegue en AWS

## Tecnologías aplicadas

* Serverless (Framework)
* NodeJs
* TypeScript
* MySQL
* NestJs (Framework https://nestjs.com/)
* Open API/Swagger

## Principales dependencias

* swagger
* class-transformer
* class-validator
* aws-lambda
* joi
* mysql2
* typeorm

## Pre-requisitos

Crear una base de datos MySQL e importar el archivo *aws_nestjs_app.sql* a la base de datos creada

Debe crear un archivo **.env** en el directorio principal apartir del archivo **.env.sample**

Usar el comando NPM para instalar dependencias del proyecto:
```
npm i
```

## Configuraciones necesarias del archivo .env

```
# App
PORT=3030

# Base de datos
DATABASE_HOST="127.0.0.1" # IP o URL de conexión de base de datos
DATABASE_PORT=3306 # Puerto de base de datos
DATABASE_USERNAME="root" # Nombre de usuario de base de datos
DATABASE_PASSWORD= # Contraseña de base de datos
DATABASE_NAME="aws_nestjs_app" # Nombre de base de datos

# SWAGGER
SWAGGER_URL="/api" # Dejarlo tal como está
SWAGGER_PATH="/docs" # Path en la que se visualiza SWAGGER

# SWAPI
SWAPI_API="https://swapi.py4e.com/api/" # URL de API SWAPI
```

## Preparar build de nestjs

Ejecutar el comando NPM

```
npm run build
```

## Ejecutar en local

```
serverless offline
```

## Desplegar en AWS

```
serverless deploy
```

## En caso de probar el proyecto usando NestJs en modo desarrollo en local

Ejecutar el siguiente comando en consola
```
npm run start:dev
```

## Visualizar endpoints en SWAGGER

```
{url_del_proyecto}/docs
```

## Endpoints del proyecto

```
# User
GET {url_del_proyecto}/user
GET {url_del_proyecto}/user/{id}
POST {url_del_proyecto}/user/add
PATH {url_del_proyecto}/user/edit/{id}
DELETE {url_del_proyecto}/user/remove/{id}

# Swapi
GET {url_del_proyecto}/swapi/films
GET {url_del_proyecto}/swapi/films/{id}

# Más información revisar
{url_del_proyecto}/docs
```
