document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('#login-form');
  
    if (loginForm) {
      loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
  
        const email = document.querySelector('#email-login').value.trim();
        const password = document.querySelector('#password').value.trim();
  
        if (email && password) {
          try {
            const response = await fetch('/api/users/login', {
              method: 'POST',
              body: JSON.stringify({ email, password }),
              headers: { 'Content-Type': 'application/json' },
            });
  
            if (response.ok) {
              document.location.replace('/dashboard');
            } else {
              alert('Failed to log in.');
            }
          } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred. Please try again.');
          }
        } else {
          alert('Please fill in both email and password.');
        }
      });
    } else {
      console.error('Login form not found');
    }
  });