CREATE VIEW artist_performances AS
SELECT 
    p.performance_id,
    a.name AS artist_name,
    s.name AS stage_name,
    p.start_time,
    p.end_time
FROM 
    performance p
JOIN 
    artist a ON p.artist_id = a.artist_id
JOIN 
    stage s ON p.stage_id = s.stage_id;
