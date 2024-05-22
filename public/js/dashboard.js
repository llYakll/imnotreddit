document.addEventListener('DOMContentLoaded', () => {
    const newPostButton = document.getElementById('new-post');
    const newPostForm = document.getElementById('new-post-form');
    
    console.log('New Post Button:', newPostButton); // Debug log
    console.log('New Post Form:', newPostForm); // Debug log
  
    newPostButton.addEventListener('click', () => {
      console.log('New Post button clicked'); // Debug log
      newPostForm.style.display = 'block';
    });
  
    newPostForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const title = document.getElementById('post-title').value.trim();
      const content = document.getElementById('post-content').value.trim();
  
      console.log('Form Submitted', { title, content }); // Debug log
  
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
  
    // Fetch and display posts
    const fetchPosts = async () => {
      const response = await fetch('/api/posts');
      const posts = await response.json();
  
      const postsContainer = document.getElementById('posts-container');
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
    };
  
    fetchPosts();
  });