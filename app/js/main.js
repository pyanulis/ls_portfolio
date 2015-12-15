$(document).ready(function(){
    if (!Modernizr.input.placeholder) {
        $("input, textarea").placeholder();
    }
});

var myModule = (function(){
    
    var init = function(){
        setupListeners();
    };
    
    var setupListeners = function(){
        $("#add-project-link").on("click", showAddProjectPopup);
    };
    
    var showAddProjectPopup = function(e){
        console.log("popup call");
        e.preventDefault();
        $("#add-project-popup").bPopup();
    };
    
    return {
        init: init
    };
    
})();

myModule.init();