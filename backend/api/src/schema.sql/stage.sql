CREATE TABLE IF NOT EXISTS stage (
    stage_id SERIAL NOT NULL,
    name CHARACTER VARYING(50),
    location CHARACTER VARYING(50) NOT NULL,
    capacity INTEGER NOT NULL,
    CONSTRAINT stage_pkey PRIMARY KEY (stage_id)
);

-- Inserir um palco
-- INSERT INTO stage (name, location, capacity)
-- VALUES 
-- ('Main Stage', 'Central Park, NY', 50000);
