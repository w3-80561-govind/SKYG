#-------------------User Database----------------------------

create database skyg;
use skyg;


#Users Table
create table users
(
    user_id int PRIMARY KEY AUTO_INCREMENT,
    user_username varchar(30) NOT NULL,
    user_firstname varchar(30),
    user_lastname varchar(30),
    user_email varchar(30) unique NOT NULL,
    user_password varchar(200) NOT NULL,
    user_dob date,
    user_mobile varchar(15) unique NOT NULL,
    user_image varchar(200),
    user_created date,
    user_deactivated int(1) DEFAULT 0,
    user_blocked int(1) DEFAULT 0
);

#Category table

create table category
(
    category_id int PRIMARY KEY AUTO_INCREMENT,
    category_title varchar(50) UNIQUE NOT NULL,
    category_blocked int(1) DEFAULT 0
);

#Subcategory table


create table subcategory
(
    subcategory_id int PRIMARY KEY AUTO_INCREMENT,
    subcategory_title varchar(50) UNIQUE NOT NULL,
    subcategory_blocked int(1) DEFAULT 0,
    subcategory_category_id_fk int,
    FOREIGN KEY (subcategory_category_id_fk) REFERENCES category(category_id)
);


#Blogs table

create table blogs
(
    blog_id int PRIMARY KEY AUTO_INCREMENT,
    blog_title varchar(200) NOT NULL,
    blog_description varchar(2000) NOT NULL,
    blog_image varchar(200),
    blog_uploadtime date,
    blog_category_id_fk int,
    blog_subcategory_id_fk int,
    blog_user_id_fk int,
    blog_deleted int(1) DEFAULT 0,
    blog_blocked int(1) DEFAULT 0,
    FOREIGN KEY (blog_category_id_fk) REFERENCES category(category_id),
    FOREIGN KEY (blog_subcategory_id_fk) REFERENCES subcategory(subcategory_id),
    FOREIGN KEY (blog_user_id_fk) REFERENCES users(user_id)
);

#User action (like,dislike) table

create table user_actions
(
    user_action_id int PRIMARY KEY AUTO_INCREMENT,
    user_action_liked int(1) DEFAULT 0,
    user_action_disliked int(1) DEFAULT 0,
    user_id_fk int,
    user_blog_id_fk int,
    FOREIGN KEY (user_id_fk) REFERENCES users(user_id),
    FOREIGN KEY (user_blog_id_fk) REFERENCES blogs(blog_id)
);

#user Comments table

create table comments
(
    comment_id int PRIMARY KEY AUTO_INCREMENT,
    comment_text varchar(1000) NOT NULL,
    comment_uploadtime date,
    comment_user_id_fk int,
    comment_blog_id_fk int,
    comment_deleted int(1) DEFAULT 0,
    comment_blocked int(1) DEFAULT 0,
    FOREIGN KEY (comment_user_id_fk) REFERENCES users(user_id),
    FOREIGN KEY (comment_blog_id_fk) REFERENCES blogs(blog_id)
);


#Users share blogs table

create table shares
(
    share_id int PRIMARY KEY AUTO_INCREMENT,
    share_sending_user_id_fk int,
    share_receiving_user_id_fk int,
    share_blog_id_fk int,
    FOREIGN KEY (share_sending_user_id_fk) REFERENCES users(user_id),
    FOREIGN KEY (share_receiving_user_id_fk) REFERENCES users(user_id),
    FOREIGN KEY (share_blog_id_fk) REFERENCES blogs(blog_id)
);


#Login LOGS of users table

create table login_logs
(
    log_id int PRIMARY KEY AUTO_INCREMENT,
    log_user_id_fk int,
    log_time date,
    FOREIGN KEY (log_user_id_fk) REFERENCES users(user_id)
);




#------------------------ADMIN DATABASE--------------------------------

#Admins table

create table admins
(
    admin_id int PRIMARY KEY AUTO_INCREMENT,
    admin_name varchar(50),
    admin_email varchar(70),
    admin_password varchar(200),
    admin_image varchar(200)
);


#Admins action block(user,blog,category,subcategory,comment) LOGS

create table admin_actions
(
    admin_action_id int PRIMARY KEY AUTO_INCREMENT,
    admin_id_fk int,
    admin_comment_id_fk int,
    admin_blog_id_fk int,
    admin_user_id_fk int,
    admin_category_id_fk int,
    FOREIGN KEY (admin_comment_id_fk) REFERENCES comments(comment_id),
    FOREIGN KEY (admin_blog_id_fk) REFERENCES blogs(blog_id),
    FOREIGN KEY (admin_user_id_fk) REFERENCES users(user_id),
    FOREIGN KEY (admin_category_id_fk) REFERENCES category(category_id)
);



