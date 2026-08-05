FROM mcr.microsoft.com/devcontainers/python:3.12

RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get update \
    && apt-get install -y nodejs

RUN npm install -g npm@latest

WORKDIR /workspace