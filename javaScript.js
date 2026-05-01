document.getElementById('loginBtn').addEventListener('click', function() {
    const username = document.getElementById('exampleInputUsername').value;
    const password = document.getElementById('exampleInputPassword1').value;

    if (username === "" || password === "") {
    alert("Fill All Fields !");
    return;
}

    if (username === "yasiru" && password === "1234") {
    alert("Login Successful!");
    window.location.href = "dashboard.html";

} else {
    alert("Invalid Username and Password. Try Again !");

    document.getElementById('exampleInputPassword1').value = "";
}
});

const checkbox = document.getElementById('exampleCheck1');
const passwordInput = document.getElementById('exampleInputPassword1');

checkbox.addEventListener('change', function() {
    if (this.checked) {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
});
