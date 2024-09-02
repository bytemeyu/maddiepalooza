CREATE TABLE artist (
    artist_id SERIAL NOT NULL,
    name CHARACTER VARYING(50) NOT NULL,
    biography CHARACTER VARYING(400),
    photo_url CHARACTER VARYING(400),
    CONSTRAINT artists_pkey PRIMARY KEY (artist_id)
);

-- criar o índice
CREATE INDEX idx_artist_name ON artist(name);

-- Inserir um artista (Madonna)
INSERT INTO artist (name, biography, photo_url)
VALUES 
('Madonna', 'Madonna Louise Ciccone is an American singer, songwriter, and actress. She is known as the "Queen of Pop".', 'https://example.com/madonna.jpg');
