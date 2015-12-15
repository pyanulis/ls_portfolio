$(document).ready(function(){
    if (!Modernizr.input.placeholder) {
        $("input, textarea").placeholder();
    }
});

var myModule = (function(){
    
    var init = function(){
        setupListeners();
    };
    
    var inputImage = $("#imageUpload");
    
    var setupListeners = function(){
        $("#add-project-link").on("click", showAddProjectPopup);
        
        $(".icoClose").on("click", closePopup);
        
        inputImage.on("change", uploadChange);
    };
    
    var showAddProjectPopup = function(e){
        console.log("popup call");
        e.preventDefault();
        $("#add-project-popup").bPopup();
    };
    
    var closePopup = function(e){
        console.log("popup close");
        e.preventDefault();
        $("#add-project-popup").bPopup().close();
    };
    
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
    
    return {
        init: init
    };
    
})();

myModule.init();