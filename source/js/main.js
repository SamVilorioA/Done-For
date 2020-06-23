function AddList(numList = 1)
{
    let lists = document.getElementById("Lists");
    let list = document.createElement("span");
    const ul = document.createElement('ul');
    const li = document.createElement('li');
    const tfield = document.createElement('input');
    const chField = document.createElement('input');
    const lbl = document.createElement('label');
    const hd = document.createElement('span');
    const opt = document.createElement('label');
    //list element
    list.className = 'list-container';
    list.id = `list-${numList}`;
    //h5 element
    hd.textContent = 'Lista #'+numList;
    // ul element
    ul.className = 'list-ul';
    ul.id = 'ul'+numList;
    //option button element
    opt.className = 'options';
    opt.innerHTML= '&hellip;';
    //opt.onclick = function(){this.parentNode.style.display = 'none';}
    //textfield element
    tfield.type = 'type';
    tfield.placeholder = "Introduzca tarea";
    tfield.id = 'tf'+numList;
    tfield.className = 'txtInput';
    list.appendChild(hd);
    list.appendChild(opt);
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
    const opts = document.createElement('label');
    // li element
    li.id = `li-${idParent}.${nli}`;
    // checkbox element
    chkb.type = 'checkbox';
    chkb.id = `chk-${idParent}.${nli}`;
    chkb.className = 'checkbox';
    //lbl element 
    lbl.textContent = tf.value;
    lbl.id = `lbl-${idParent}.${nli}`;
    lbl.for = `${chkb.id}`;
    //options button
    opts.innerHTML = '&hellip;';
    opts.className = 'taskOptions';
    //erasebtn.onclick = function(){this.parentNode.style.display = 'none';};
    //add to the list
    li.appendChild(chkb);
    li.appendChild(lbl);
    li.appendChild(opts);
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