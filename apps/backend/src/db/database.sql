DROP SCHEMA IF EXISTS `todo`;

CREATE SCHEMA IF NOT EXISTS `todo` DEFAULT CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS `todo`.`users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(100) NOT NULL,
  `password` VARCHAR(150) NULL DEFAULT NULL,
  `name` VARCHAR(200) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = INNODB AUTO_INCREMENT = 3 DEFAULT CHARACTER SET = UTF8MB4 COLLATE = UTF8MB4_0900_AI_CI;

CREATE TABLE IF NOT EXISTS `todo`.`user_tokens` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `token` TEXT NOT NULL,
  `expires_at` DATETIME NULL DEFAULT NULL,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_user_tokens_users_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_tokens_users` FOREIGN KEY (`user_id`) REFERENCES `todo`.`users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `todo`.`products` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NULL DEFAULT NULL,
  `price` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = INNODB AUTO_INCREMENT = 9 DEFAULT CHARACTER SET = UTF8MB4 COLLATE = UTF8MB4_0900_AI_CI;

CREATE TABLE IF NOT EXISTS `todo`.`permissions` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name` (`name` ASC) VISIBLE
) ENGINE = InnoDB AUTO_INCREMENT = 16 DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `todo`.`roles` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = INNODB AUTO_INCREMENT = 3 DEFAULT CHARACTER SET = UTF8MB4 COLLATE = UTF8MB4_0900_AI_CI;

CREATE TABLE IF NOT EXISTS `todo`.`role_permissions` (
  `roles_id` INT(11) NOT NULL,
  `permissions_id` INT(11) NOT NULL,
  INDEX `fk_role_permissions_roles1_idx` (`roles_id` ASC) VISIBLE,
  INDEX `fk_role_permissions_permissions1_idx` (`permissions_id` ASC) VISIBLE,
  CONSTRAINT `fk_role_permissions_roles1` FOREIGN KEY (`roles_id`) REFERENCES `todo`.`roles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_role_permissions_permissions1` FOREIGN KEY (`permissions_id`) REFERENCES `todo`.`permissions` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `todo`.`stands` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name` (`name` ASC) VISIBLE
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `todo`.`cashbox` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `stand_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name` (`name` ASC) VISIBLE,
  INDEX `fk_cashbox_stands1_idx` (`stand_id` ASC) VISIBLE,
  CONSTRAINT `fk_cashbox_stands1` FOREIGN KEY (`stand_id`) REFERENCES `todo`.`stands` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `todo`.`sales` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(100) NULL DEFAULT NULL,
  `date` DATETIME NULL DEFAULT NULL,
  `user_id` INT(11) NOT NULL,
  `id_casamiento` INT(11) NOT NULL,
  
  PRIMARY KEY (`id`),
  
  INDEX `fk_sales_users1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_sales_casamiento1_idx` (`id_casamiento` ASC) VISIBLE,
  
  CONSTRAINT `fk_sales_users1`
    FOREIGN KEY (`user_id`) REFERENCES `todo`.`users` (`id`),
    
  CONSTRAINT `fk_sales_casamiento1`
    FOREIGN KEY (`id_casamiento`) REFERENCES `todo`.`casamiento` (`id`)
) ENGINE = InnoDB
  DEFAULT CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `todo`.`sales_details` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `sale_id` INT(11) NOT NULL,
  `product_id` INT(11) NOT NULL,
  `amount` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_sales_details_sales1_idx` (`sale_id` ASC) VISIBLE,
  INDEX `fk_sales_details_products1_idx` (`product_id` ASC) VISIBLE,
  CONSTRAINT `fk_sales_details_products1` FOREIGN KEY (`product_id`) REFERENCES `todo`.`products` (`id`),
  CONSTRAINT `fk_sales_details_sales1` FOREIGN KEY (`sale_id`) REFERENCES `todo`.`sales` (`id`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `todo`.`user_tokens` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `token` TEXT NOT NULL,
  `expires_at` DATETIME NULL DEFAULT NULL,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_user_tokens_users_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_tokens_users` FOREIGN KEY (`user_id`) REFERENCES `todo`.`users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `todo`.`users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(100) NOT NULL,
  `password` VARCHAR(150) NULL DEFAULT NULL,
  `name` VARCHAR(200) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = INNODB AUTO_INCREMENT = 3 DEFAULT CHARACTER SET = UTF8MB4 COLLATE = UTF8MB4_0900_AI_CI;

INSERT INTO
  todo.permissions (name)
VALUES
  ('create stand'),
  ('list stand'),
  ('update stand'),
  ('delete stand'),
  ('create user'),
  ('list user'),
  ('update user'),
  ('delete user'),
  ('create product'),
  ('list product'),
  ('update product'),
  ('delete product'),
  ('create sale'),
  ('list sale'),
  ('view report');

-- Insertar roles
INSERT INTO
  todo.roles (name)
VALUES
  ('Administrador'),
  ('Vendedor');

-- Insertar usuarios pass es 123456
INSERT INTO
  todo.users (username, password, name)
VALUES
  (
    'vendedora1',
    '$2b$10$3s9XjyL2mJvMP7lLO4tpVe/VbJ2Q1cRvCsGFtoR17CaFxl6SD1XEK',
    'Juan Pérez'
  ),
  (
    'admin',
    '$2b$10$3s9XjyL2mJvMP7lLO4tpVe/VbJ2Q1cRvCsGFtoR17CaFxl6SD1XEK',
    'María López'
  );

-- Insertar stands
INSERT INTO
  todo.stands (name)
VALUES
  ('Stand 1 - Payagua'),
  ('Stand 2 - Bebidas');

-- Insertar cajas (cashbox)
INSERT INTO
  todo.cashbox (name, stand_id)
VALUES
  ('Caja Principal', 1),
  ('Caja Gaseosas', 2);

-- Insertar productos típicos paraguayos de San Juan
INSERT INTO
  todo.products (name, price)
VALUES
  ('Pajagua Mascada', 5000),
  ('Chipa Guasu', 6000),
  ('Mbejú', 4000),
  ('Sopa Paraguaya', 6000),
  ('Butifarra', 7000),
  ('Pastel Mandi´o', 4500),
  ('Chicharô Trenzado', 5500),
  ('Chipa Almidón', 3000);