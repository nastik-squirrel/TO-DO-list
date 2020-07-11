
    document.querySelector("h2").innerText = new Date().toLocaleString().slice(0,17)
    setInterval(() => document.querySelector("h2").innerText = new Date().toLocaleString(), 1000)

    let list = document.querySelector('#todo-list'),
        form = document.querySelector('#form'),
        item = document.querySelector('#item');
    
    form.addEventListener('submit', addItem, false);
    list.addEventListener('click', clickHandler);
    list.addEventListener('change', changeColor);  

    function clickHandler (e) {
      let itemId = e.target.itemId;
      if (e.target.classList.contains('remove-button')) {
        removeItem(itemId);
      } else if (e.target.classList.contains('modify-button')) {
        modifyItem(itemId);
      } else if (e.target.classList.contains('move-up-button')) {
        moveUp(itemId);
      } else if (e.target.classList.contains('checked-button')) {
        toggleChecked(itemId);
      } else if (e.target.classList.contains('item-label')) {
        toggleChecked(itemId);
      } else if (e.target.classList.contains('todo-task')) {
        toggleChecked(itemId);
      }
    }

    function moveUp(itemId) {
      let li = document.getElementById(`li-${itemId}`);
      let previous = li.previousSibling;    
      if (previous) {
        clone = previous.cloneNode(previous);
        list.replaceChild(previous, li);
        list.replaceChild(li, clone);
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
      let colors = ['red', 'yellow', 'green', 'blue', 'gray']
      
      let newLi = document.createElement('li');
      newLi.classList.add('todo-task');
      newLi.itemId = itemId;
      newLi.id = `li-${itemId}`;

      let newSelect = document.createElement('select');
      newSelect.classList.add('color-select');
      newSelect.classList.add('none');
      newSelect.id = `select-${itemId}`
      
      for (let i in colors) {
        let newOption = document.createElement('option');
        newOption.classList.add(colors[i]);
        newSelect.appendChild(newOption);
      }

      let hiddenOption = document.createElement('option');
      hiddenOption.hidden = true;
      hiddenOption.selected = true;
      newSelect.appendChild(hiddenOption);

      let newCheckedButton = document.createElement('span');
      newCheckedButton.classList.add('checked-button');
      newCheckedButton.type = 'button';
      newCheckedButton.innerHTML = '&#9633';
      newCheckedButton.itemId = itemId;
      newCheckedButton.id = `checkedButton-${itemId}`;

      let newModifyButton = document.createElement('span');
      newModifyButton.classList.add('modify-button');
      newModifyButton.type = 'button';
      newModifyButton.innerHTML = '&#9998';
      newModifyButton.itemId = itemId;
      newModifyButton.id = `modifyButton-${itemId}`;
      
      let newRemoveButton = document.createElement('span');
      newRemoveButton.classList.add('remove-button');
      newRemoveButton.type = 'button';
      newRemoveButton.innerHTML = '&#128465';
      newRemoveButton.itemId = itemId;
      newRemoveButton.id = `removeButton-${itemId}`;
      
      let newMoveUpButton = document.createElement('span');
      newMoveUpButton.classList.add('move-up-button');
      newMoveUpButton.type = 'button';
      newMoveUpButton.innerHTML = '&#8593;';
      newMoveUpButton.itemId = itemId;
      newMoveUpButton.id = `moveUpButton-${itemId}`;

      let newA = document.createElement('a');
      newA.classList.add('item-label');
      newA.innerText = item.value;
      newA.itemId = itemId;
      newA.id = `a-${itemId}`;

      newLi.appendChild(newSelect);
      newLi.appendChild(newCheckedButton);
      newLi.appendChild(newA);
      newLi.appendChild(newMoveUpButton);
      newLi.appendChild(newRemoveButton);
      newLi.appendChild(newModifyButton);

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

    // getValues();
