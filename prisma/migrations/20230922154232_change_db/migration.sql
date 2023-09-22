-- RedefineIndex
CREATE UNIQUE INDEX `Employees_email_key` ON `Employees`(`email`);
DROP INDEX `employee_email` ON `employees`;

-- RedefineIndex
CREATE UNIQUE INDEX `Users_email_key` ON `Users`(`email`);
DROP INDEX `User_email_key` ON `users`;
