
drop database if exists mobit;

create database if not exists mobit;


create table users (
  id int auto_increment,
  name varchar(30),
  password varchar(200),
  city varchar(20),
  email varchar(50),
  user_type enum('REGULAR', 'ADMIN', 'SUPER_ADMIN') default 'REGULAR',
  joined_on datetime default NOW(),
  primary key (id)
);

create table items (
  id int auto_increment,
  name varchar(40),
  start_price double(10, 10),
  type varchar(30),
  category varchar(30),
  on_complete_delete boolean default true,
  user_id int,
  foreign key(user_id) references users(id),
  primary key(id)
);


-- keep history of bids made on items 
create table bids (
  id int auto_increment,
  item_id int,
  user_id int,
  made_on datetime default NOW(),
  is_winner boolean default false,
  price double(10, 10),
  foreign key(item_id) references items(id),
  foreign key(user_id) references users(id),
  primary key(id)
);

