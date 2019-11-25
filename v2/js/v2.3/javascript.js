function openModal(categoryId){
    document.querySelector(".modal").style.display = "block";
    var modalContent = document.querySelector(".modal-content");
    if(categoryId == "am"){
        modalContent.innerHTML = "<object class='modal-object' type='text/html' data='artwork_manufacturing.html'></object>";
    }else if(categoryId == "ve"){
        modalContent.innerHTML = "<object class='modal-object' type='text/html' data='video_editing.html'></object>";
    }else if(categoryId == "wp"){
        modalContent.innerHTML = "<object class='modal-object' type='text/html' data='website_productions.html'></object>";
    }else if(categoryId == "dm"){
        modalContent.innerHTML = "<object class='modal-object' type='text/html' data='digital_marketing.html'></object>";
    }else if(categoryId == "rp"){
        modalContent.innerHTML = "<object class='modal-object' type='text/html' data='research_presentations.html'></object>";
    }else if(categoryId == "tm"){
        modalContent.innerHTML = "<object class='modal-object' type='text/html' data='3d_modeling.html'></object>";
    }else{      
    };
};
function closeModal(){
    document.querySelector(".modal").style.display = "none";
};