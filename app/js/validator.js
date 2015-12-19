var validator = (function(){
    
    var errorClassName;
    var formAddProject;
    var formContactMe;
    var addProjectFilter;
    var sendMessageFilter;
    var inputImage;
    
    function init(){
        errorClassName = "inputError";
        formAddProject = $("#formAddProjectId");
        formContactMe = $("#formContactMeId");

        addProjectFilter = "input[name=projectTitle], input[name=projectImagePath], input[name=projectUrl], textarea[name=projectDescription]";

        sendMessageFilter = "input[name=senderName], input[name=senderEmail], input[name=senderCapcha], textarea[name=senderMessage]";

        inputImage = $("#imageUpload");
        
        setupListeners();
    }
    
    function setupListeners(){
        $("#add-project-link").on("click", showAddProjectPopup);
        
        //$(".icoClose").on("click", closePopup);
        
        inputImage.on("change", uploadChange);
        
        formAddProject.on("submit", {filter: addProjectFilter}, checkFormInput);
        formContactMe.on("submit", {filter: sendMessageFilter}, checkFormInput);
        formContactMe.on("reset", {filter: sendMessageFilter}, resetForm);
    };
    
    function showAddProjectPopup(e){
        console.log("popup call");
        e.preventDefault();
        
        descrCheckModule.resetDescription();
        
        $("#add-project-popup").bPopup({
            onClose: function(){
                        console.log('closed');
                        clearAddProjectForm();
                        hideAllQTips();
                   }
        });
    };
    
    function closePopup(e){
        console.log("popup close");
        e.preventDefault();
        
        clearAddProjectForm();
        hideAllQTips();
        $("#add-project-popup").bPopup().close();
    };
    
    function clearAddProjectForm(){
        formAddProject[0].reset();
        
        var inputs = formAddProject.find(addProjectFilter);
        
        inputs.each(function(index){
            clearError($(this));
        });
    }
    
    function hideAllQTips(){
        $("[id^=qtip]").hide();
    }
    
    function uploadChange(){
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
        
        clearError(inputImagePath);
        inputImagePath.val(file_name);
    };
    
    var preventSubmitAddProject = true;
    
    function checkFormInput(e){
        
        // check triggering from this function
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
                setError(item, "data-qtip-content");
                
            }else if(item.attr("data-inputEmail") === "true" && !checkEmailFormat(item.val())){
                
                success = false;
                setError(item, "data-qtip-wrongEmailFormat");
            }
          });
        
        if (success) {
            console.log("triggering submit on succeeded validation");
            
            preventSubmitAddProject = false;
            form.trigger("submit");
        }
    }
    
    // set error style to an input
    // textAttr - attr name for content
    function setError(input, textAttr) {
        
        input.addClass(errorClassName);
        input.on("keydown", removeErrorClass);
        createQtip(input, textAttr);
    }
    
    function resetForm(e){
        
        console.log("reset form");
        
        hideAllQTips();
        
        var form = $(this);
        
        var inputs = form.find(e.data.filter);
        
        inputs.each(function(index){
            
            var item = $(this);
            
            clearError(item);
        });
    }
    
    function removeErrorClass(){
        
        var item = $(this);
        
        clearError(item);
    }
    
    function clearError(item){
        item.removeClass(errorClassName);
        item.off("keydown", removeErrorClass);
        
        var qtipId = "qtip-" + item.attr("name");
        $("[id^=" + qtipId + "]").hide();
    }
    
    function createQtip(element, contentTextAttr){
        // position init
        var position = element.attr("data-qtip-position");
        var contText = element.attr(contentTextAttr);
        var tipId = element.attr("name");
        
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
            id: tipId,
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
    
    function checkEmailFormat(email) {
        
        var atIndex = email.indexOf("@");
        //@ symbol must be in the string but not the first
        var correct = atIndex > 0;
        
        console.log("atIndex: " + atIndex);
        
        // . must be after @ and not the last
        correct = correct && email.indexOf(".", atIndex + 1) > -1 && email.indexOf(".", atIndex + 1) < email.length - 1;
        
        return correct;
    }
    
    return {
        init: init
    };
    
})();