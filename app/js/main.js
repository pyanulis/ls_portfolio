$(document).ready(function(){
    
    // placeholders for IE
    if (!Modernizr.input.placeholder) {
        $("input, textarea").placeholder();
    }
    
    descrCheckModule.init();
    validator.init();
    
});