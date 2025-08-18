// Simple client-side login/signup + active form toggle (demo only — not secure for production)

document.addEventListener('DOMContentLoaded', () => {
    const loginBox = document.getElementById('loginBox');
    const signupBox = document.getElementById('signupBox');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    const toggleSignupLinks = document.querySelectorAll('.toggle-signup');
    const toggleLoginLinks = document.querySelectorAll('.toggle-login');

    function showLogin() {
        loginBox.classList.add('active');
        signupBox.classList.remove('active');
    }
    function showSignup() {
        signupBox.classList.add('active');
        loginBox.classList.remove('active');
    }

    toggleSignupLinks.forEach(a => a.addEventListener('click', e => { e.preventDefault(); showSignup(); }));
    toggleLoginLinks.forEach(a => a.addEventListener('click', e => { e.preventDefault(); showLogin(); }));

    // init visible form
    showLogin();

    function getUsers() { return JSON.parse(localStorage.getItem('users') || '{}'); }
    function saveUsers(users) { localStorage.setItem('users', JSON.stringify(users)); }

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('signup-name').value.trim();
        const password = document.getElementById('signup-password').value;
        if (!username || !password) { alert('Provide username and password.'); return; }
        const users = getUsers();
        if (users[username]) { alert('User already exists. Choose another username.'); return; }
        users[username] = { password }; // plain text for demo only
        saveUsers(users);
        alert('Signup successful. You can now log in.');
        signupForm.reset();
        showLogin();
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('login-name').value.trim();
        const password = document.getElementById('login-password').value;
        const users = getUsers();
        if (users[username] && users[username].password === password) {
            alert('Login successful.');
            // TODO: redirect to dashboard
        } else {
            alert('Invalid username or password.');
        }
    });
});