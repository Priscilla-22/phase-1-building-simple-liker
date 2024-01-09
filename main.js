// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡';
const FULL_HEART = '♥';

// Your JavaScript code goes here!
const likeBtns = document.querySelectorAll('.like');
const errorModal = document.getElementById('modal');
const modalMessage = document.getElementById('modal-message');
likeBtns.forEach((likeBtn) => {
  likeBtn.addEventListener('click', () => {
    const glyph = likeBtn.querySelector('.like-glyph');

    mimicServerCall()
      .then(() => {
        if (glyph.textContent === EMPTY_HEART) {
          glyph.textContent = FULL_HEART;
          likeBtn.classList.add('activated-heart');
        } else {
          glyph.textContent = EMPTY_HEART;
          likeBtn.classList.remove('activated-heart');
        }
      })

      .catch((err) => {
        console.error('Error:', err);
        errorModal.classList.remove('hidden');
        likeBtn.classList.remove('activated-heart');

        modalMessage.innerText = err;
        setTimeout(() => {
          errorModal.classList.add('hidden');
        }, 3000);
      });
  });
});

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url = 'http://mimicServer.example.com', config = {}) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      let isRandomFailure = Math.random() < 0.2;
      if (isRandomFailure) {
        reject('Random server error. Try again.');
      } else {
        resolve('Pretend remote server notified of action!');
      }
    }, 300);
  });
}
