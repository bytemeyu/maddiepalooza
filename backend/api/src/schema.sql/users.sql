CREATE TABLE IF NOT EXISTS users (
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
