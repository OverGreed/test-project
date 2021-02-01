/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createType( 'user_role', ['Moderator', 'ModeratorPlus'] );
    pgm.createType( 'post_status', ['Pending', 'Approved'] );
    pgm.createTable('users', {
        id: 'id',
        username: {
            type: 'varchar(60)',
            notNull: true,
        },
        email: {
            type: 'varchar(255)',
        },
        country: {
            type: 'varchar(2)',
            notNull: true,
        },
        role: {
            type: '"user_role"',
        },
        image: {
            type: 'varchar(255)',
        }
    });
    pgm.createIndex('users', 'username', {
        unique: true,
    });

    pgm.createTable('communities', {
        id: 'id',
        title: {
            type: 'varchar(255)',
        },
        image: {
            type: 'varchar(255)',
        },
    });
    pgm.createTable('posts', {
        id: 'id',
        userId: {
            type: 'integer',
            notNull: true,
            references: '"users"',
            onDelete: 'cascade',
        },
        communityId: {
            type: 'integer',
            notNull: true,
            references: '"communities"',
            onDelete: 'cascade',
        },
        title: {
            type: 'varchar(255)',
        },
        body: {
            type: 'text',
        },
        summary: {
            type: 'text',
        },
        status: {
            type: '"post_status"',
        },
        image: {
            type: 'varchar(255)',
        },
        tags: {
            type: 'varchar[]',
        },
    });
    pgm.createTable('users_communities', {
        id: 'id',
        userId: {
            type: 'integer',
            notNull: true,
            references: '"users"',
            onDelete: 'cascade',
        },
        communityId: {
            type: 'integer',
            notNull: true,
            references: '"communities"',
            onDelete: 'cascade',
        },
    });
    pgm.createIndex('users_communities', ['userId', 'communityId'], {
        unique: true,
    });
    pgm.createTable('users_posts', {
        id: 'id',
        userId: {
            type: 'integer',
            notNull: true,
            references: '"users"',
            onDelete: 'cascade',
        },
        postId: {
            type: 'integer',
            notNull: true,
            references: '"posts"',
            onDelete: 'cascade',
        },
    });
    pgm.createIndex('users_posts', ['userId', 'postId'], {
        unique: true,
    });
    pgm.sql(`
        INSERT INTO users (username, email, role, image, country)
        VALUES (
            'test-user',
            'test-user@test.com',
            null, 
            'https://kansai-resilience-forum.jp/wp-content/uploads/2019/02/IAFOR-Blank-Avatar-Image-1.jpg',
            'UA'
         )`
    );
    pgm.sql(`
        INSERT INTO users (username, email, role, image, country)
        VALUES (
            'test-moderator',
            'test-moderator@test.com',
            'Moderator',
            'https://kansai-resilience-forum.jp/wp-content/uploads/2019/02/IAFOR-Blank-Avatar-Image-1.jpg',
            'GB'
        )`
    );
    pgm.sql(`
        INSERT INTO users (username, email, role, image, country)
        VALUES (
            'test-moderator-plus',
            'test-moderator-plustest@test.com', 
            'ModeratorPlus',
            'https://kansai-resilience-forum.jp/wp-content/uploads/2019/02/IAFOR-Blank-Avatar-Image-1.jpg',
            'PL'
        )`
    );
    pgm.sql(`
        INSERT INTO communities (title, image)
        VALUES (
            'Community A',
            'https://kansai-resilience-forum.jp/wp-content/uploads/2019/02/IAFOR-Blank-Avatar-Image-1.jpg'
        )`
    );
    pgm.sql(`
        INSERT INTO communities (title, image)
        VALUES (
            'Community B',
            'https://kansai-resilience-forum.jp/wp-content/uploads/2019/02/IAFOR-Blank-Avatar-Image-1.jpg'
        )`
    );
    pgm.sql(`
        INSERT INTO communities (title, image)
        VALUES (
            'Community C',
            'https://kansai-resilience-forum.jp/wp-content/uploads/2019/02/IAFOR-Blank-Avatar-Image-1.jpg'
        )`
    );
};

exports.down = pgm => {
    pgm.dropIndex('users_communities', ['userId', 'communityId'], {
        unique: true,
    });
    pgm.dropIndex('users_posts', ['userId', 'postId'], {
        unique: true,
    });
    pgm.dropIndex('users', 'username', {
        unique: true,
    });
    pgm.dropTable('posts_communities');
    pgm.dropTable('users_communities');

    pgm.dropTable('posts');
    pgm.dropTable('users');
    pgm.dropTable('communities');
    pgm.dropType( 'UserRole');
    pgm.dropType( 'PostStatus');
};
