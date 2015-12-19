var descrCheckModule = (function(){
    
    //these two should be constants, but IE (no surprise) doesn't support them
    var maxDescrLength = 60;
    var timeout = 5;
    
    var description;
    var lblNumber;
    
    function init(){
        
        lblNumber = $("#addProjectSymbolNumber");
        setupListeners();
    }
    
    function resetDescritpion(){
        description = "";
        lblNumber.text("(< " + maxDescrLength + ")");
    }
    
    
    function setupListeners(){
        
        var inputMsg = $("#projectDescription");
        inputMsg.on("keypress", showLength);
        inputMsg.on("keyup", showLength);
        
        lblNumber.text("< " + maxDescrLength);
    };
    
    function keyUp(e){
        keyLog("keyUp", e, $(this));
    }
    
    function keyDown(e){
        keyLog("keyDown", e, $(this));
    }
    
    function keyPress(e){
        keyLog("keyPress", e, $(this));
    }
    
    function change(e){
        keyLog("change", e, $(this));
    }
    
    function keyLog(name, e, me){
        console.log(name);
        console.log(e.which);
        
        setTimeout(function() {
            console.log("description: ", me.val());
        }, timeout);
    }
    
    function showLength(e){
        
        var me = $(this);
        var newChar = getChar(e);
        var newDescr = description + newChar;
        console.log(newChar);
        
        if (newChar != null && newDescr.length > maxDescrLength){
            e.preventDefault();
            return;
        }
        console.log(e.which);
        
        var me = $(this);
        setTimeout(function() {
            description = me.val();
            
            if (description.length > maxDescrLength){
                description = description.substring(0, maxDescrLength);
                me.val(description);
            }
            
            lblNumber.text("< ".concat(maxDescrLength - description.length));
        }, timeout);
    }
    
    function updateDescription(e){
        e.preventDefault();
        var me = $(this);
        description = me.val();
        if(description.length > maxDescrLength){
            description = description.substring(0, maxDescrLength);
        }
        me.val(description);
    }
    
    function getChar(event) {
        if (event.which == null) { // IE
            if (event.keyCode < 32) return null; // special symbol
            return String.fromCharCode(event.keyCode)
        }

        if (event.which != 0 && event.charCode != 0) { // not IE
            if (event.which < 32) return null; // special symbol
            return String.fromCharCode(event.which); 
        }

        return null; // special symbol
    }
    
    return {
        init: init,
        resetDescription: resetDescritpion
    };
    
})();