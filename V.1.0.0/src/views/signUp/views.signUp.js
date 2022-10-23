const baseUrl = "http://20.219.145.48:3000/routes/v1/"

const signUp = async () => {

    const email = document.getElementById('email').value;
    const fullname = document.getElementById('fullname').value;
    const password = document.getElementById('password').value;

    var settings = {
        "url": `${baseUrl}onboard`,
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "email": email,
            "fullname": fullname,
            "password": password
        }),
    };

    $.ajax(settings).done(function (response) {
        alert(response.msg)
        window.location.replace('http://20.219.145.48:3000/routes/v1/onboard')
    });
}

const login = async () => {
    window.location.replace('http://20.219.145.48:3000/routes/v1/login')
}