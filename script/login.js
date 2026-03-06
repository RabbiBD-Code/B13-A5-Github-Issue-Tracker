

document.getElementById("login-btn").addEventListener('click', () =>{
    const inputName = document.getElementById("input-name");
    const inputNameValue = inputName.value;
    const inputPassword = document.getElementById("input-password");
    const inputPasswordValue = inputPassword.value;
    
    if(inputNameValue === "admin" && inputPasswordValue === "admin123"){
        window.location.assign('./home.html')
    }
    else{
        alert("Incorrect name or password")
    }
})