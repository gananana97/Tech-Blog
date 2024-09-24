document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('new-post-form');
  
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const title = document.getElementById('title').value;
      const content = document.getElementById('content').value;
  
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });
  
      if (response.ok) {
        const newPost = await response.json();
        appendNewPost(newPost);
        form.reset();
      } else {
        alert('Failed to create a new post');
      }
    });
  
    const appendNewPost = (post) => {
      const existingPostsSection = document.getElementById('existing-posts');
      const newArticle = document.createElement('article');
  
      newArticle.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.content}</p>
        <button class="delete-post" data-id="${post.id}">Delete</button>
      `;
  
      existingPostsSection.appendChild(newArticle);
    };
  
    // Add event listener for delete buttons
    document.getElementById('existing-posts').addEventListener('click', async (event) => {
      if (event.target.classList.contains('delete-post')) {
        const postId = event.target.getAttribute('data-id');
  
        const response = await fetch(`/api/blogs/${postId}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          event.target.closest('article').remove();
        } else {
          alert('Failed to delete the post');
        }
      }
    });
  });