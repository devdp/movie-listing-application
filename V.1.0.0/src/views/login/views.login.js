const baseUrl = "http://20.219.145.48:3000/routes/v1/"

const login = async () => {

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    var settings = {
        "url": `${baseUrl}login`,
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "email": email,
            "password": password
        }),
    };

    $.ajax(settings).done(function (response) {
        alert(response.msg)
        console.log(response)
        if (response.status == 'OK') {
            localStorage.setItem('email', response.data.email)
            localStorage.setItem('username', response.data.fullname)
            localStorage.setItem('accessToken', response.token.accessToken)
            localStorage.setItem('refreshToken', response.token.refreshToken)
            localStorage.setItem('userId', response.data.userId)
            window.location.replace('http://20.219.145.48:3000/routes/v1/dashboard')
        }
    });
}

const signUp = async () => {
    window.location.replace('http://20.219.145.48:3000/routes/v1/onboard')
}