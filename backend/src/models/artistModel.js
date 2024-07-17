const artistModel = {
    tableName: 'artist',
    columns: {
        artist_id: { type: 'integer', allowNull: false, default: 'nextval(\'artists_artist_id_seq\'::regclass)' },
        name: { type: 'character varying(50)', allowNull: false },
        biography: { type: 'character varying(400)', allowNull: true },
        photo_url: { type: 'character varying(400)', allowNull: true },
    },
    primaryKey: 'artist_id',
    indexes: [
        { name: 'artists_pkey', type: 'PRIMARY KEY', columns: ['artist_id'] },
        { name: 'idx_artist_name', type: 'INDEX', columns: ['name'] },
    ],
    referencedBy: [
        { tableName: 'performance', foreignKey: 'artist_id', referencingTable: 'artist', referencingKey: 'artist_id' },
    ],
};
