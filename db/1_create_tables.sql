-- Dev: f97gp1@gmail.com
-- Date: May 24th, 2020
-- 
-- Table that suppor the tiny project


CREATE TABLE ci_user (
  id_user uuid NOT NULL, 
  email   varchar(64) NOT NULL UNIQUE, 
  dev_lvl varchar(64), 
  PRIMARY KEY (id_user));
