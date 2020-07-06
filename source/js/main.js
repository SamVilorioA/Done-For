function AddList(numList = 1)
{
    let lists = document.getElementById("Lists");
    let list = document.createElement("span");
    const ul = document.createElement('ul');
    const li = document.createElement('li');
    const tfield = document.createElement('input');// los inputs se podrian reducir a un solo y que los demas hereden de el
    const chField = document.createElement('input');
    const lbl = document.createElement('label');
    const hd = document.createElement('span');
    const opt = document.createElement('label');
    //list element
    list.className = 'list-container';
    list.id = `list-${numList}`;
    //title element
    hd.id =  `lt-${numList}`;
    hd.textContent = `Lista #${numList}`;
    // ul element
    ul.className = 'list-ul';
    ul.id = `ul-${numList}`;
    //option button element
    opt.className = 'options';
    opt.innerHTML= '&hellip;';// '<i class="fas fa-ellipsis-h"></i>';
    //opt.onclick = function(){this.parentNode.style.display = 'none';}
    //textfield element
    tfield.type = 'text';
    tfield.placeholder = "Introduzca tarea";
    tfield.id = `tf${numList}`;
    tfield.className = 'txtInput';
    //appending elements
    list.appendChild(hd);
    list.appendChild(opt);
    list.appendChild(ul);
    list.appendChild(tfield);
    lists.appendChild(list);
    addEventEnter(tfield.id);
    opt.addEventListener('click',createSubMenu(numList));
}

function addTask(tf){
    if(tf.value != 0)
    {    
        const tList = tf.previousSibling;
        const idParent = tList.id;
        let nli = (tList.getElementsByTagName('li').length + 1);
        const lbl = document.createElement('label')
        const chkb = document.createElement('input');
        const li = document.createElement('li');
        const clb = document.createElement('label');
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
        clb.innerHTML = '&times;'; //'<i class="fas fa-times"></i>'
        clb.className = 'taskDelete';
        clb.id = `cl-${idParent}.${nli}`;
        //add to the list
        li.appendChild(chkb);
        li.appendChild(lbl);
        li.appendChild(clb);
        tList.appendChild(li);
        tf.value ='';
        addEventClick(clb.id);
    }
}

function deleteElement(p_Element)
{
    const element = document.getElementById(p_Element);
    element.remove();
}
function editElement(p_Element)
{
    const element = document.getElementById(p_Element);
    const tfield = document.createElement('input');
    tfield.type = 'text';
    tfield.id = `e_tf-${p_Element}`;
    tfield.placeholder = 'Nombre de la lista';
    tfield.value = element.textContent;
    element.textContent = '';
    element.appendChild(tfield);
    addEventEnter(tfield.id);
}
function saveChange(tf)
{
    if(tf.value != 0)
    {
        const title = tf.parentElement;
        title.textContent = tf.value;
        //tf.remove();
    }
}

function addEventEnter(id){
    const element = document.getElementById(id);
    element.addEventListener('keydown', function (e){
        if(e.keyCode == 13)
            if(element.id[0] === 't')
                addTask(element);
            else if(element.id[0] === 'e')
                saveChange(element);
    } )
}

function addEventClick(id)
{
    const element = document.getElementById(id);
    element.addEventListener('click', function(e){
            if(element.id[0] === 'c')   //para eliminar tareas individuales
                deleteElement(element.parentElement.id);
            else if(element.id[0] === 'd') // para eliminar listas de tareas
                deleteElement(element.parentElement.parentElement.id);
            else if(element.id[0] === 'e') // para editar texto
                editElement(element.parentElement.parentElement.firstChild.id);
                //modificar el selector para cuando se arregle el collapsible
        }
    )
}

function load(){
    const add = document.getElementById("add");
    let nList = 0;
    add.addEventListener("click", function(){AddList(++nList)});
}

function createSubMenu(id){
    const div = document.createElement('div');
    const editB = document.createElement('label');
    const deleteB = document.createElement('label');
    div.className = 'subMenu';
    editB.className = 'img far fa-edit ico-menu';
    editB.id = `ed-${id}`;
    deleteB.className = 'img far fa-trash-alt ico-menu';
    deleteB.id = `del-${id}`;

    const subMenu = document.querySelector(`#list-${id}`);
    subMenu.appendChild(div);
    div.appendChild(editB);
    div.appendChild(deleteB);
    subMenu.insertBefore(div, document.querySelector(`#ul-${id}`));
    addEventClick(deleteB.id);
    addEventClick(editB.id);
}