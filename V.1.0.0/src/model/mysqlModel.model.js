const models = {
    onboard: `
        CREATE TABLE users
            (
                id int auto_increment primary key,
                email varchar(50),
                username varchar(50),
                password varchar(100)
            )`
    };

module.exports = models;