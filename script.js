// PROJECT TODO
// 1. Add item to list - DONE
// 2. Delete item from list - DONE
// 3. Check item off list (Delete)
// 4. Clear all items from list
// 5. Filter items from list
// 6. Save list to local storage

// HANDLES
const form = document.getElementById('item-form');
const formInput = document.getElementById('item-input');
const submitBtn = document.querySelector('btn[type="submit"]');

const filter = document.getElementById('filter');


const list = document.getElementById('item-list');

const clearBtn = document.getElementById('clear');





// Array.from(list.children).map(item => item.innerText.toLowerCase());

// VARIABLES

// Initialize listItems
let listItems = getList() || [];

console.log(listItems);

if (listItems && Array.isArray(listItems) && listItems.length > 0)
    populateUI(listItems)



// FUNCTIONS

// PopulateUI with initial list items
function populateUI(listArr) {
    listArr.forEach(item => {
        createLi(item);
    })
}

function checkDuplicate(item) {
    let items = getList();
    if (items)
        return items.includes(item) ? true : false;

}

// Function to create list item
function createLi(item) {

    const li = document.createElement('li');

    const text = document.createTextNode(capitalize(item));

    const button = createButton('remove-item btn-link text-red');

    li.appendChild(text);
    li.appendChild(button);

    list.appendChild(li);
}

function createButton(classes) {
    const button = document.createElement('button');
    button.className = classes;
    button.appendChild(createIcon('fa-solid fa-xmark'));
    return button;
}

function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

// Function to get list from local storage
function getList() {
    return JSON.parse(localStorage.getItem('list'));
}

function removeItemLS() {
    localStorage.removeItem('list');
}

function saveList() {
    localStorage.setItem('list', JSON.stringify(listItems));
}




// Function to add item to list
function addItem(e) {
    e.preventDefault();

    const input = formInput.value.trim().toLowerCase();
    if (input == '') {
        flagInput();
    } else if (checkDuplicate(input)) {
        formInput.setAttribute('placeholder', `${formInput.value} is already on your list`);
        flagInput();
    }
    else {
        listItems.push(input)
        createLi(input)
        saveList();
        formInput.value = '';
    }
}


// Function to delete item from list
function deleteItem(e) {
    // check if click was on delete button
    // bubble up to parent element
    // filter it from list

    let text = e.target.parentElement.parentElement.textContent.trim().toLowerCase();
    if (e.target.classList.contains('fa-xmark')) {
        listItems = listItems.filter(item => item !== text);
        saveList(listItems);
        e.target.parentElement.parentElement.remove();
    }
}


// Function to clear all items from list
function clearItems() {
    listItems = [];
    saveList();
    Array.from(list.children).forEach(item => item.remove());
}


// Function to filter items from list

function filterItems(e) {
    // get text from input
    // search through list items for same text

    const text = e.target.value.toLowerCase();
    console.log(text);
    let items = Array.from(list.children);

    items.forEach(item => {
        console.log(item)
        if (item.innerText.toLowerCase().includes(text)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    })
}




// EVENT LISTENERS

form.addEventListener('submit', addItem);

list.addEventListener('click', deleteItem);

clearBtn.addEventListener('click', clearItems);

filter.addEventListener('keyup', filterItems);














// UTILITY FUNCTIONS
function flagInput() {
    formInput.value = '';
    formInput.style.borderColor = 'red';
    setTimeout(() => { formInput.style.borderColor = '#ccc'; }, 3000);
}

function capitalize(str) {
    let str1 = str.slice(1);
    let str2 = str.slice(0, 1).toUpperCase();

    console.log(str2 + str1)
    return str2 + str1;
}