const myLibrary = [];

function book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.index = myLibrary.length;

    this.info = function () {
        return title + " by " + author + ", " + pages + " pages, " + read;
    }
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new book(title, author, pages, read);
    myLibrary.push(newBook);
    renderLibrary();

}

function renderLibrary() {
    // Empty library div
    document.getElementById("bookCase").innerHTML = "";

    for (let i = 0; i < myLibrary.length; i++) {
        //Create book card elements 
        const bookTitle = document.createElement("p");
        const titleText = document.createTextNode(myLibrary[i].title);
        bookTitle.appendChild(titleText);

        bookTitle.className = "bookCardTitle";

        

        const bookAuthor = document.createElement("p");
        const authorText = document.createTextNode(myLibrary[i].author);
        bookAuthor.appendChild(authorText);

        const bookPages = document.createElement("p");
        const pagesText = document.createTextNode(myLibrary[i].pages + " pages");
        bookPages.appendChild(pagesText);

        const bookRead = document.createElement("button");
        bookRead.style.backgroundColor = "green";
        bookRead.className = "readBtn";
        let readStr = "";
        if (myLibrary[i].read == true) {
            readStr = "Read";
            bookRead.style.backgroundColor = "#9fff9c";
        } else {
            readStr = "Not read";
            bookRead.style.backgroundColor = "#ff7070";
        }
        bookRead.textContent = readStr;

        const bookRemove = document.createElement("button");
        bookRemove.className = "removeBtn"

        bookRemove.textContent = "Remove";

        book.prototype.addReadBtnInteract(bookRead);
        addRemoveBtnInteract(bookRemove, myLibrary[i].index);

        const bookCard = document.createElement("div");
        bookCard.className = "bookCard";

        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);
        bookCard.appendChild(bookPages);
        bookCard.appendChild(bookRead);
        bookCard.appendChild(bookRemove);

        const bookList = document.getElementById("bookCase");
        bookList.appendChild(bookCard);
    }
    // document.getElementById("bookCase").innerHTML = "";


}

book.prototype.addReadBtnInteract = function (readBtn) {
    readBtn.addEventListener("click", function () {
        if (readBtn.textContent == "Read") {
            readBtn.textContent = "Not read";
            readBtn.style.backgroundColor = "#ff7070";
        } else {
            readBtn.textContent = "Read";
            readBtn.style.backgroundColor = "#9fff9c";
        }
        
    })
}
function addRemoveBtnInteract(removeBtn, index) {
    removeBtn.addEventListener("click", function () {
        myLibrary.splice(index, 1);
        for (let i = index; i < myLibrary.length; i++) {
            myLibrary[i].index -= 1;
        }
        
        renderLibrary();
    })
}
const addBook = document.querySelector("#addBookBtn");
const bookDialog = document.querySelector("dialog");
const bookForm = document.querySelector("#bookForm");
const bookRemove = document.querySelector(".removeBtn");
const bookCase = document.querySelector("#bookCase");

addBook.addEventListener("click", function () {
    bookDialog.showModal();
})
bookForm.addEventListener("submit", function () {
    console.log("form submitted");
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("bRead").checked;
    addBookToLibrary(title, author, pages, read);
    bookForm.reset();

})

addBookToLibrary("The Rise of Theodore Roosevelt", "Edmund Morris", "960", false);