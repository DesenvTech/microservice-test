
CREATE SCHEMA IF NOT EXISTS `test` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `test` ;

-- -----------------------------------------------------
-- Table `test`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `test`.`usuarios` (
  `id` VARCHAR(36) NOT NULL,
  `nome` VARCHAR(100) NOT NULL,
  `cpf` VARCHAR(11) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `telefone` VARCHAR(11) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`));



-- -----------------------------------------------------
-- Table `test`.`pedidos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `test`.`pedidos` (
  `id` VARCHAR(36) NOT NULL,
  `descricao` VARCHAR(255) NULL DEFAULT NULL,
  `quantidade` INT NOT NULL,
  `preco` DOUBLE NOT NULL,
  `valor` DOUBLE NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `usuario_id` VARCHAR(36) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_pedidos_usuarios_idx` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_pedidos_usuarios`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `test`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
