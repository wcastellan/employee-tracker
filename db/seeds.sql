INSERT INTO department (name)
VALUES
    ('IT'),
    ('Finance'),
    ('Legal'),
    ('Engineering'),
    ('Sales');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Web Developer', 75000, 1),
    ('Accountant', 60000, 2),
    ('Lawyer', 110000, 3),
    ('Engineer', 80000, 4),
    ('Sales Rep', 50000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Bob', 'Yager', 1, null),
    ('Ronald', 'Mcdonald', 2, null),
    ('Jane', 'Fonda', 3, 20),
    ('John', 'Jacobson', 4, null),
    ('Ellie', 'Page', 5, 45),
    ('Wendy', 'Smith', 6, 34);