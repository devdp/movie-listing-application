const baseUrl = "http://localhost:3000/routes/v1/"

const addDiv = () => {
    document.getElementById('list').style.display = 'none';
    document.getElementById('add').style.display = 'inline';
}

const listDiv = () => {
    document.getElementById('list').style.display = 'inline';
    document.getElementById('add').style.display = 'none';
    fetchMovies()
}

const add = () => {
    var settings = {
        "url": `${baseUrl}dashboard/create/${localStorage.getItem('userId')}`,
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
          "Content-Type": "application/json"
        },
        "data": JSON.stringify({
          "movieName": document.getElementById('movieName').value,
          "rating": document.getElementById('rating').value,
          "cast": (document.getElementById('cast').value).split(','),
          "genre": document.getElementById('genre').value,
          "releaseDateTime": document.getElementById('date').value
        }),
      };
      
      $.ajax(settings).done(function (response) {
        alert(response.msg);
        listDiv()
      });
}

const newJwt = () => {
    var settings = {
        "url": `${baseUrl}token`,
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/json"
        },
        "data": JSON.stringify({
          "email": localStorage.getItem('email'),
          "token": localStorage.getItem('refreshToken')
        }),
      };
      
      $.ajax(settings).done(function (response) {
        localStorage.setItem('accessToken', response.data.accessToken)
        fetchMovies()
      });
}

const del = (id) => {
    var settings = {
        "url": `${baseUrl}dashboard/del/${id}`,
        "method": "DELETE",
        "timeout": 0,
        "headers": {
          "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
        },
      };
      
      $.ajax(settings).done(function (response) {
        alert(response.msg);
        fetchMovies()
      });
}

const updateModal = (id, datetime, movieName, genre, cast, rating) => {
    document.getElementById('modalMovieName').value = movieName;
    document.getElementById('modalRating').value = rating;
    document.getElementById('modalGenre').value = genre;
    document.getElementById('modalCast').value = cast;
    document.getElementById('modalDate').value = datetime.replace('a.m.','').replace('p.m.','');
    document.getElementById('modalMovieId').value = id;
}

const update = (id) => {
    var settings = {
        "url": `${baseUrl}dashboard/update/${localStorage.getItem('userId')}`,
        "method": "PUT",
        "timeout": 0,
        "headers": {
          "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
          "Content-Type": "application/json"
        },
        "data": JSON.stringify({
          "movieName": document.getElementById('modalMovieName').value,
          "rating": document.getElementById('modalRating').value,
          "cast": document.getElementById('modalCast').value,
          "genre": document.getElementById('modalGenre').value,
          "releaseDateTime": document.getElementById('modalDate').value,
          "movieId": id
        }),
      };
      
      $.ajax(settings).done(function (response) {
        alert(response.msg);
        fetchMovies()
      });
}

const fetchMovies = async () => {
    var settings = {
        "url": `${baseUrl}dashboard/list/${localStorage.getItem('userId')}`,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
        },
        "data": "",
    };

    $.ajax(settings).done(function (response) {
        console.log(response)
        if(response.msg.includes("jwt expired")){
            newJwt()
        }else{
            var movieList = response.data;
            var tableRow = []
            for(item of movieList){
                tableRow.push(`
                <tr>
                    <td>
                        ${new Date(item.releaseDate).toLocaleString().replace(',','').replace('a.m. ','').replace('p.m. ','')}
                    </td>
                    <td>
                        ${item.movieName}
                    </td>
                    <td>
                        ${item.genre}
                    </td>
                    <td>
                        ${item.cast}
                    </td>
                    <td>
                        ${item.rating}
                    </td>
                    <td>
                        <button type="button" class="btn btn-warning" onclick="del(${item.movieId})">Delete</button>
                        <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="updateModal(${item.movieId},'${new Date(item.releaseDate).toLocaleString('en-ca').replace(',','').replace('a.m. ','').replace('p.m. ','')}','${item.movieName}','${item.genre}','${item.cast}','${item.rating}')">Update</button>
                    </td>
                </tr>
                `)
            }
            document.getElementById('mbody').innerHTML = tableRow.join('');
        }
    });
}

const logOut = () => {
    localStorage.clear();
    window.location.replace('http://localhost:3000/routes/v1/login')
}