create table especialidade (
    codigo serial primary key, 
    nome text not null, 
    descricao text not null 
);

create table medico (
    codigo serial primary key, 
    nome text not null,
    crm varchar(15) not null, 
    cpf varchar(11) not null,
    especialidade int not null,
    foreign key (especialidade) references especialidade (codigo)
); 

insert into especialidade (nome, descricao) values ('Cardiologista', 'área que cuida do coração'), ('Neurologista', 'área que cuida do cérebro');
insert into medico (nome, crm, cpf, especialidade) values ('Mariana', '12345', '11452369871', 1), ('Jessica', '23658', '12304569871', 2);


create table usuarios (
	email varchar(50) not null primary key, 
	senha varchar(20) not null, 
	tipo char(1)  not null, 
	check (tipo = 'T' or tipo = 'A' or tipo = 'U'),
	telefone varchar(14)  not null, 
	nome varchar(50) not null
);

-- inserindo alguns registros na tabela usuários
insert into usuarios (email, senha, tipo, telefone, nome) 
values ('jessica@ifsul.edu.br', '123456', 'A','(54)99999-9999','Jessica'), 
('joao@ifsul.edu.br', '123456', 'U','(54)44484-4348','Joao');