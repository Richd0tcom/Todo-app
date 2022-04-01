// handle theme changes
const themeBtn = document.querySelector('.theme');
themeBtn.addEventListener('click',(e)=>{
    document.body.classList.toggle('dark');
});

//select the elements
const todoList = document.querySelector('#container');

const itemsLft = document.querySelector('#items-left');
todoList.addEventListener('click',toggleCompleted);

// slect activity elements
const all = document.querySelector('#all');
all.addEventListener('click',showAll);

const active = document.querySelector('#active');
active.addEventListener('click',filterActive);

const completed = document.querySelector('#completed');
completed.addEventListener('click',filterCompleted);

const clrCompleted = document.querySelector('#clr-completed');
clrCompleted.addEventListener('click',clearCompleted);



//create an array of todo items
let todoItems = JSON.parse(localStorage.getItem('items')) ||[];

//select the form
const form = document.querySelector('.form');
form.addEventListener('submit',addItem);

//add items to the list
function addItem(e) {
    e.preventDefault();//prevent page refresh

    //select the text
    const text = this.querySelector('input[name=item]').value;
    
    //create a todo-item object with the text and status
    const item = {
        text,
        complete : false,
    }

    todoItems.push(item);
    populateList(todoItems, todoList);
    localStorage.setItem('items',JSON.stringify(todoItems));

    itemsLeft(todoItems);

    //clear the input
    this.reset();
}

//toggle completed
function toggleCompleted(e) {

    const el = e.target;
    const index = el.dataset.index;

    if(e.target.matches('input')) {
       
        todoItems[index].complete = !todoItems[index].complete;

        localStorage.setItem('items',JSON.stringify(todoItems));
        populateList(todoItems, todoList);

        itemsLeft(todoItems);


    } else if (e.target.matches('img')){

        const child = e.target.parentElement.parentElement;
        todoList.removeChild(child);//removes from the DOM

        todoItems.splice(index,1);

        localStorage.setItem('items',JSON.stringify(todoItems));

        populateList(todoItems, todoList);
        itemsLeft(todoItems);
        

    } else{
        return;
    }

    //To persist state
    //localStorage.setItem('items',JSON.stringify(items));
    //populateList(todoItems, todoList);
    
}

//populate the list
function populateList(todos =[], list) {

    list.innerHTML = todos.map((todo,i)=>{
        return `
            <li class="items py-3 px-3 md:px-0 w-full h-14 lg:h-20 " data-index=${i} draggable="true" draggable>
                <label for="act${i}" class="grid justify-end items-center md:pr-2">
                    <input type="checkbox" name="" data-index=${i} id="act${i}" ${todo.complete ? 'checked' : ''}>
                    <div class="label w-5 h-5 rounded-full grid place-items-center md:w-7 md:h-7">
                        <img src="./images/icon-check.svg" alt="check" class="w-3 h-3">
                    </div>
                </label>
                <p class="${todo.complete ? 'strike' :''} px-5 text-[20px] py-0 lg:py-3">${todo.text}</p>
                <i class="grid place-items-center"><img src="./images/icon-cross.svg" alt="X" data-index=${i}></i>
            </li>`;
    }).join('');

    //addEventListeners();
    
}

//handle the count of items left
function itemsLeft(tdItems) {
    itemsLft.textContent = `${tdItems.filter(item=>!item.complete).length} items left`;//returns an array of unchecked (!item.complete) items


     //itemsLft.textContent = vam;

}

//handle activity
function clearCompleted() {
    
    const tds = document.querySelectorAll('.items');
    tds.forEach(td=>{
        if(td.querySelector('input').checked){
            td.remove(); //removes from the DOM   
            //todoList.removeChild(td);
        }
    })
    todoItems = todoItems.filter(item=> !item.complete);
}

function showAll() {
    
    const tds = document.querySelectorAll('.items');
    tds.forEach(td=> td.style.display = "grid");
}

function filterCompleted() {
    const tds = document.querySelectorAll('.items');
    tds.forEach(td=>{
        td.style.display = "grid";//display first bsefore filtering
        if(!td.querySelector('input').checked){
            td.style.display = "none";
        }
    })
}

function filterActive() {
    const tds = document.querySelectorAll('.items');
    tds.forEach(td=>{
        td.style.display = "grid"; //display them first bfore filtering
        if(td.querySelector('input').checked){
            td.style.display = "none";
        }
    })
}



populateList(todoItems, todoList);

//handle Drag and Drop


Sortable.create(todoList);


// let dragStartIndex;

// function addEventListeners(){

    
//     const draggables = document.querySelectorAll('.items');
//     draggables.forEach(item=>{
//         item.addEventListener('dragstart', dragStart);
//         item.addEventListener('dragover', dragOver);
//         item.addEventListener('drop', dragDrop);
//         item.addEventListener('dragenter', dragEnter);
//         item.addEventListener('dragleave', dragLeave);
//     });
    
// }

// function dragStart() {
//     //console.log('event:', 'dragStart');
//     dragStartIndex = +this.closest('li').getAttribute('data-index');
    
// }
// function dragOver(e) {
//     e.preventDefault();
// }
// function dragDrop() {
//     //console.log('event:', 'drop');
//     //plus sign changes from string to int.
//     let dragEndIndex = +this.getAttribute('data-index');
//     swapItems(dragStartIndex,dragEndIndex);
// }
// function dragEnter() {
    
// }
// function dragLeave() {
// }

// function swapItems(from,to) {
   
// }