document.addEventListener('DOMContentLoaded', () => {
    const newPostButton = document.getElementById('new-post');
    const newPostForm = document.getElementById('new-post-form');
  
    if (newPostButton && newPostForm) {
      newPostButton.addEventListener('click', () => {
        newPostForm.style.display = 'block';
      });
  
      newPostForm.addEventListener('submit', async (event) => {
        event.preventDefault();
  
        const title = document.getElementById('post-title').value.trim();
        const content = document.getElementById('post-content').value.trim();
  
        if (title && content) {
          const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
          });
  
          if (response.ok) {
            document.location.reload();
          } else {
            alert('Failed to create post.');
          }
        }
      });
    } else {
      if (!newPostButton) console.error('New Post button not found');
      if (!newPostForm) console.error('New Post form not found');
    }
  
    const fetchPosts = async () => {
      const response = await fetch('/api/posts');
      const posts = await response.json();
  
      const postsContainer = document.getElementById('posts-container');
      if (postsContainer) {
        postsContainer.innerHTML = '';
  
        posts.forEach(post => {
          const postDiv = document.createElement('div');
          postDiv.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.content}</p>
            <p>Posted by: ${post.user.username}</p>
            <button class="edit-post" data-id="${post.id}">Edit</button>
            <button class="delete-post" data-id="${post.id}">Delete</button>
          `;
          postsContainer.appendChild(postDiv);
        });
      } else {
        console.error('Posts container not found');
      }
    };
  
    fetchPosts();
  });