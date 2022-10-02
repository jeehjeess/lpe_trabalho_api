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