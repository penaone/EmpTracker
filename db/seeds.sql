INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Ginnie', 'Weasly', 2, 4),
  ('Mr', 'Mr', 2, 2),
  ('Howdie', 'Doodie', 2, 6),
  ('James', 'Joanes', 2, 7),
  ('Bo', 'Derrek' 2, 3),
  ('Martha', 'Mavins', 2, 9),
  ('Melanie', 'Martin', 5, 3),
  ('Jacob', 'Malik', 2, 4),
  ('Alice', 'Granger', 2, 6),
  ('Knight', 'Witherspoon', 2, 4),
  ('Monica', 'Humidor', 2, 4),
  ('Janis', 'Joplin', 2, 4),
  ('Dracula', 'Frankenstein', 2, 4);

INSERT INTO role (title, salary, department_id)
VALUES
  ('Analyst', 120000, 1),
  ('Music Curator', 100000, 1),
  ('CEO', 250000, 1),
  ('Life Coach', 200000, 2),
  ('King Handler', 200000, 2),
  ('Comfort Provider', 300000, 3),
  ('Accountant', 300000, 3),
  ('Maytag Repairman', 300000, 3),
  ('Snivler', 300000, 3),
  ('Nose Warmer', 100000, 1);

INSERT INTO department (name)
VALUES
  ('Human Resources'),
  ('Sales'),
  ('Product Management');