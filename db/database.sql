-- CREATE DATABASE IF NOT EXISTS companydb;

-- USE companydb;

CREATE TABLE employee (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) DEFAULT NULL,
  salary INT(11) DEFAULT NULL, 
  PRIMARY KEY(id)
);

CREATE TABLE alumno (
  id INT(11) NOT NULL AUTO_INCREMENT,
  user_id INT(11) DEFAULT NULL,
  nombre VARCHAR(45) DEFAULT NULL,
  apellido VARCHAR(45) DEFAULT NULL,
  edad INT(3) DEFAULT NULL, 
  PRIMARY KEY(id)
);

CREATE TABLE user (
  id INT(11) NOT NULL AUTO_INCREMENT,
  username VARCHAR(45) DEFAULT NULL,
  password VARCHAR(512) DEFAULT NULL,
  email VARCHAR(45) DEFAULT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE plant (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) DEFAULT NULL,
  description VARCHAR(45) DEFAULT NULL,
  birthdate DATE DEFAULT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE medition (
  id INT(11) NOT NULL AUTO_INCREMENT,
  plant_id INT(11) DEFAULT NULL,
  date DATETIME DEFAULT NULL,
  humidity INT(11) DEFAULT NULL,
  temperature INT(11) DEFAULT NULL,
  bomsts BOOLEAN DEFAULT NULL,
  humedadsuelo INT(11) DEFAULT NULL,
  PRIMARY KEY(id)
);

DESCRIBE employee;

INSERT INTO employee values 
  (1, 'Ryan Ray', 20000),
  (2, 'Joe McMillan', 40000),
  (3, 'John Carter', 50000);

SELECT * FROM employee;
