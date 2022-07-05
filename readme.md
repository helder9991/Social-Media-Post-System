# Versões dos softwares utilizados:  
  - node v16.14.2  
  - yarn 1.22.18  
  - npm v8.5.0  
  - docker 20.10.14  
  - docker-compose 1.29.2  
  
# Como utilizar
1 -  Crie o banco de dados com o nome ``social`` ou execute o comando ``docker-compose up -d`` na pasta raiz do projeto  
  Obs: No desenvolvimento foi utilizado o PosgreSQL
  
2 - Altere o nome do arquivo .env.example para .env e coloque os seguintes dados:
  - API_PORT: Porta no qual a API rodará  
  - TOKEN_SECRET: Segredo utilizado para gerar o token JWT  
  - DB_HOST: Host utilizado para acessar o banco de dados (caso utilize o docker-compose será localhost)  
  - DB_DATABASE: Nome do banco de dados (caso utilize o docker-compose será social)  
  - DB_USER: Usuário ADM que terá acesso ao banco (caso utilize o docker-compose será root)  
  - DB_PASSWORD: Senha do usuario (caso utilize o docker-compose será docker)  

  ``Para salvar as imagens foi utilizado um bucket no AWS S3``  
  - BUCKET_NAME: Nome do bucket da AWS S3  
  - AWS_ACCESS_KEY_ID: Access Key da AWS S3  
  - AWS_SECRET_ACCESS_KEY: Secret Access Key da AWS S3  
  - AWS_DEFAULT_REGION: Região na qual o bucket se encontra (Exemplo: sa-east-1)  
  
  
3 - Rode o comando na pasta raiz do projeto:  
  - ```yarn```  
  
  Nota: Este comando irá baixar as dependencias das bibliotecas (node_modules)  
  
  
4 - Rode o commando na pasta raiz do projeto:  
  - ```yarn typeorm migration:run -d src/database/typeorm/index.ts```  
  
  Nota: Este comando irá criar a tabela no banco de dados
  
  
5 - Rode o commando na pasta raiz do projeto:  
  - ```yarn dev:server```  
  
  Nota: Este comando irá iniciar o backend  
  
  # Sobre o Projeto
  
  - O Projeto foi desenvolvido utilizando o TypeScript que busca melhorar a busca de erros e bugs dentro do código, além de melhorar a consistência e escabilidade do mesmo. 
  - Banco de dados utilizado: *PostgreSQL* 
  - Dentro do projeto existe um arquivo de documentação das APIs desenvolvido no Postman chamado: *API-Documentation.postman_collection*  
  
 - dependencies  
    ``aws-sdk``:  Biblioteca com os drivers da aws para facilitar a utilização dos seus serviços   
    ``bcryptjs``:  Biblioteca utilizada para o hash de senhas da aplicação  
    ``cors``:  Biblioteca que permite liberar ou restringir acesso da API para domínios diferentes  
    ``dotenv``:  Biblioteca para a utilização de variaveis de ambiente  
    ``express``:  Biblioteca de criação de rotas para APIs  
    ``express -async-errors``:  Biblioteca que lida com os erros gerados no express de forma asincronas  
    ``jsonwebtoken``:  Biblioteca que trabalha com os JWTs  
    ``multer``:  Biblioteca utilizada como middleware para obter as informações de um arquivo enviado na requisição  
    ``multer-s3``:   Biblioteca de steaming do multer para o bucket da AWS S3  
    ``pg``:  Biblioteca driver do Postgres (utilizaod no typeorm)  
    ``reflect-metadata``: Biblioteca que permite a utilização de funcionalidades que ainda não estão no ECMAScript padrão  
    ``tsyringe``:  Bibliotecla que realiza a injeção de dependencias através dos decorators  
    ``typeorm``:  Biblioteca ORM que facilita a manipulação das entidades presente no banco de dados  
    ``uuid``:  Biblioteca que gera um id único universal  
    ``yup``:  Biblioteca para validação das informações recebida na requisição  

- devDependencies  
    ``@babel/plugin-proposal-class-properties``: Biblioteca babel que permite realizar a atribuição de valor fora do método construtor (Utilizado para rodar o Jest)  
    ``@babel/plugin-proposal-decorators``: Biblioteca que converte decorators em um formato entendivel para os interpretadores JavaScipr (Utilizado para rodar o Jest)  
    ``@babel/preset-env``: Biblioteca que transforma versões mais recentes do JavaScript em versões aceitas por diversos blundles (Utilizado para rodar o Jest)  
    ``@babel/preset-typescript``: Biblioteca que tranforma arquivo TypeScript em JavaScript (Utilizado para rodar o Jest)  
    ``@types/bcryptjs``: Biblioteca de tipos da biblioteca bcryptjs  
    ``@types/cors``: Biblioteca de tipos da biblioteca cors  
    ``@types/multer-s3``: Biblioteca de tipos da biblioteca multer-s3  
    ``@types/express``: Biblioteca de tipos da biblioteca express  
    ``@types/jest``: Biblioteca de tipos da biblioteca jest  
    ``@types/jsonwebtoken``: Biblioteca de tipos da biblioteca jsonwebtoken  
    ``@types/multer``: Biblioteca de tipos da biblioteca multer  
    ``@types/uuid``: Biblioteca de tipos da biblioteca uuid  
    ``@typescript-eslint/eslint-plugin``: Biblioteca que permite o ESLint aplicar regras em arquivos TypeScript  
    ``@typescript-eslint/parser``: Biblioteca que permite o ESLint realizar lint em arquivos TypeScript  
    ``babel-plugin-transform-typescript-metadata``: Biblioteca que transpila TypeScript em JavaScript permitindo decorators  
    ``eslint``: Biblioteca que realiza o linting do código  
    ``eslint-config-airbnb-base``: Bliblioteca base de lint utilizada pela equipe do airbnb em seus projetos   
    ``eslint-plugin-import``: Biblioteca que auxilia no linting de funcionalidades do ES6 evitando erros  
    ``jest``: Biblioteca para realizar os testes automatizados (TDD)  
    ``ts-node``: Biblioteca que transforma TypeScript em JavaScript  
    ``ts-node-dev``: Biblioteca que auxilia o desenvolvimento utilizando TypeScript  
    ``typescript``: Biblioteca que realiza a leitura do código em TypeScript  
