-- MySQL Script generated by MySQL Workbench
-- Sun Jul 14 23:37:46 2024
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema graduated_project
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `graduated_project` ;

-- -----------------------------------------------------
-- Schema graduated_project
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `graduated_project` DEFAULT CHARACTER SET utf8mb3 ;
USE `graduated_project` ;

-- -----------------------------------------------------
-- Table `graduated_project`.`tbl_user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `graduated_project`.`tbl_user` ;

CREATE TABLE IF NOT EXISTS `graduated_project`.`tbl_user` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `mail` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `graduated_project`.`tbl_file`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `graduated_project`.`tbl_file` ;

CREATE TABLE IF NOT EXISTS `graduated_project`.`tbl_file` (
  `file_id` INT NOT NULL AUTO_INCREMENT,
  `file_name` VARCHAR(60) NULL DEFAULT NULL,
  `user_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`file_id`),
  INDEX `User_id_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `User_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `graduated_project`.`tbl_user` (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `graduated_project`.`tbl_table`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `graduated_project`.`tbl_table` ;

CREATE TABLE IF NOT EXISTS `graduated_project`.`tbl_table` (
  `table_id` INT NOT NULL AUTO_INCREMENT,
  `table_name` VARCHAR(60) NOT NULL,
  `script` TEXT NULL DEFAULT NULL,
  `x` FLOAT(6, 2) NULL DEFAULT NULL,
  `y` FLOAT(6, 2) NULL DEFAULT NULL,
  `file_id` INT NOT NULL,
  PRIMARY KEY (`table_id`),
  INDEX `File_id_idx2` (`file_id` ASC) VISIBLE,
  CONSTRAINT `fk_tablelist_ref_files`
    FOREIGN KEY (`file_id`)
    REFERENCES `graduated_project`.`tbl_file` (`file_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `graduated_project`.`tbl_fk`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `graduated_project`.`tbl_fk` ;

CREATE TABLE IF NOT EXISTS `graduated_project`.`tbl_fk` (
  `fk_id` INT NOT NULL AUTO_INCREMENT,
  `from_tbl` VARCHAR(45) NOT NULL,
  `ref_tbl` VARCHAR(45) NOT NULL,
  `from_col` VARCHAR(45) NOT NULL,
  `ref_col` VARCHAR(45) NOT NULL,
  `file_id` INT NULL DEFAULT NULL,
  `table_id` INT NOT NULL,
  PRIMARY KEY (`fk_id`),
  INDEX `File_id_idx1` (`file_id` ASC) VISIBLE,
  INDEX `fk_foreignkey_ref_tablelist_idx` (`table_id` ASC) VISIBLE,
  CONSTRAINT `fk_foreignkey_ref_files`
    FOREIGN KEY (`file_id`)
    REFERENCES `graduated_project`.`tbl_file` (`file_id`),
  CONSTRAINT `fk_foreignkey_ref_tablelist`
    FOREIGN KEY (`table_id`)
    REFERENCES `graduated_project`.`tbl_table` (`table_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
