const performanceModel = {
    tableName: 'performance',
    columns: {
        performance_id: { type: 'integer', allowNull: false, default: 'nextval(\'performance_performance_id_seq\'::regclass)' },
        artist_id: { type: 'integer', allowNull: false },
        stage_id: { type: 'integer', allowNull: true },
        start_time: { type: 'timestamp with time zone', allowNull: true },
        end_time: { type: 'timestamp with time zone', allowNull: true },
        date: { type: 'date', allowNull: false },
    },
    primaryKey: 'performance_id',
    indexes: [
        { name: 'performance_pkey', type: 'PRIMARY KEY', columns: ['performance_id'] },
        { name: 'idx_performance_start_time', type: 'INDEX', columns: ['start_time'] },
    ],
    checkConstraints: [
        { name: 'check_start_end_time', expression: 'start_time < end_time' },
    ],
    foreignKeyConstraints: [
        { name: 'performance_artist_id_fkey', foreignKey: 'artist_id', references: { table: 'artist', column: 'artist_id' } },
        { name: 'performance_stage_id_fkey', foreignKey: 'stage_id', references: { table: 'stage', column: 'stage_id' }, allowNull: true },
    ],
};
