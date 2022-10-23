const { error, info } = require('../logger/logging.setup');
const { RQuery, WQuery } = require('../database/mysql.setup');

const create = async (req) => {
    const {
        movieName,
        rating,
        cast,
        genre,
        releaseDateTime
    } = req.body

    if (movieName == undefined || rating == undefined || cast == undefined || genre == undefined || releaseDateTime == undefined) {
        return (data = data = {
            'msg': 'Some Parameteres Missing',
            'status': "OK",
            'statusCode': 200
        })
    }

    var checkMovie = await RQuery(`
        SELECT 
            id 
        FROM 
            movies 
        WHERE 
            movieName = '${movieName}';`
    );

    if (checkMovie.length > 0) {
        return (data = data = {
            'msg': 'Movie Already Exists',
            'status': "OK",
            'statusCode': 200
        })
    }

    var response = await WQuery(`
        INSERT INTO
            movies
        (
            movieName,
            rating,
            cast,
            genre,
            releaseDate,
            userId
        ) VALUES (
            '${movieName}',
            '${rating}',
            '${cast.join(',')}',
            '${genre}',
            '${releaseDateTime}',
            '${req.params.id}'
        );`
    )

    return (data = {
        'msg': response,
        'status': "OK",
        'statusCode': 200
    })

}

const get = async (req) => {
    var response = await RQuery(`
        SELECT 
            id as movieId,
            movieName,
            rating,
            cast,
            genre,
            releaseDate
        FROM
            movies
        WHERE
            userId = ${req.params.id};
    `);

    return (data = {
        'data': response,
        'msg': "Movies Fetched Successfully",
        'status': "OK",
        'statusCode': 200
    });
}

const update = async (req) => {
    const {
        movieName,
        rating,
        cast,
        genre,
        releaseDateTime,
        movieId
    } = req.body;

    if (movieName == undefined || rating == undefined || cast == undefined || genre == undefined || releaseDateTime == undefined || movieId == undefined) {
        return (data = data = {
            'msg': 'Some Parameteres Missing',
            'status': "OK",
            'statusCode': 200
        })
    }

    var response = await WQuery(`
        UPDATE 
            movies
        SET
            movieName = '${movieName}',
            rating = '${rating}',
            cast = '${cast}',
            genre = '${genre}',
            releaseDate = '${releaseDateTime}'
        WHERE
            id = '${movieId}'
    `);

    return (data = {
        'msg': response,
        'status': "OK",
        'statusCode': 200
    });

}

const del = async (req) => {
    response = await WQuery(`
        DELETE FROM
            movies
        WHERE
            id = ${req.params.movieId}
    `);

    return (data = {
        'msg': response,
        'status': "OK",
        'statusCode': 200
    })
}

module.exports = {
    create, get, update, del
}