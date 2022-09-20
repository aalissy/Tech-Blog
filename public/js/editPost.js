const post_id = document.querySelector('input[name="post-id"]').value;

const editFormHandler = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#post-title').value
    const content = document.querySelector('#post-content').value
    if (title && content) {
        const response = await fetch(`/api/posts/${post_id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            document.location.replace('/dashboard');
          } else {
            alert('Failed to update post');
          }
    }
}

const delButtonHandler = async (event) => {
    event.preventDefault();
   await fetch(`/api/posts/${post_id}`, {
    method: 'DELETE',
   }) 
   document.location.replace('/dashboard');
};

document
  .querySelector('#update')
  .addEventListener('click', editFormHandler);
document
  .querySelector('#delete')
  .addEventListener('click', delButtonHandler);