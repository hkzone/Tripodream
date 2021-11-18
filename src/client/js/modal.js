const modal = document.getElementById('myModal'); // Get the modal
const modalContent = document.getElementById('modal_content'); // Get the modal content
const span = document.getElementsByClassName('close')[0]; // Get the <span> element that closes the modal

// When the user clicks on <span> (x), close the modal
span.onclick = () => {
  modal.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (e) {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
};

export { modal, modalContent };
