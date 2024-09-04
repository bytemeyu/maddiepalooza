CREATE TABLE performance (
    performance_id SERIAL NOT NULL,
    artist_id INTEGER NOT NULL,
    stage_id INTEGER,
    start_time TIMESTAMP WITH TIME ZONE,
    end_time TIMESTAMP WITH TIME ZONE,
    date DATE NOT NULL,
    CONSTRAINT performance_pkey PRIMARY KEY (performance_id),
    CONSTRAINT check_start_end_time CHECK (start_time < end_time),
    CONSTRAINT performance_artist_id_fkey FOREIGN KEY (artist_id)
        REFERENCES artist (artist_id),
    CONSTRAINT performance_stage_id_fkey FOREIGN KEY (stage_id)
        REFERENCES stage (stage_id)
);

-- criar o índice
CREATE INDEX idx_performance_start_time ON performance(start_time);

-- Inserir uma performance para a Madonna
-- INSERT INTO performance (artist_id, stage_id, start_time, end_time, date)
-- VALUES 
-- ((SELECT artist_id FROM artist WHERE name = 'Madonna'), 
--  (SELECT stage_id FROM stage WHERE name = 'Main Stage'),
--  '2024-08-30 20:00:00+00', '2024-08-30 22:00:00+00', '2024-08-30');
