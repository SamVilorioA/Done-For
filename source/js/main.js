//Objects
let aJson = new Object();
//Esta debe ser la estructura del JSON para poder recuperar la informacion 
    /*
    let JsonLists = 
    {
        'no_list':[{'title':'list_title', 'id':'list_id','inputId':'textfieldId',
                    'tasks':[{
                        'task1':[{'id': 'task_id', 'task': 'task_content', 'completed': true||false,}],
                        'task2':[{'id': 'task_id', 'task': 'task_content', 'completed': true||false,}]
                            }]
                        }]
    }
    */

function AddList(numList = 1, p_list = {})
{
    if(!numList && !p_list) return;
    deleteElement('jumbtron');
    let lists = document.getElementById("Lists");
    let list = document.createElement("span");
    const ul = document.createElement('ul');
    const tfield = document.createElement('input');// los inputs se podrian reducir a un solo y que los demas hereden de el
    const hd = document.createElement('span');
    const opt = document.createElement('button');
    const contenedor = document.createElement('div'); //contenedor del options
    //list element
    list.className = 'list-container';
    list.id = p_list['id'] || `list-${numList}`;
    //title element
    hd.id =  p_list['titleId'] || `lt-${numList}`;
    hd.className = 'title';
    hd.textContent = p_list['title'] || 'Nueva lista';

    // ul element
    ul.className = 'list-ul';
    ul.id = p_list['ul_Id'] || `ul-${numList}`;

    //contenedor del dropdown
    contenedor.className = `dropdown`;
    contenedor.id = list.id;

    //option button element
    opt.className = 'options btn btn-light';
    opt.type = 'button';
    opt.innerHTML = '&hellip;';
    
    tfield.type = 'text';
    tfield.placeholder = "Introduzca tarea";
    tfield.id = p_list['textFieldId'] || `${list.id}-textfield`;
    tfield.className = 'txtInput';

    //appending elements
    list.appendChild(hd);
    list.appendChild(contenedor);
    contenedor.appendChild(opt);
    //list.appendChild(opt);
    list.appendChild(ul);
    list.appendChild(tfield);
    lists.appendChild(list);
    
    if(!p_list['id']) //In case the list its created
    {
        setJsonList(numList, list);
    }
    else{
        for(task in aJson[list.id]['Tasks'])
        {
            //console.table(aJson[list.id]['Tasks'][task])    
            addTask(0,aJson[list.id]['Tasks'][task], ul.id);
        }
    }    
    let no_list = aJson[list.id]['no_list'] || numList;
    addEventEnter(tfield.id);
    console.log(aJson[list.id]['no_list'] + "hola");
    createSubMenu(aJson[list.id]['no_list'] || numList);
    contenedor.appendChild(document.querySelector(`#dropDownDiv-${no_list}`));
}

function addTask(tf = undefined, p_task = {}, p_ul_id = ''){

    if(tf || tf.value || p_task['id'])
    {    
        const tUl = document.getElementById(p_ul_id) || tf.previousSibling;
        let nli = aJson[tUl.parentElement.id]['lastTaskId'] || 1; //pendiente verificar **25/07/2020 arreglado
        const lbl = document.createElement('label')
        const chkb = document.createElement('input');
        const li = document.createElement('li');
        const clb = document.createElement('label');
        // li element
        li.id = p_task['li_Id'] || `li-${tUl.id}.${nli}`;
        // checkbox element
        chkb.type = 'checkbox';
        chkb.id = p_task['chk_Id'] || `chk-${tUl.id}.${nli}`;
        chkb.className = 'checkbox';
        chkb.checked = p_task['status'] || false; //pendiente verificar **verificado 25/07/2020
        //lbl element that contains the task itself
        lbl.textContent = p_task['task'] || tf.value;
        lbl.id = `lbl-${tUl.id}.${nli}`;
        lbl.for = `${chkb.id}`;
        lbl.className = 'Task';
        //options button
        clb.innerHTML = '&times;';
        clb.className = 'taskDelete';
        clb.id = `cl-${tUl.id}.${nli}`;
        //add to the list
        li.appendChild(chkb);
        li.appendChild(lbl);
        li.appendChild(clb);
        tUl.appendChild(li);
        tf.value ='';
        addEventClick(clb.id);
        onCheckboxClick(chkb, tUl.parentElement.id, li.id);
        //last task id used in current list
        if(!p_task['id'])
            setJsonTask(++nli, li);
    }
}
function deleteElement(p_Element)
{
    const element = document.getElementById(p_Element);
    if(element != undefined)
        element.remove();
}
function editElement(p_Element)
{
    const element = document.getElementById(p_Element);
    const tfield = document.createElement('input');
    const tempText = element.textContent;
    console.log(tempText);
    tfield.type = 'text';
    tfield.id = `e_tf-${p_Element}`;
    tfield.value = element.textContent;
    /**/
    tfield.placeholder = 'Nombre de la lista';
    tfield.className = 'titleInput';
    element.textContent = '';
    element.appendChild(tfield);
    addEventEnter(tfield.id);
    tfield.onblur = function(){
        if(tfield.value < 1) tfield.value = tempText;
        saveChange(tfield);
    }
}
function saveChange(p_textField)
{
    if(p_textField.value != 0)
    {
        const title = p_textField.parentElement;
        title.textContent = p_textField.value;
        aJson[title.parentElement.id]['title'] = title.textContent;
    }
}
function addEventEnter(id){
    const element = document.getElementById(id);
    element.focus();
    element.addEventListener('keydown', function (e){
        if(e.keyCode == 13)
            if(element.id[0] === 'l') //el id empieza con el id del elemento al que pertenece
                addTask(element);
            else if(element.id[0] === 'e')
            {    
                saveChange(element);
            }
    } )
}
function addEventClick(id)
{
    const element = document.getElementById(id);
    element.addEventListener('click', function(){
            if(element.id[0] === 'c')   //para eliminar tareas individuales
            {
                const eTask = document.getElementById(element.parentElement.id);
                const lTask = document.getElementById(eTask.parentElement.parentElement.id).id;
                delete aJson[lTask]['Tasks'][eTask.id];
                deleteElement(eTask.id);
            }
            else if(element.id[0] === 'd') // para eliminar listas de tareas
            {    
                const eList = document.getElementById(element.parentElement.parentElement.parentElement.parentElement.parentElement.id).id;
                deleteElement(eList);
                delete aJson[eList];
                if(document.getElementById('Lists').childElementCount < 1) //Para mostrar mensaje en caso de que no hayan listas
                {    message(); delete aJson['lastListId'];} 
            }
            else if(element.id[0] === 'e') // para editar texto            
            {
                const lTitle = document.getElementById(element.parentElement.parentElement.parentElement.parentElement.parentElement.firstChild.id);
                editElement(lTitle.id);
            }   //modificar el selector para cuando se arregle el collapsible
        }
    )

}
function onCheckboxClick(p_Checkbox, p_list, p_li_id)
{
    p_Checkbox.addEventListener('change', function(){
        aJson[p_list]['Tasks'][p_li_id]['status'] = p_Checkbox.checked;
    })
}
//function to add a List Object
function setJsonList(p_lastListId = 0, p_List = undefined)
{
    if(p_lastListId || p_List)
    {    
        const jList = new Object();
        //filling the list object
        jList['id'] = p_List.id; jList['title'] = document.getElementById(p_List.id).querySelector('.title').textContent;
        jList['titleId'] = document.getElementById(p_List.id).querySelector('.title').id; 
        jList['textFieldId'] = document.getElementById(p_List.id).querySelector('.txtInput').id;
        jList['no_list'] = p_lastListId;
        jList['ul_Id'] = document.getElementById(p_List.id).querySelector('.list-ul').id;
        jList['lastTaskId'] = p_lastListId;
        jList['Tasks'] = {}; 
        // guardar el ultimo id usado por una lista
        aJson['lastListId'] = p_lastListId;
        aJson[jList['id']] = jList; 
    }
}
//function to add a Task Object
function setJsonTask(p_lastTaskId= 0, p_Li = undefined)
{
    if(p_Li || p_lastTaskId)
    {
        aJson[p_Li.parentElement.parentElement.id]['lastTaskId'] = p_lastTaskId;
        const jTask = new Object();
        jTask['li_Id'] = p_Li.id;
        jTask['id'] = document.getElementById(p_Li.id).querySelector('.Task').id;
        jTask['task'] = document.getElementById(p_Li.id).querySelector('.Task').textContent;
        jTask['chk_Id'] = document.getElementById(p_Li.id).querySelector('.checkbox').id;
        jTask['status'] = document.getElementById(p_Li.id).querySelector('.checkbox').checked;
        jTask['del_id'] = document.getElementById(p_Li.id).querySelector('.taskDelete').id;
        aJson[p_Li.parentElement.parentElement.id]['Tasks'][p_Li.id] = jTask;
    }
}
function load(){
    getData();
    let nList = aJson['lastListId'] || 0;
    if(nList == 0)
        message();
    const add = document.getElementById("add");
    const save = document.getElementById('save')
    add.addEventListener("click", function(){AddList(++nList)});
    save.addEventListener('click', saveData);
}
//function to save the data to localstorage
function saveData(){
    if(!Object.keys(aJson).length) localStorage.removeItem('Data');
    localStorage.setItem('Data', JSON.stringify(aJson) || null);
}
//function to retrieve the data
function getData()
{
    //const no_lists = parseInt(localStorage.getItem('LastListId')); //contar la cantidad de listas que hay almacenadas
    /*
        En esta funcion se verificara la existencia de data en el localstorage del cliente para asi crear
        o recrear las listas ya definidas por el usuario
    */
   if(!localStorage.length)
    {
        console.log('No hay datos guardados');
    }
   const data = localStorage.getItem('Data') || 0;
   if(!data.length){return null}; // in case theres no data
   aJson = JSON.parse(data);
   console.table(aJson);
   let lista = 0
   Object.keys(aJson).forEach(function(list)
   {    
       if(list == 'lastListId'){}
       else
        AddList(aJson[list]['no_list'], aJson[list]);
   })
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

function message()
{
    const container = document.getElementById('Lists');
    const jtron = document.createElement('div');
    const h1 = document.createElement('h1');
    const p = document.createElement('p');
    //jumbotron element
    jtron.id = 'jumbtron';
    jtron.className = 'jumbotron jumbo';
    //h1 element
    h1.className = 'welcome';
    h1.textContent = 'Bienvenido!';
    //p element
    p.className = 'subtitulo';
    p.innerHTML = 'No hay Listas <br>Hacer click en "Agregar Lista"';

    //appending
    jtron.appendChild(h1);
    jtron.appendChild(p);
    container.appendChild(jtron);
}