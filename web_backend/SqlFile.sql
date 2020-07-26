create database if not exists web;

use web;

create table Food_Items
(
	id int primary key auto_increment,
    name varchar(50),
    description varchar(300),
    imageUrl varchar(300),
    FoodType varchar(50),
    price int,
    stock int
);

insert into Food_Items(name,description,imageUrl,FoodType,price,stock) values("Burger","Chicken Burger","https://i.pinimg.com/originals/e7/e0/0b/e7e00b3e594da8a4a292f4896e068eab.jpg","FastFood",350,5),
							 ("Pizza","13 Inch Pizza","https://www.slashgear.com/wp-content/uploads/2019/07/pizza_envat-1280x720.jpg","FastFood",450,5),
                             ("Biryani","Karachi Biryani","https://www.indoindians.com/wp-content/uploads/2016/08/Hyderabadi-Chicken-Biryani-by-Shabana-Akbany-1280x720.png","Pakistani",230,5);
                             

create table if not exists Users
(
	fullname varchar(50),
	email varchar(100) primary key,
    pass varchar(500)
);
create table if not exists Owners
(
	ownerName varchar(50) primary key,
    pass varchar(500)
); 
insert into Owners(ownerName,pass) value('admin', '$2b$10$we9Z5EHP1UUYItlAtHQVpOZZt4VKo9ZKAWPzAGCubiWcv4NmWXp7C');
