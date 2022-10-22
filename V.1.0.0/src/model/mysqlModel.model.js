const models = {
    onboard: `
        CREATE TABLE users
            (
                id int auto_increment primary key,
                email varchar(50),
                username varchar(50),
                password varchar(100)
            );`,
    moviesListing: `
        CREATE TABLE movies
            (
                id int auto_increment primary key,
                movieName varchar(100),
                rating int,
                cast text,
                genre varchar(50),
                releaseDate timestamp   
            );`
    };

module.exports = models;