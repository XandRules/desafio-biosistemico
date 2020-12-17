
\c fazenda

-- CRIAR PESSOA

INSERT INTO "People"(
            id, name, lastname, cpf, role, disabled_at, created_at, updated_at)
    VALUES (default, 'Alexandre','da Silva Ribeiro','11111111111','Administrador',
     null,now(), now());

-- CRIAR USUÁRIO PARA PESSOA

INSERT INTO "User"(
            id, login, password_hash, people_id, disabled_at, created_at, 
            updated_at)
    VALUES (default, 'alexandre','$2y$12$EM0BbALqS4XKHQ9T9Q/QP.8Z15k.H8yO5fOjS.OZcjUu0akmDukxS',
     1, null, now(),now());

-- CRIAR PROPRIEDADE PARA PRODUTOR     

INSERT INTO "People"(
            id, name, lastname, cpf, role, disabled_at, created_at, updated_at)
    VALUES (default, 'Pedro','Ribeiro','22222222222','Produtor',
     null,now(), now());

INSERT INTO "Property"(
            id, name, people_id, disabled_at, created_at, updated_at)
    VALUES (default,'Fazendo Nova Esperança',2, null,now(),now());     