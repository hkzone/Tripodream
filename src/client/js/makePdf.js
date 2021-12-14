import { jsPDF } from 'jspdf';
import pdfDocument from './Components/pdfDocument';

const downloadTrip = (e, type = 'saved') => {
  const id = e.target.getAttribute('data-id');

  // ********************** Create and display printable version of the trip ********************** //
  const pdfHTML = document.createElement('div');
  pdfHTML.innerHTML = pdfDocument(id, type);
  document.body.appendChild(pdfHTML);

  const pdfModal = document.querySelector('#pdf-modal');
  pdfModal.style.display = 'flex';

  // ***************************** event listener on Save button click **************************** //
  const printButton = document.querySelector('#pdf-modal .print-pdf');
  printButton.addEventListener('click', () => {
    // eslint-disable-next-line new-cap
    const pdf = new jsPDF('p', 'pt', [795, 1245]);
    const pdfContent = document.querySelector('.pdf-content');
    pdfContent.style.zoom = 'normal';
    pdfContent.style.border = 'none';
    pdf.html(document.querySelector('#pdf'), {
      callback: () => {
        pdfHTML.remove();
        pdf.save('test.pdf');
      },
      x: 10,
      y: 10,
    });
  });

  // **************************** event listener on Close button click **************************** //
  document
    .querySelector('#pdf-modal .close-pdf')
    .addEventListener('click', () => pdfModal.remove());
};

export default downloadTrip;
