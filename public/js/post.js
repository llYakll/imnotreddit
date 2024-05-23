document.addEventListener('DOMContentLoaded', () => {
    const commentForm = document.getElementById('comment-form');
    
    if (!commentForm) {
      console.error('Comment form not found');
      return;
    }
  
    commentForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const commentTextElement = document.querySelector('textarea[name="comment_text"]');
      
      if (!commentTextElement) {
        console.error('Textarea for comment not found');
        return;
      }
  
      const commentText = commentTextElement.value.trim();
      const postId = commentForm.dataset.postId;
  
      console.log('Submitting comment:', { comment_text: commentText, post_id: postId });
  
      if (!commentText) {
        alert('Please enter a comment.');
        return;
      }
  
      const messageElement = document.getElementById('comment-message');
      messageElement.textContent = ''; // Clear previous message
  
      try {
        const response = await fetch(`/api/comments`, {
          method: 'POST',
          body: JSON.stringify({ comment_text: commentText, post_id: postId }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        console.log('Response status:', response.status);
        if (response.ok) {
          const responseData = await response.json();
          console.log('Comment submission successful:', responseData);
  
          messageElement.textContent = 'Comment added successfully!';
          messageElement.style.color = 'green';
          
          // Optionally, append the new comment to the comment list without reloading
          const newComment = responseData;
          const commentList = document.querySelector('.comment-list');
          if (commentList) {
            const commentDiv = document.createElement('div');
            commentDiv.innerHTML = `<p>${newComment.comment_text} - ${newComment.user.username} on ${new Date(newComment.createdAt).toLocaleString()}</p>`;
            commentList.appendChild(commentDiv);
          }
          commentForm.reset();
        } else {
          const errorData = await response.json();
          console.error('Comment submission failed:', errorData);
          messageElement.textContent = 'Comment was not published.';
          messageElement.style.color = 'red';
        }
      } catch (error) {
        console.error('Error posting comment:', error);
        messageElement.textContent = 'An error occurred. Please try again.';
        messageElement.style.color = 'red';
      }
    });
  });