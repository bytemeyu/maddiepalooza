export const artistPerformancesModel = {
    viewName: 'artist_performances',
    columns: {
        performance_id: 'integer',
        artist_name: 'character varying',
        stage_name: 'character varying',
        start_time: 'timestamp with time zone',
        end_time: 'timestamp with time zone',
    },
    viewDefinition: `
        CREATE VIEW artist_performances AS
        SELECT p.performance_id,
            a.name AS artist_name,
            s.name AS stage_name,
            p.start_time,
            p.end_time
        FROM performance p
        JOIN artist a ON p.artist_id = a.artist_id
        JOIN stage s ON p.stage_id = s.stage_id
    `,
};
