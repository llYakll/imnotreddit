document.addEventListener('DOMContentLoaded', () => {
  const newPostButton = document.getElementById('new-post');
  const newPostForm = document.getElementById('new-post-form');

  if (newPostButton && newPostForm) {
    newPostButton.addEventListener('click', () => {
      newPostForm.style.display = newPostForm.style.display === 'none' ? 'block' : 'none';
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
    try {
      const response = await fetch('/api/posts');
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const posts = await response.json();

      const postsContainer = document.getElementById('posts-container');
      if (postsContainer) {
        postsContainer.innerHTML = '';

        posts.forEach(post => {
          const postDiv = document.createElement('div');
          postDiv.classList.add('post');
          postDiv.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.content}</p>
            <p>Posted by: ${post.user && post.user.username ? post.user.username : 'Unknown'} on <span class="post-time">${new Date(post.createdAt).toLocaleString()}</span></p>
            <button class="edit-post" data-id="${post.id}">Edit</button>
            <form class="edit-post-form" data-id="${post.id}" style="display: none;">
              <label for="edit-post-title-${post.id}">Edit Post Title</label>
              <input type="text" id="edit-post-title-${post.id}" name="title" value="${post.title}" placeholder="Post Title">
              <label for="edit-post-content-${post.id}">Edit Post Content</label>
              <textarea id="edit-post-content-${post.id}" name="content" placeholder="Write your post here...">${post.content}</textarea>
              <button type="submit">Update</button>
            </form>
            <button class="delete-post" data-id="${post.id}">Delete</button>
          `;
          postsContainer.appendChild(postDiv);

          const editButton = postDiv.querySelector(`.edit-post[data-id="${post.id}"]`);
          const deleteButton = postDiv.querySelector(`.delete-post[data-id="${post.id}"]`);
          const editForm = postDiv.querySelector(`.edit-post-form[data-id="${post.id}"]`);

          editButton.addEventListener('click', () => {
            editForm.style.display = editForm.style.display === 'none' ? 'block' : 'none';
          });

          editForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const title = editForm.querySelector('input[name="title"]').value.trim();
            const content = editForm.querySelector('textarea[name="content"]').value.trim();

            if (title && content) {
              const response = await fetch(`/api/posts/${post.id}`, {
                method: 'PUT',
                body: JSON.stringify({ title, content }),
                headers: { 'Content-Type': 'application/json' },
              });

              if (response.ok) {
                document.location.reload();
              } else {
                alert('Failed to update post.');
              }
            }
          });

          deleteButton.addEventListener('click', async () => {
            const response = await fetch(`/api/posts/${post.id}`, {
              method: 'DELETE',
              headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
              document.location.reload();
            } else {
              alert('Failed to delete post.');
            }
          });
        });
      } else {
        console.error('Posts container not found');
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  fetchPosts();
});
