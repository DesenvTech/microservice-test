CREATE DATABASE IF NOT EXISTS test;

CREATE TABLE `test`.`user` (
  `id` VARCHAR(36) NOT NULL,
  `nome` VARCHAR(100) NOT NULL,
  `cpf` VARCHAR(11) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `telefone` VARCHAR(11) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT NOW(),
  `updated_at` DATETIME NOT NULL DEFAULT NOW(),
  PRIMARY KEY (`id`));


CREATE TABLE `test`.`purchase` (
  `id` VARCHAR(36) NOT NULL,
  `user_id` VARCHAR(36) NOT NULL,
  `descricao` VARCHAR(255) NULL,
  `quantidade` INT NOT NULL,
  `preco` DOUBLE NOT NULL,
  `valor` DOUBLE NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT NOW(),
  `updated_at` DATETIME NOT NULL DEFAULT NOW(),
  PRIMARY KEY (`id`));
