# App

Gympass style app.

## RFs

=> [x] Deve ser possivel se cadastrar;
=> [x] Deve ser possivel se autenticar;
=> [x] Deve ser possivel obter o perfil de um usuario logado;
=> [x] Deve ser possivel obtero numero de check-ins realizados pelo usuario logado;
=> [x] Deve ser possivel o usuario obter seu historico de check-ins;
=> [x] Deve ser possivel o usuario buscar academias proximas (até 10km);
=> [x] Deve ser possivel o usuario buscar academias pelo nome;
=> [x] Deve ser possivel o usuario realizar check-in em uma academia;
=> [x] Deve ser possivel validar o check-in de um usuario;
=> [x] Deve ser possivel cadastrar uma academia;

## RNs

=> [x] O usuario não deve poder se cadastrar com um e-mail duplicado;
=> [x] O usuario não pode fazer 2 check-ins no mesmo dias;
=> [x] O usuario não pode fazer check-in se não estiver perto (100m) da academia;
=> [x] O check-in só pode ser validado até 20 minutos após criado;
=> [] O check-in só pode ser validado por administradores;
=> [] A academia só pode ser cadastrada por administradores;

## RNFs

=> [x] A senha do usuario precisa estar criptografada;
=> [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
=> [x] Todas as listas de dados precisam estar paginadas com 20 itens por página;
=> [x] O usuario deve ser identificado por um JWT (Json Web Token);