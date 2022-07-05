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
