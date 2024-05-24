const stageModel = {
    tableName: 'stage',
    columns: {
        stage_id: { type: 'integer', allowNull: false, default: 'nextval(\'stage_stage_id_seq\'::regclass)' },
        name: { type: 'character varying(50)', allowNull: true },
        location: { type: 'character varying(50)', allowNull: false },
        capacity: { type: 'integer', allowNull: false },
    },
    primaryKey: 'stage_id',
    indexes: [
        { name: 'stage_pkey', type: 'PRIMARY KEY', columns: ['stage_id'] },
    ],
    foreignKeyConstraints: [
        { name: 'performance_stage_id_fkey', foreignKey: 'stage_id', references: { table: 'stage', column: 'stage_id' } },
    ],
};
