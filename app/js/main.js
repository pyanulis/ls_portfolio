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
                        hideAllQTips();
                   }
        });
    };
    
    var closePopup = function(e){
        console.log("popup close");
        e.preventDefault();
        
        clearAddProjectForm();
        hideAllQTips();
        $("#add-project-popup").bPopup().close();
    };
    
    var clearAddProjectForm = function(){
        formAddProject[0].reset();
        var inputs = formAddProject.find(addProjectFilter);
        
        inputs.each(function(index){
            clearError($(this));
        });
    }
    
    var hideAllQTips = function(){
        $("[id^=qtip]").hide();
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
            file_name = inputImage.val().replace("C:\\fakepath\\","");

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
        
        //$.each(inputs, function(index, elem){
        inputs.each(function(index){
            var item = $(this);
            
            if (!item.val()){
                
                success = false;
                
                item.addClass(errorClassName);
                item.on("input", removeErrorClass);
                
                createQtip(item, "qtip-content");
            }else if(item.attr("data-inputEmail") === "true" && !checkEmailFormat(item.val())){
                
                item.addClass(errorClassName);
                item.on("input", removeErrorClass);
                createQtip(item, "qtip-wrongEmailFormat");
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
        
        hideAllQTips();
        
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
    
    var createQtip = function(element, contentTextAttr){
        // position init
        var position = element.attr("qtip-position");
        var contText = element.attr(contentTextAttr);
        
        if (position === "right"){
            
            position = {
                my: "left center",
                at: "right center"
            }
            
        }else{
            
            position = {
                my: "right center",
                at: "left center",
                adjust: {
                    method: "shift none"
                }
            }
        }
        
        //element init
        
        var qtipSettings = {
            content: {
                text: contText
            },
            show: {
                event: "show"
            },
            hide: {
                event: "keydown hideTooltip"
            },
            position: position,
            style: {
                classes: "qtip-custom",
                tip : {
                    height: 10,
                    width: 16
                }
            }
        };
        
        element.qtip(qtipSettings).trigger("show");
    }
    
    var checkEmailFormat = function(email) {
        
        var atIndex = email.indexOf("@");
        //@ symbol must be in the string but not the first
        var correct = atIndex > 0;
        
        console.log("atIndex: " + atIndex);
        
        // . must be after @ and not the last
        correct = correct && email.indexOf(".", atIndex + 1) > -1 && email.indexOf(".", atIndex + 1) < email.length - 1;
        
        return correct;
    }
    
    return {
        init: function(){
            setupListeners();
        }
    };
    
})();