CREATE TABLE IF NOT EXISTS artist (
    artist_id SERIAL NOT NULL,
    name CHARACTER VARYING(50) NOT NULL,
    biography CHARACTER VARYING(400),
    photo_url CHARACTER VARYING(400),
    CONSTRAINT artists_pkey PRIMARY KEY (artist_id)
);

-- criar o índice
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = 'idx_artist_name') THEN
        CREATE INDEX idx_artist_name ON artist(name);
    END IF;
END $$;

-- Inserir um artista (Madonna)
-- INSERT INTO artist (name, biography, photo_url)
-- VALUES 
-- ('Madonna', 'Madonna Louise Ciccone is an American singer, songwriter, and actress. She is known as the "Queen of Pop".', 'https://example.com/madonna.jpg');
