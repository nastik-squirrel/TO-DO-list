
    document.querySelector("h2").innerText = new Date().toLocaleString().slice(0,17)
    setInterval(() => document.querySelector("h2").innerText = new Date().toLocaleString(), 60000)

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
  

    list.addEventListener('click',function(e){
      var t = e.target;
      if(t.classList.contains('checked')){
        t.classList.remove('checked');
      } else {
        t.classList.add('checked');
      }
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

    function addElement (e) {
        e.preventDefault();
        var newElement = document.createElement('li');
        // var closeButton = document.createElement('span');
        // closeButton.classList.add("closeButton");
        // closeButton.nodeType = "button";
        // closeButton.innerText = "X";
        // newElement.append(closeButton);
        newElement.innerText = item.value;
        list.appendChild(newElement);
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
