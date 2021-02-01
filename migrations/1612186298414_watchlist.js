/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('watchwords', {
        id: 'id',
        word: {
            type: 'varchar(255)',
        },
    });
};

exports.down = pgm => {
    pgm.dropTable('watchwords');
};
