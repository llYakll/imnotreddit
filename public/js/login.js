const login = async (event) => {
  event.preventDefault();

  console.log('Login form submitted'); //logging lumberjack

  const username = document.querySelector('#login-form input[name="username"]').value.trim();
  const password = document.querySelector('#login-form input[name="password"]').value.trim();

  if (username && password) {

    try {
      const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
      });

        if (response.ok) {
          console.log('Login successful'); //logging lumberjack
          document.location.replace('/');
        } else {
          alert('Failed to log in.'); 
        }
        } catch (error) {
          console.error('Error:', error);
        }
  } else {
    alert('Please enter a username and password.');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector('#login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', login);
  }
});