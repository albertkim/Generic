create table user (
	id mediumint primary key not null auto_increment,
	email varchar(100) unique not null,
	name varchar(100),
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
	token varchar(255) not null unique,
  createDate datetime not null,
	PRIMARY KEY (userId, token)
);

create table emailVerification (
	userId mediumint not null,
	foreign key (userId) references user (id),
	token varchar(255) not null unique,
  createDate datetime not null,
	PRIMARY KEY (userId, token)
);

create table notificationPreferences (
	id mediumint primary key not null auto_increment,
	name varchar(255) not null,
	category varchar(255) not null,
	defaultValue tinyint(1) not null
);

insert into notificationPreferences (name, category, defaultValue)
	values ('Receive marketing emails', 'Email', 1);
insert into notificationPreferences (name, category, defaultValue)
	values ('Receive new product emails', 'Email', 1);

create table userNotificationPreferences (
	notificationPreferenceId mediumint not null,
	foreign key (notificationPreferenceId) references notificationPreferences (id),
	userId mediumint not null,
	foreign key (userId) references user (id),
	value tinyint(1) not null
);
