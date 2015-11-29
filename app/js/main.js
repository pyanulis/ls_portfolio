$(function(){
    console.log("js loaded");
    
    var classMenuSelected = "menuItemSelected";
    var prevMenuSelected = $("." + classMenuSelected)[0];
    var prevent = true;
    
    $(".menuItem").on("click", function(e){
        
        if (!prevent){
            console.log("trigger");
            prevent = true;
            return;   
        }
        
        e.preventDefault();
        
        console.log("custom");
        
        var il = e.currentTarget;
        
        $(il).toggleClass(classMenuSelected);
        
        if (prevMenuSelected){
            $(prevMenuSelected).toggleClass(classMenuSelected);
        }
        
        prevMenuSelected = il;
        
        var a = $(il).children()[0];
        
        prevent = false;
        $(a).trigger("click");
    })
});