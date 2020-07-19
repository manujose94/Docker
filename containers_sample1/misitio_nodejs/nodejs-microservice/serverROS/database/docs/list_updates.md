INSERT INTO `robotnikdb`.`robot_model` (`id`, `name`, `description`, `supplier`, `username`, `password`) VALUES ('3', 'rb1', 'brazo y base rb1', 'Robotnik', 'rb1', 'R0b0tn1K');

INSERT INTO `robotnikdb`.`robot_model_test` (`robot_model_id`, `tests_id`) VALUES ('3', '3');

UPDATE `robotnikdb`.`robots_unit` SET `ip`='192.168.1.137' WHERE `id`='1';
INSERT INTO `robotnikdb`.`robots_unit` (`id`, `name`, `description`, `robot_model_id`, `ip`) VALUES ('2', 'robot_brazo', 'brazo y base negra', '2', '192.168.1.135');
