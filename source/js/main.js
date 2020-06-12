function AddList(numList = 1)
{
    let lists = document.getElementById("Lists");
    let list = document.createElement("span");
    const ul = document.createElement('ul');
    const li = document.createElement('li');
    const tfield = document.createElement('input');
    const chField = document.createElement('input');
    const lbl = document.createElement('label');
    //list element
    list.className = "lista"+numList;
    list.textContent = "Lista #"+numList;
    // ul element
    ul.className = "ul"+numList;
    //li element
    li.className ="li1";
    //textfield element
    tfield.type = 'type';
    tfield.placeholder = "Introduzca tarea";
    //checkbox element
    chField.type = 'checkbox';
    chField.id= 'ch1';
    chField.value = 'tarea1';
    //label element
    lbl.textContent = 'Tarea #1 ';
    lbl.for = 'ch1';
    //appending the elements
    li.appendChild(lbl);
    li.appendChild(chField);
    li.appendChild(document.createElement('br'));
    li.appendChild(tfield);
    ul.appendChild(li);
    list.appendChild(ul);
    lists.appendChild(list);
    //list.innerHTML += "<li><input type='text' placeholder='Introduzca tarea y presione enter'></li>";
    //lists.appendChild(list);
    //alert(  `Funciona ${numList}` );
}

function load(){
    const add = document.getElementById("add");
    let nList = 0;
    //add.onclick(AddList(++nList));
    add.addEventListener("click", function(){AddList(++nList)});
}