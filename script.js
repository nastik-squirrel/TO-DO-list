
    document.querySelector("h2").innerText = new Date().toLocaleString().slice(0,17)
    setInterval(() => document.querySelector("h2").innerText = new Date().toLocaleString(), 1000)

    // let dateTime = new Date().toLocaleString();
    // document.querySelector("h2").innerText = dateTime;

    var list = document.querySelector('#list'),
        form = document.querySelector('form'),
        item = document.querySelector('#item');
    
    form.addEventListener('submit', addElement, false)
 
    // form.addEventListener('submit',function(e){
    //     e.preventDefault();
    //     list.innerHTML += '<li>' + item.value + '</li>';
    //     store();
    //     item.value = "";
    //   },false)
  
    function reverseChecked(target){
      if(target.classList.contains('checked')){
        target.classList.remove('checked');
      } else {
        target.classList.add('checked');
      }
    }

    function modifyElement(target){
      var newElement = document.createElement('li');
      newElement.innerText = item.value;
      list.appendChild(newElement);
      store();
      item.value = "";
    }

    list.addEventListener('click',function(e){
      reverseChecked(e.target)
      store();
    },false)

    list.addEventListener('dblclick',function(e){
        var t = e.target;
        if(t.classList.contains('checked')){
          t.parentNode.removeChild(t);
        }
        store();
      },false)

{/* <span id="closePopupButton" type="button">X</span> */}

    function createNewTodoItem (text) {
      var todoItem = document.createElement('li');
      todoItem.innerText = text;
      // todoItem.className = "todo-task";
      // var span = document.createElement('span');
      // span.className = "task-title";
      // span.innerText = text;
      // var completed = document.createElement('a');
      // completed.className = 'button toggle-complete';
      // completed.href = "#";
      // var info1 = document.createElement('i');
      // info1.className = 'fas fa-check'
      // completed.append(info1);
      // var remove = document.createElement('a');
      // remove.className = 'button remove';
      // remove.href = "#";
      // var info2 = document.createElement('i');
      // info2.className = 'fas fa-trash'
      // remove.append(info2);
      // todoItem.appendChild(span);
      // todoItem.appendChild(completed);
      // todoItem.appendChild(remove);
      return todoItem
    }

    function addElement (e) {
        e.preventDefault();
        list.appendChild(createNewTodoItem(item.value));
        // var newElement = document.createElement('li');
        // var closeButton = document.createElement('span');
        // closeButton.classList.add("closeButton");
        // closeButton.nodeType = "button";
        // closeButton.innerText = "X";
        // newElement.append(closeButton);
        
        // newElement.innerText = item.value;
        // list.appendChild(newElement);
        // list.innerHTML += '<li>' + item.value + '</li>';
        store();
        item.value = "";
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
    getValues();
