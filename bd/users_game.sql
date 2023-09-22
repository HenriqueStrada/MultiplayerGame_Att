create database users_game;
use users_game;

create table users(
	id bigint primary key auto_increment,
    username varchar(200) not null,
    password varchar(200) not null
);

select * from users;

INSERT INTO users (username, password) VALUES ('teste', '1234');
INSERT INTO users (username, password) VALUES ('testando', '1234');