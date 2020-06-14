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
    ul.className = 'list-ul';
    ul.id = 'ul'+numList;
    //li element
    //li.className ="li1";
    //textfield element
    tfield.type = 'type';
    tfield.placeholder = "Introduzca tarea";
    tfield.id = 'tf'+numList;
    tfield.className = 'txtInput';
    /*/checkbox element
    chField.type = 'checkbox';
    chField.id= 'ch1';
    chField.value = 'tarea1';
    //label element
    lbl.textContent = 'Tarea #1 ';
    lbl.for = 'ch1';
    //appending the elements
    li.appendChild(lbl);
    li.appendChild(chField);
    //li.appendChild(document.createElement('br'));
    ul.appendChild(li);*/
    list.appendChild(ul);
    list.appendChild(tfield);
    lists.appendChild(list);
    addEventEnter(tfield.id);
}

function addTask(tf){
    const tList = tf.previousSibling;
    const idParent = tList.id;
    let nli = (tList.getElementsByTagName('li').length + 1);
    const lbl = document.createElement('label')
    const chkb = document.createElement('input');
    const li = document.createElement('li');
    // li element
    li.id = `li-${idParent}.${nli}`;
    // checkbox element
    chkb.type = 'checkbox';
    chkb.id = `chk-${idParent}.${nli}`;
    //label element 
    lbl.textContent = tf.value;
    lbl.id = `lbl-${idParent}.${nli}`;
    lbl.for = chkb.id;
    //add to the list
    li.appendChild(chkb);
    li.appendChild(lbl);
    tList.appendChild(li);
    tf.value ='';
}
function addEventEnter(id){
    const tf = document.getElementById(id);
    tf.addEventListener('keydown', function (e){
        if(e.keyCode == 13)
            addTask(tf);
    } )
}

function load(){
    const add = document.getElementById("add");
    let nList = 0;
    add.addEventListener("click", function(){AddList(++nList)});    
}