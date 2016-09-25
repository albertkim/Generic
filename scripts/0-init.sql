create table user (
	id mediumint primary key not null auto_increment,
	email varchar(100) unique not null,
	isEmailVerified tinyint(1) not null default 0,
	phone varchar(255),
	phoneCountryCode varchar(50),
	isPhoneVerified tinyint(1) not null default 0,
	password varchar(100) not null,
	facebookId varchar(50),
	googleId varchar(50),
	isAdmin tinyint(1) not null default 0,
	createDate datetime not null
);

create table authToken (
	userId mediumint not null,
	foreign key (userId) references user (id),
	token varchar(255) not null,
  createDate datetime not null,
	PRIMARY KEY (userId, token)
);
