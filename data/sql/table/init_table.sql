CREATE TABLE post
(
   post_id        INT AUTO_INCREMENT,
   title          VARCHAR(255) NOT NULL,
   subtitle       VARCHAR(255) NOT NULL,
   content        TEXT NOT NULL,
   image_modifier VARCHAR(255), 
   image_url      VARCHAR(255) NOT NULL,
   publish_date   VARCHAR(255) NOT NULL,
   author_url     VARCHAR(255) NOT NULL,
   author         VARCHAR(255) NOT NULL,
   featured       TINYINT(1),
   PRIMARY KEY (post_id)
) ENGINE = InnoDB
CHARACTER SET = utf8mb4
COLLATE utf8mb4_unicode_ci
;