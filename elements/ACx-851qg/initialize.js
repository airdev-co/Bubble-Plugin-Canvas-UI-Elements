function(instance, context) {
    
        
initialize();
    
    
function initialize() {

    const getID = () => {
        return Math.floor((1 + Math.random()) * 10000).toString(16).substring(1);
    }

    instance.data.id = "airdev" + getID();
        
    $(instance.canvas).addClass('airdev-pills-container');
    $(instance.canvas).css('overflow','visible!important');
    
    function clearSelected() {
        instance.data.is_checked = false;
    }
    
    instance.data.clearSelected = clearSelected
}
    

}