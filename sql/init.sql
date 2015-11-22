create table user (
	id mediumint primary key not null auto_increment,
	email varchar(255) unique,
	password varchar(255),
	facebookId varchar(255),
	googleId varchar(255),
	isAdmin tinyint(1) default 0,
	createdAt datetime,
	updatedAt datetime
);

create table authtoken (
	userId mediumint not null,
	foreign key (userId) references user (id),
	token varchar(255),
	PRIMARY KEY (userId, token)
);

/* Create a default user and a corresponding token for testing purposes */
