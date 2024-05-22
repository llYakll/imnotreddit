const signup = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#signup-form input[name="username"]').value.trim();
  const email = document.querySelector('#signup-form input[name="email"]').value.trim(); // Added email field
  const password = document.querySelector('#signup-form input[name="password"]').value.trim();

  if (username && email && password) { 
    try {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }), 
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to sign up.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  } else {
    alert('Please enter a username, email, and password.'); 
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.querySelector('#signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', signup);
  }
});