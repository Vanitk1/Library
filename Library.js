table = document.querySelector('.table');
tbody = table.querySelector('tbody');

form = document.querySelector('.new-book-data');
addButton = form.querySelector('.add');
titleInput = form.querySelector('#title');
authorInput = form.querySelector('#author');
pagesInput = form.querySelector('#pages');

let myLibrary = [
  {
      title: "Book III: The Treason of Isengard",
      author: "John Ronald Reuel Tolkien",
      pages: 512,
      read: false
    }
 ];

class Book {
  constructor(title, author, pages, read) {
    this.name = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
 }

function getReadValue() {
  if(form.querySelector('input[name="read"]:checked').value == 'yes') return true;
  else return false;
}

function addBookToLibrary() {
 let title = titleInput.value;
 let author = authorInput.value;
 let pages = pagesInput.value;
 let read = getReadValue();
 let newBook = new Book(title, author, pages, read);
 myLibrary.push(newBook);
 }


 function addError(el) {
  let spanError = document.createElement('span');
  spanError.textContent = `Please enter a ${el.id}` ;
  spanError.id = `${el.id}Error`;
  spanError.classList.add('errorText');
  form.insertBefore(spanError, el);

  el.classList.add('errorInput');

  el.addEventListener('input', removeError);
 }

function removeError(el) {
  if (el.target.value != '') {
    el.target.removeEventListener('input', removeError);
    el.target.classList.remove('errorInput');
    document.querySelector(`#${el.target.id}Error`).remove();
  }
 }

function validateForm() {
  if (titleInput.value == "" && document.querySelector('#titleError') == null)
    addError(titleInput);
  if (authorInput.value == "" && document.querySelector('#authorError') == null)
    addError(authorInput);
  if (pagesInput.value == "" && document.querySelector('#pagesError') == null)
    addError(pagesInput);

  if (titleInput.value == "" || pagesInput.value == "" || authorInput.value == "")
    return false;
  else
    return true;
 }

function clearForm() {
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
 }

function createReadStatusTd(book) {
  let readStatusTd = document.createElement('td');
  let readStatusButton = document.createElement('button');
  readStatusButton.textContent = 'Change read status';
  readStatusButton.addEventListener('click', () => {
    book.read = !book.read;
    updateTable();
  });

  readStatusTd.appendChild(readStatusButton);
  return readStatusTd;
 }

function removeFromLibrary(index) {
  myLibrary.splice(index, 1);
  deleteButton.removeEventListener('click', removeFromLibrary);
  updateTable();
 }
  
function createDeleteTd(index) {
  let deleteTd = document.createElement('td');
  let deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => {
    myLibrary.splice(index, 1);
    updateTable();
  });

  deleteTd.appendChild(deleteButton);
  return deleteTd;
 }
  
function updateTable() {
  tbody.textContent = '';
   
  myLibrary.forEach((book, index) => {
    let row = document.createElement('tr');
    Object.keys(book).forEach(prop => {
      let newTd = document.createElement('td');
      newTd.textContent = book[prop];
      if (prop == 'read') newTd.textContent = book[prop] ? 'Read' : 'Not read';
      row.appendChild(newTd);
  });
  
    row.appendChild(createReadStatusTd(book));
    row.appendChild(createDeleteTd(index));
    tbody.appendChild(row);
  });
 }
 
 document.addEventListener('DOMContentLoaded', () => {
  pagesInput.addEventListener('input', () => {if(!pagesInput.validity.valid) pagesInput.value='' 
  });

 addButton.addEventListener('click', () => {
  if (validateForm() == false) return;
  addBookToLibrary();
  updateTable();
  clearForm(); 
  });

updateTable();
});