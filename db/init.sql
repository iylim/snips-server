DROP TABLE IF EXISTS snippet; 
CREATE TABLE snippet (
  id SERIAL PRIMARY KEY,
  code TEXT,
  title TEXT,
  description TEXT,
  favorites INT DEFAULT 0,
  author TEXT,
  language TEXT
);

INSERT INTO 
  snippet (code, title, description, language, author) 
VALUES 
  ('4 + 4', 'math', 'I can math', 'Addition', 'asian girl'),
  ('const me = Ivy', 'Me', 'I am a const', 'JS', 'Ivy'),
  ('const america = 1776', 'freedom', 'Murica!', 'JavaScript', 'Ben Franklin');