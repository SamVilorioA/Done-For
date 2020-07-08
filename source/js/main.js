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
    /*const opt = document.createElement('label');*/
    const opt = document.createElement('button');
    const contenedor = document.createElement('div'); //contenedor del options
    
    //list element
    list.className = 'list-container';
    list.id = `list-${numList}`;

    //title element
    hd.id =  `lt-${numList}`;
    hd.className = 'title';
    hd.textContent = `Lista #${numList}`;

    // ul element
    ul.className = 'list-ul';
    ul.id = `ul-${numList}`;

    //contenedor del dropdown
    contenedor.className = `dropdown`;
    contenedor.id = list.id;

    //option button element
    opt.className = 'options btn btn-light';
   // opt.setAttribute('data-toggle','dropdown');
    opt.type = 'button';
    opt.innerHTML = '&hellip;';
   // opt.setAttribute('aria-expanded', 'false');
    //opt.setAttribute('data-target', `#collapseDiv-${numList}`);
    //opt.setAttribute('aria-controls', `collapseDiv-${numList}`);
   // opt.innerHTML= '&hellip;';
    
    tfield.type = 'text';
    tfield.placeholder = "Introduzca tarea";
    tfield.id = `tf${numList}`;
    tfield.className = 'txtInput';

    //appending elements
    list.appendChild(hd);
    list.appendChild(contenedor);
    contenedor.appendChild(opt);
    //list.appendChild(opt);
    list.appendChild(ul);
    list.appendChild(tfield);
    lists.appendChild(list);
    
    addEventEnter(tfield.id);
    createSubMenu(numList);
    contenedor.appendChild(document.querySelector(`#dropDownDiv-${numList}`));
        
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
    tfield.className = 'titleInput';
    element.textContent = '';
    element.appendChild(tfield);
    addEventEnter(tfield.id);
}
function saveChange(p_textField)
{
    if(p_textField.value != 0)
    {
        const title = p_textField.parentElement;
        title.textContent = p_textField.value;
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
    const ul = document.createElement('ul');
    const li = document.createElement('li');
    const li_2 = document.createElement('li');
    const editB = document.createElement('label');
    const deleteB = document.createElement('label');
    
    div.className = 'subMenu';
    div.id = `dropDownDiv-${id}`;
    editB.className = 'img far fa-edit ico-menu';
    editB.id = `ed-${id}`;
    deleteB.className = 'img far fa-trash-alt ico-menu';
    deleteB.id = `del-${id}`;

    const subMenu = document.querySelector(`#list-${id}`);
    subMenu.appendChild(div);
    div.appendChild(ul);
    ul.appendChild(li);
    ul.appendChild(li_2);
    li.appendChild(editB);
    li_2.appendChild(deleteB);
    subMenu.insertBefore(div, document.querySelector(`#ul-${id}`));
    addEventClick(deleteB.id);
    addEventClick(editB.id);   
    
}