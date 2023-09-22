create database users_game;
use users_game;

create table users(
	id bigint primary key auto_increment,
    username varchar(200) not null,
    password varchar(200) not null
);