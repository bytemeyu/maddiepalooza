CREATE TABLE users (
    user_id SERIAL NOT NULL,
    email CHARACTER VARYING(100) NOT NULL,
    username CHARACTER VARYING(50) NOT NULL,
    password_hash CHARACTER VARYING(255) NOT NULL,
    role CHARACTER VARYING(50) NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (user_id),
    CONSTRAINT users_email_key UNIQUE (email),
    CONSTRAINT users_username_key UNIQUE (username),
    CONSTRAINT email_format CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$')
);

-- Inserir um usuário (fictício)
INSERT INTO users (email, username, password_hash, role)
VALUES 
('aanitakawasaki@gmail.com', 'aanitakawasaki', '$2b$10$D3iNUHYWJadmlfnshjpexOqVObrk1SPIaVrw8kaMWJ4uOpJ6LNueG', 'webadmin');
--a senha é: 123Hash*