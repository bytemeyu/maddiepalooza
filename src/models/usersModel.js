export const usersModel = {
    tableName: 'users',
    columns: {
        user_id: { type: 'integer', allowNull: false, default: 'nextval(\'users_user_id_seq\'::regclass)' },
        email: { type: 'character varying(100)', allowNull: false },
        username: { type: 'character varying(50)', allowNull: false },
        password_hash: { type: 'character varying(255)', allowNull: false },
        role: { type: 'character varying(50)', allowNull: false },
    },
    primaryKey: 'user_id',
    indexes: [
        { name: 'users_pkey', type: 'PRIMARY KEY', columns: ['user_id'] },
        { name: 'users_email_key', type: 'UNIQUE', columns: ['email'] },
        { name: 'users_username_key', type: 'UNIQUE', columns: ['username'] },
    ],
    checkConstraints: [
        { name: 'email_format', expression: "email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$'" },
    ],
};
