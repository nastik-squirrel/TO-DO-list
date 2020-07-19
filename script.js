
    document.querySelector("h2").innerText = new Date().toLocaleString().slice(0,17)
    setInterval(() => document.querySelector("h2").innerText = new Date().toLocaleString(), 1000)

    let list = document.querySelector('#todo-list'),
        inputForm = document.querySelector('#input-form'),
        newItem = document.querySelector('#new-item'),
        colors = ['none', 'red', 'yellow', 'green', 'blue', 'gray'],
        saveButton = document.querySelector('#save'),
        uploadInput = document.querySelector('#file-upload'),
        uploadButton = document.querySelector('#upload'),
        reader = new FileReader();
        
    inputForm.addEventListener('submit', addItemOnSubmit, false);
    list.addEventListener('click', clickHandler);
    list.addEventListener('change', changeColor);
    saveButton.addEventListener('click', saveToFile);
    uploadButton.addEventListener('click', readFromFile);

    function clickHandler (e) {
      let itemId = e.target.dataset.id;
      if (e.target.classList.contains('remove-button')) {
        removeItem(itemId);
      } else if (e.target.classList.contains('modify-button')) {
        modifyItem(itemId);
      } else if (e.target.classList.contains('move-up-button')) {
        moveUp(itemId);
      } else if (e.target.classList.contains('move-down-button')) {
        moveDown(itemId);
      } else if (
        e.target.classList.contains('checked-button') || 
        e.target.classList.contains('item-label') ||
        e.target.classList.contains('todo-task')) {
        toggleChecked(itemId);
      }
      store();
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
        store();
      }
    }

    function removeItem (itemId) {
      document.getElementById(`li-${itemId}`).remove()
    }

    function toggleChecked (itemId) {
      let li = document.getElementById(`li-${itemId}`);
      let button = document.getElementById(`checkedButton-${itemId}`);
      let a = document.getElementById(`a-${itemId}`);

      if (li.classList.contains('checked')) {
        li.classList.remove('checked');
        // button.classList.remove('checked');
        button.innerHTML = '&#11036';
        button.title = 'Make Done'
        a.classList.remove('checked');
        a.title = 'Make Done'
      } else {
        li.classList.add('checked');
        // button.classList.add('checked');
        button.innerHTML = '&#10004';
        button.title = 'Make Undone'
        a.classList.add('checked');
        a.title = 'Make Undone'
      }
    }

    function modifyItem (itemId) {
      let item = document.getElementById(`a-${itemId}`);
      let answer = prompt('Change ToDo item:', item.innerHTML);
      if (answer) {
        item.innerHTML = answer
      }
    }

    function addItemOnSubmit(e) {
      e.preventDefault();
      addItem (itemId = new Date().getTime(), text = newItem.value);
      newItem.value = "";
      store();
    }

    function addItem (itemId = 0, text = '', category = '', checked = false) {

      if (!itemId) {
        itemId = new Date().getTime();
      }

      function createNewLi () {
        let newLi = document.createElement('li');
        newLi.classList.add('todo-task');
        newLi.dataset.id = itemId;
        newLi.id = `li-${itemId}`;
        newLi.draggable = true;
        return newLi
      }

      function createNewSelect () {
        let newSelect = document.createElement('select');
        newSelect.classList.add('color-select');
        newSelect.dataset.id = itemId;
        newSelect.title = 'Set Category';
        newSelect.id = `select-${itemId}`;

        for (let i in colors) {
          let newOption = document.createElement('option');
          newOption.classList.add(colors[i]);
          newSelect.appendChild(newOption);
          if (colors[i] == category) {
            newSelect.selectedIndex = i;
          }
        }
        newSelect.classList.add(newSelect.options[newSelect.selectedIndex].classList[0]);
        return newSelect;
      }

      function createNewButton (name, className, icon, hint) {
        let newButton = document.createElement('span');
        newButton.classList.add(className);
        newButton.type = 'button';
        newButton.innerHTML = icon;
        newButton.title = hint;
        newButton.dataset.id = itemId;
        newButton.id = `${name}-${itemId}`;
        return newButton;
      }

      function createNewA () {
        let newA = document.createElement('a');
        newA.classList.add('item-label');
        newA.innerText = text;
        newA.title = 'Make Done';
        newA.dataset.id = itemId;
        newA.id = `a-${itemId}`;
        return newA;
      }

      let newLi = createNewLi();

      newLi.appendChild(createNewSelect());
      newLi.appendChild(createNewButton('checkedButton', 'checked-button', '&#11036', 'Make Done'));
      newLi.appendChild(createNewA());
      newLi.appendChild(createNewButton('moveUpButton', 'move-up-button', '&#9650', 'Move Up'));
      newLi.appendChild(createNewButton('moveDownButton', 'move-down-button', '&#9660', 'Move Down'));
      newLi.appendChild(createNewButton('removeDownButton', 'remove-button', '&#128465', 'Remove task'));
      newLi.appendChild(createNewButton('modifyButton', 'modify-button', '&#9998', 'Modify task'));

      list.appendChild(newLi);

      if (checked) {
        toggleChecked(itemId);
      }
    }

    function store() {
      jsonData = [];
      for (let i = 1; i < list.childNodes.length; i++) {
        jsonData += `^${liToJson(list.childNodes[i])}`;
      }
      window.localStorage.MyToDo = jsonData;
    }

    function removeValues() {
      while (list.lastElementChild) {
        list.removeChild(list.lastElementChild);
      }
    }

    function getValues(data) {
      let toDoArray = data.split('^');
      if(toDoArray) {
        for (let i=1; i < toDoArray.length; i++) {
          item = JSON.parse(toDoArray[i]);
          addItem (itemId = item.itemId, text = item.text , category = item.category, checked = item.checked);
        }
      }
      store();
    }

    function saveToFile() {
      const a = document.createElement('a');
      const file = new Blob([window.localStorage.MyToDo], {type: 'text/plain'});
      a.href= URL.createObjectURL(file);
      a.download = 'my-to-do.txt';
      a.click();
    
      URL.revokeObjectURL(a.href);
    }

    function readFromFile() {
      if (uploadInput.files[0]) {
        reader.readAsText(uploadInput.files[0]);
        reader.onload = function(e) {
          removeValues();
          getValues(e.target.result) };
          store();
      } else {
        alert('No file chosen!');
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
   store();
 });


function liToJson(liObj) {
  jsonObj = {}
  jsonObj.itemId = liObj.dataset.id;
  jsonObj.category = liObj.childNodes[0].classList[1];
  jsonObj.text = liObj.childNodes[2].innerText;
  if (liObj.classList.contains('checked')) {
    jsonObj.checked = true;
  } else jsonObj.checked = false;
  return JSON.stringify(jsonObj);
}

  getValues(window.localStorage.MyToDo);
