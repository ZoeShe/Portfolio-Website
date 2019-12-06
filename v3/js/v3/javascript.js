var menu = document.querySelectorAll(".nav-item");
var subMenu = document.querySelectorAll(".sub-nav-item");
var modalContent = document.querySelector("#modal-content");
var projectModalContent = document.querySelector("#project-modal-content");

function openModal(){
    document.querySelector(".modal").style.display = "block";

    for(var i = 0; i < menu.length; i++){
        modalContent.innerHTML += menu[i].innerHTML + subMenu[i].innerHTML;
    };
};


function closeModal(){
    document.querySelector(".modal").style.display = "none";
}


function openProject(projectId){
    document.querySelector(".project-modal").style.display = "block";

    if(projectId == "happy"){
        projectModalContent.innerHTML = "<object class='project-object' type='text/html' data='happy.html'></object>";
    }else if(projectId == "roland"){
        projectModalContent.innerHTML = "<object class='project-object' type='text/html' data='roland.html'></object>";
    }else if(projectId == "rebag"){
        projectModalContent.innerHTML = "<object class='project-object' type='text/html' data='rebag.html'></object>";
    }
};

function closeProject(){
    document.querySelector(".project-modal").style.display = "none";
}