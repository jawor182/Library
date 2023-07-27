let library = [];

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
}

function addBookToLibrary() {
    const form = document.querySelector('form');
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Access input values correctly
        let nameInput = form.querySelector('#name');
        let authorInput = form.querySelector('#author');
        let pagesInput = form.querySelector('#pages');

        // Get the values of the inputs
        let title = nameInput.value;
        let author = authorInput.value;
        let pages = pagesInput.value;

        let newBook = new Book(title, author, pages);
        library.push(newBook);

        // Save the updated library to local storage
        localStorage.setItem('library', JSON.stringify(library));

        displayBooks();
        form.reset();
    });
}

function displayBooks() {
    const content = document.querySelector('.content');

    // Clear previous content
    content.innerHTML = '';

    library = JSON.parse(localStorage.getItem('library')) || [];

    for (let i = 0; i < library.length; i++) {
        const panel = document.createElement('div');
        panel.className = 'panel';
        panel.setAttribute('data-index', i);
        const name = document.createElement('div');
        name.className = 'name';
        name.textContent = 'Title: "' + library[i].title + '"';
        const author = document.createElement('div');
        author.className = 'author';
        author.textContent = 'Author: ' + library[i].author;
        const pages = document.createElement('div');
        pages.className = 'pages';
        pages.textContent = 'Pages: ' + library[i].pages;

        const label = document.createElement('label');
        label.className = 'read';
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.className = 'read-toggle';
        const button = document.createElement('button');
        button.textContent = 'Remove';
        button.className = 'remove';
        button.setAttribute('data-index', i);
        label.appendChild(button);

        panel.appendChild(name);
        panel.appendChild(author);
        panel.appendChild(pages);
        panel.appendChild(label);
        content.appendChild(panel);
    }
    initializeRemoveButtonEventListeners();
}

function removeBook(index) {
    library.splice(index, 1);
    localStorage.setItem('library', JSON.stringify(library));
    displayBooks();
}

function initializeRemoveButtonEventListeners() {
    const removeButtons = document.querySelectorAll('.remove');
    removeButtons.forEach((button) => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const index = this.getAttribute('data-index');
            removeBook(index);
        });
    });
}


// Load existing books from local storage when the page is loaded
window.addEventListener('load', function () {
    library = JSON.parse(localStorage.getItem('library')) || [];
    displayBooks();
});

addBookToLibrary();
