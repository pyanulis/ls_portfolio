$(document).ready(function(){
    
    /*Modernizr*/
    if (!Modernizr.input.placeholder) {
        $("input, textarea").placeholder();
    }
    
    mainModule.init();
});

var mainModule = (function(){
    
    var errorClassName = "inputError";
    var formAddProject = $("#formAddProjectId");
    var formContactMe = $("#formContactMeId");
    var validateFailed = false;
    
    var addProjectFilter = "input[name=projectTitle], input[name=projectImagePath], input[name=projectUrl], textarea[name=projectDescription]";
    
    var sendMessageFilter = "input[name=senderName], input[name=senderEmail], input[name=senderCapcha], textarea[name=senderMessage]";
    
    var inputImage = $("#imageUpload");
    
    var setupListeners = function(){
        $("#add-project-link").on("click", showAddProjectPopup);
        
        //$(".icoClose").on("click", closePopup);
        
        inputImage.on("change", uploadChange);
        
        formAddProject.on("submit", {filter: addProjectFilter}, checkFormInput);
        formContactMe.on("submit", {filter: sendMessageFilter}, checkFormInput);
        formContactMe.on("reset", {filter: sendMessageFilter}, resetForm);
    };
    
    var showAddProjectPopup = function(e){
        console.log("popup call");
        e.preventDefault();
        $("#add-project-popup").bPopup({
            onClose: function(){
                        console.log('closed');
                        clearAddProjectForm();
                   }
        });
    };
    
    var closePopup = function(e){
        console.log("popup close");
        e.preventDefault();
        
        clearAddProjectForm();
        $("#add-project-popup").bPopup().close();
    };
    
    var clearAddProjectForm = function(){
        formAddProject[0].reset();
        var inputs = formAddProject.find(addProjectFilter);
        
        inputs.each(function(index){
            clearError($(this));
        });
    }
    
    var uploadChange = function(){
        console.log("image upload");
        
        var file_api = window.File && window.FileReader && window.FileList && window.Blob;
        var file_name;
        var inputImagePath = $("#imageFilePath");
        
        console.log(file_api);
        
        if(file_api && inputImage[0].files[0]) 
            file_name = inputImage[0].files[0].name;
        else
            file_name = inputImage.val();

        console.log(file_name);
        
        if(!file_name.length)
            return;
        
        inputImagePath.val(file_name);
    };
    
    var preventSubmitAddProject = true;
    
    var checkFormInput = function(e){
        
        if (!preventSubmitAddProject){
            console.log("submit triggered");
            
            preventSubmitAddProject = true;
            return;   
        }
        
        console.log("submit validation");
        e.preventDefault();
        
        var form = $(this);
        
        console.log(e.data.filter);
        var inputs = form.find(e.data.filter);
        
        var success = true;
        inputs.each(function(index){
            
            var item = $(this);
            
            if (!item.val()){
                
                success = false;
                
                item.addClass(errorClassName);
                item.on("input", removeErrorClass);
                
                validateFailed = true;
                
                /* doesn't work yet */
                /*var tooltipObject = {
                    content: 'I am positioned using corner values!',
                    show: {
                        ready: true
                    }
                };
                console.log(tooltipObject);
                
                item.qtip(tooltipObject);*/
            }
        });
        
        if (success) {
            console.log("triggering submit on succeeded validation");
            
            preventSubmitAddProject = false;
            form.trigger("submit");
        }
    }
    
    var resetForm = function(e){
        
        console.log("reset form");
        
        var form = $(this);
        
        console.log(e.data.filter);
        var inputs = form.find(e.data.filter);
        
        inputs.each(function(index){
            
            var item = $(this);
            
            clearError(item);
        });
    }
    
    var removeErrorClass = function(){
        console.log("item change");
        var item = $(this);
        
        clearError(item);
    }
    
    var clearError = function(item){
        item.removeClass(errorClassName);
        item.off("input", removeErrorClass);
    }
    
    return {
        init: function(){
            setupListeners();
        }
    };
    
})();