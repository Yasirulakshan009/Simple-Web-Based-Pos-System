const loginBtn = document.getElementById('loginBtn');
if (loginBtn) {
    loginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const username = document.getElementById('exampleInputUsername').value;
        const password = document.getElementById('exampleInputPassword1').value;

        if (username === "" || password === "") {
            alert("Fill All Fields !");
            return;
        }
        if (username === "y" && password === "1") {
            alert("Login Successful!");
            window.location.href = "index.html";

        } else {
            alert("Invalid Username and Password. Try Again !");
            document.getElementById('exampleInputPassword1').value = "";
        }
    });
}

const checkbox = document.getElementById('exampleCheck1');
const passwordInput = document.getElementById('exampleInputPassword1');
if (checkbox && passwordInput) {
    checkbox.addEventListener('change', function() {
        passwordInput.type = this.checked ? 'text' : 'password';
    });
}