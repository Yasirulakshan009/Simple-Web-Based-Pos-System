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
            const loginSec = document.getElementById('login-section');
            const dashSec = document.getElementById('dashboard-section');

            if (loginSec && dashSec) {
                loginSec.style.display = 'none';
                dashSec.style.display = 'flex';


            }

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


const logoutBtn = document.querySelector('.logout-link');
if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('login-section').style.display = 'flex';
        document.getElementById('dashboard-section').style.display = 'none';

        document.getElementById('exampleInputUsername').value = "";
        document.getElementById('exampleInputPassword1').value = "";
    });
}