var taskInput=document.getElementById("new-task");
var addButton=document.getElementsByTagName("button")[0];
var incompleteTaskHolder=document.getElementById("incomplete-task");
var completeTaskHolder=document.getElementById("completed-tasks");


var createNew=function(taskString){
    var listItem=document.createElement("li");
    var checkbox=document.createElement("input");
    var label=document.createElement("label");
    var editInput=document.createElement("input");
    var editButton=document.createElement("button");
    var deleteButton=document.createElement("button");
    label.innerText=taskString;
    checkbox.type="checkbox";
    editInput.type="text"
    editButton.className="edit";
    deleteButton.className="delete";
    editButton.innerText="edit";
    deleteButton.innerText="delete";
    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;


}
var addTask=function(){
    var listItem=createNew(taskInput.value);
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
    taskInput.value="";
}
//edit an existing task

var editTask=function(){
    var listItem=this.parentNode;
    var editInput=listItem.querySelector('input[type=text]');
    var label=listItem.querySelector("label");
    var containClass=listItem.classList.contains("editMode");
    if(containClass){
        label.innerText=editInput.value;
    }
    else{
        editInput.value=label.innerText;
    }
    listItem.classList.toggle("editMode");
}
//remove list
var deleteTask=function(){
    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    ul.removeChild(listItem);
}
//mark list completed
var taskCompleted=function(){
    var listItem=this.parentNode;
    completeTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskIncomplete);
}
var taskIncomplete=function(){
    var listItem=this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}
var ajaxRequest=function(){
    console.log("AJAX Request");
}
    addButton.onclick=addTask;
    //addButton.addEventListener("click",addTask);
    addButton.addEventListener("click",ajaxRequest);
var bindTaskEvents=function(taskListItem,checkboxEventHandler){
    var checkbox=taskListItem.querySelector("input[type=checkbox]");
    var editButton=taskListItem.querySelector("button.edit");
    var deleteButton=taskListItem.querySelector("button.delete");
    editButton.onclick=editTask;
    deleteButton.onclick=deleteTask;
    checkbox.onchange=checkboxEventHandler;
}
for(var i=0;i<incompleteTaskHolder.children.length;i++){
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}
for(var i=0;i<completeTaskHolder.children.length;i++){
    bindTaskEvents(completeTaskHolder.children[i],taskIncomplete);
}