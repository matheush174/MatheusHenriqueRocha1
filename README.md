Projeto de Gerenciamento de Livros
Este projeto é uma aplicação de gerenciamento de livros que permite adicionar, listar e excluir livros. A aplicação é dividida em frontend e backend, utilizando Docker para containerização e um fluxo de CI (Integração Contínua) com GitHub Actions.

Estrutura do Projeto
Frontend (React)

Interface de usuário criada com React.
Permite que o usuário adicione e visualize livros em uma lista.
Se conecta ao backend para realizar operações CRUD (Create, Read, Update, Delete) sobre os livros.
Contém um Dockerfile para criar uma imagem Docker do frontend, configurando o ambiente para execução no servidor.
Backend (Node.js e Express)

API RESTful construída com Node.js e Express.
Conecta-se a um banco de dados MySQL para armazenar informações dos livros.
Disponibiliza endpoints para criação, leitura, atualização e exclusão de registros de livros.
Contém um Dockerfile que define o ambiente do backend, incluindo instalação de dependências e configuração do servidor.
Banco de Dados (MySQL)

Banco de dados MySQL contendo uma tabela livros com campos para id, titulo, autor, e ano.
É possível inicializar o banco e realizar inserções de dados via SQL.
Contém um Dockerfile configurado para rodar um container MySQL com persistência de dados, preparado para integração com o backend.
Dockerfiles
Dockerfile do Frontend: Define o ambiente para o React, copiando o código do frontend e configurando para que o app seja servido com um servidor web (por exemplo, nginx).
Dockerfile do Backend: Configura o ambiente Node.js, instala dependências do backend e expõe a porta do servidor Express.
Dockerfile do MySQL: Configura o container do MySQL, definindo variáveis de ambiente para usuário, senha e nome do banco de dados.
GitHub Actions - Workflow de CI
O workflow de CI é definido em .github/workflows/ci.yml e realiza as seguintes etapas:

Instalação de Dependências: Utiliza npm ci para instalar as dependências do projeto.
Testes: Executa os testes configurados no backend usando Jest. Caso não haja testes, o Jest é configurado para passar sem encontrar testes (--passWithNoTests).
Build: Esta etapa compila o código e verifica se todos os arquivos e dependências estão corretos.
Como Executar o Projeto
1. Requisitos
Docker e Docker Compose instalados.
Node.js e npm, se desejar executar o frontend ou backend localmente sem Docker.
2. Iniciar com Docker Compose
No diretório do projeto, execute:

bash
Copy code
docker-compose up --build
Isso inicializa os containers do frontend, backend e banco de dados MySQL.

3. Testar Localmente
Acesse o frontend em http://localhost:3000.
O backend estará disponível em http://localhost:3001.
Estrutura de Arquivos
frontend/: Código fonte do frontend em React.
backend/: Código fonte do backend em Node.js.
docker-compose.yml: Arquivo de configuração para o Docker Compose.
.github/workflows/ci.yml: Workflow de CI para o GitHub Actions.
