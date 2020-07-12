
    document.querySelector("h2").innerText = new Date().toLocaleString().slice(0,17)
    setInterval(() => document.querySelector("h2").innerText = new Date().toLocaleString(), 1000)

    let list = document.querySelector('#todo-list'),
        form = document.querySelector('#form'),
        item = document.querySelector('#item');
    
    form.addEventListener('submit', addItem, false);
    list.addEventListener('click', clickHandler);
    list.addEventListener('change', changeColor);  

    function clickHandler (e) {
      let itemId = e.target.title;
      if (e.target.classList.contains('remove-button')) {
        removeItem(itemId);
      } else if (e.target.classList.contains('modify-button')) {
        modifyItem(itemId);
      } else if (e.target.classList.contains('move-up-button')) {
        moveUp(itemId);
      } else if (e.target.classList.contains('move-down-button')) {
        moveDown(itemId);
      } else if (e.target.classList.contains('checked-button')) {
        toggleChecked(itemId);
      } else if (e.target.classList.contains('item-label')) {
        toggleChecked(itemId);
      } else if (e.target.classList.contains('todo-task')) {
        toggleChecked(itemId);
      }
    }

    function moveUp(itemId) {
      let item = document.getElementById(`li-${itemId}`);
      if (item.previousSibling) {
        item.previousSibling.before(item);
      }
    }

    function moveDown(itemId) {
      let item = document.getElementById(`li-${itemId}`);
      if (item.nextSibling) {
        item.nextSibling.after(item);
      }
    }

    function changeColor(e) {
      if (e.target.type = 'select') {
        let select = e.target;
        select.classList.remove(select.classList[1]);
        select.classList.add(select.options[select.selectedIndex].classList[0]);
      }
    }

    function removeItem (itemId) {
      document.getElementById(`li-${itemId}`).remove()
    }

    function toggleChecked (itemId) {  
      let li = document.getElementById(`li-${itemId}`);
      let button = document.getElementById(`checkedButton-${itemId}`);
      let a = document.getElementById(`a-${itemId}`);
      console.log(a)

      if (li.classList.contains('checked')) {
        li.classList.remove('checked');
        // button.classList.remove('checked');
        button.innerHTML = '&#9633';
        a.classList.remove('checked');
      } else {
        li.classList.add('checked');
        // button.classList.add('checked');
        button.innerHTML = '&#10003';
        a.classList.add('checked');
      }
    }

    function modifyItem (itemId) {
      let item = document.getElementById(`a-${itemId}`);
      let answer = prompt('Change ToDo item:', item.innerHTML);
      if (answer) {
        item.innerHTML = answer
      }
    }

    function addItem (e) {

      e.preventDefault();

      let itemId = new Date().getTime();
      let colors = ['none', 'red', 'yellow', 'green', 'blue', 'gray']
      
      function createNewLi () {
        let newLi = document.createElement('li');
        newLi.classList.add('todo-task');
        newLi.title = itemId;
        newLi.id = `li-${itemId}`;
        newLi.draggable = true;
        return newLi
      }

      function createNewSelect () {
        let newSelect = document.createElement('select');
        newSelect.classList.add('color-select');
        newSelect.classList.add('none');
        newSelect.id = `select-${itemId}`;
        
        for (let i in colors) {
          let newOption = document.createElement('option');
          newOption.classList.add(colors[i]);
          newSelect.appendChild(newOption);
        }
        return newSelect;
      }

      function createNewButton (name, className, icon) {
        let newButton = document.createElement('span');
        newButton.classList.add(className);
        newButton.type = 'button';
        newButton.innerHTML = icon;
        newButton.title = itemId;
        newButton.id = `${name}-${itemId}`;
        return newButton;
      }

      function createNewA () {
        let newA = document.createElement('a');
        newA.classList.add('item-label');
        newA.innerText = item.value;
        newA.title = itemId;
        newA.id = `a-${itemId}`;
        return newA;
      }

      let newLi = createNewLi();

      newLi.appendChild(createNewSelect());
      newLi.appendChild(createNewButton('checkedButton', 'checked-button', '&#9633'));
      newLi.appendChild(createNewA());
      newLi.appendChild(createNewButton('moveUpButton', 'move-up-button', '&#9650'));
      newLi.appendChild(createNewButton('moveDownButton', 'move-down-button', '&#9660'));
      newLi.appendChild(createNewButton('removeDownButton', 'remove-button', '&#128465'));
      newLi.appendChild(createNewButton('modifyButton', 'modify-button', '&#9998'));

      list.appendChild(newLi);

      item.value = "";
      // store();
    }

    function store() {
      window.localStorage.myItems = list.innerHTML;
    }
    
    function getValues() {
      var storedValues = window.localStorage.myItems;
      if(!storedValues) {
        list.innerHTML = '<li>Make a to do list</li>'+
                         '<li>Check off first thing on the to do list</li>'+
                         '<li>Realize you have already accomplished 2 things in the list</li>'+
                         '<li>Reward yourself with a nap</li>';
      }
      else {
        list.innerHTML = storedValues;
      }
    }


/// DnD ///

let dragged
let draggedId
let dragItems = list.children
let dragIndex

    list.addEventListener('dragstart', ({target}) => {
      dragged = target;
      draggedId = target.id;
      for(let i = 0; i < dragItems.length; i += 1) {
        if(dragItems[i] === dragged){
          dragIndex = i;
        }
      }
      console.log(dragIndex);
  });

  list.addEventListener('dragover', (event) => {
    event.preventDefault();
});

list.addEventListener('drop', ({target}) => {
  if(target.classList.contains('todo-task') && target.id !== draggedId) {
      // dragged.remove( dragged );
     for(let i = 0; i < dragItems.length; i += 1) {
       if(dragItems[i] === target){
        dropIndex = i;
       }
     }
     if(dragIndex > dropIndex) {
       target.before( dragged );
     } else {
      target.after( dragged );
     }
   }
 });

    // getValues();
