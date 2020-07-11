
    document.querySelector("h2").innerText = new Date().toLocaleString().slice(0,17)
    setInterval(() => document.querySelector("h2").innerText = new Date().toLocaleString(), 60000)

    // let dateTime = new Date().toLocaleString();
    // document.querySelector("h2").innerText = dateTime;

    let list = document.querySelector('#todo-list'),
        form = document.querySelector('#form'),
        item = document.querySelector('#item');
    
    form.addEventListener('submit', addItem, false);
 
    // form.addEventListener('submit',function(e){
    //     e.preventDefault();
    //     list.innerHTML += '<li>' + item.value + '</li>';
    //     store();
    //     item.value = "";
    //   },false)
  

    // list.addEventListener('click',function(e){
    //   var t = e.target;
    //   if(t.classList.contains('checked')){
    //     t.classList.remove('checked');
    //   } else {
    //     t.classList.add('checked');
    //   }
    //   store();
    // },false)

    // list.addEventListener('dblclick',function(e){
    //     var t = e.target;
    //     if(t.classList.contains('checked')){
    //       t.parentNode.removeChild(t);
    //     }
    //     store();
    //   },false)

{/* <span id="closePopupButton" type="button">X</span> */}

    function removeItem (e) {
      e.target.parentNode.remove()
    }

    function toggleChecked (e) {
      let parent = e.target.parentNode    
      
      if (parent.classList.contains('checked')) {
        parent.classList.remove('checked');  
        document.getElementById(`checkedButton-${parent.id}`).innerHTML = '&#9633';
        document.getElementById(`a-${parent.id}`).classList.remove('checked');
      } else {
        parent.classList.add('checked');  
        document.getElementById(`checkedButton-${parent.id}`).innerHTML = '&#10003';
        document.getElementById(`a-${parent.id}`).classList.add('checked');
      }
    }

    function changeItem (e) {
      if (e.target.parentNode.classList.contains('todo-list')) {
        targetId = e.target.id;
      } else targetId = e.target.parentNode.id   
      
      let target = document.getElementById(`a-${targetId}`);

      let answer = prompt('Change ToDo item:', target.innerHTML);
      if (answer) {
        target.innerHTML = answer
      }
    }

    function addItem (e) {

      e.preventDefault();

      let itemId = new Date().getTime();
      let colors = ['red', 'yellow', 'green', 'blue', 'gray']
      
      let newLi = document.createElement('li');
      newLi.classList.add('todo-task');
      // newLi.onclick = toggleChecked;
      newLi.ondblclick = changeItem;
      newLi.id = itemId;

      let newSelect = document.createElement('select');
      newSelect.classList.add('color-select');
      newSelect.onchange = changeColor;
      newSelect.id = `select-${itemId}`

      for (let i in colors) {
        let newOption = document.createElement('option');
        newOption.classList.add(colors[i]);
        newSelect.appendChild(newOption);
      }

      let newCheckedButton = document.createElement('span');
      newCheckedButton.classList.add('checked-button');
      newCheckedButton.type = 'button';
      newCheckedButton.innerHTML = '&#9633';
      newCheckedButton.onclick = toggleChecked;
      newCheckedButton.id = `checkedButton-${itemId}`;

      let newRemoveButton = document.createElement('span');
      newRemoveButton.classList.add('remove-button');
      newRemoveButton.type = 'button';
      newRemoveButton.innerHTML = '&#128465';
      newRemoveButton.onclick = removeItem;
      newRemoveButton.id = `removeButton-${itemId}`;
      
      let newA = document.createElement('a');
      newA.classList.add('item-label');
      newA.innerText = item.value;
      newA.onclick = toggleChecked;
      newA.id = `a-${itemId}`;

      newLi.appendChild(newSelect);
      newLi.appendChild(newCheckedButton);
      newLi.appendChild(newA);
      newLi.appendChild(newRemoveButton);

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

    function changeColor(e) {
      e.target.classList.remove(...e.target.classList);
      e.target.classList.add(e.target.options[e.target.selectedIndex].classList[0]);
    }

    // getValues();
