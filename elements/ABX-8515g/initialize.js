function(instance, context) {
    
        
initialize();
    
    
function initialize() {

    const getID = () => {
        return Math.floor((1 + Math.random()) * 10000).toString(16).substring(1);
    }

    instance.data.id = "airdev" + getID();
        
    $(instance.canvas).addClass('airdev-pills-container');
    $(instance.canvas).css('overflow','visible!important');
}
    
    const canvasId = instance.data.id;
    
    instance.data.selected = [];
    instance.data.update_count = [];
    
    
    // ELEMENT FUNCTION =====================================
    
    // Constructor for Option object
    
    function Option(text, id, value) {		

        this.text = text;
        this.id = id;
        this.value = value;

    }
    
    instance.data.Option = Option;
    
    // Publish selected items

    function publishAllSelected() {

        let allSelected = [];

        $(`#${canvasId} .airdev-pill-selected`).each(function () {

            allSelected.push($(this).attr('value'))

        });

        instance.publishState('current_values', allSelected);
        instance.data.selected = allSelected;

    }
    
    instance.data.publishAllSelected = publishAllSelected;
    
    // Publish deselected_value 
    
    function publishDeselected(value) {
        
        instance.publishState('deselected_value', value) 	// Publish Deselected Value
        
        instance.triggerEvent('is_deselected')
    }
    
    instance.data.publishDeselected = publishDeselected;
    
    // Publish selected value 
    
    function publishSelected(value) {

      	instance.publishState('selected_value', value) // Publish Selected Value

  	    instance.triggerEvent('is_selected')
    }
    
    instance.data.publishSelected = publishSelected;
    
    
	// Find items by Id
    
    function findItemById(item) {

        return item.value.toString() == this.toString()

    }
    
    instance.data.findItem = findItemById;
    
    
    // Clear all Selected items

    function clearSelected() {

        // Clear all selections
        $(`#${canvasId} .airdev-pill-selected`).each(function () {

            $(this)
                .removeClass('airdev-pill-selected')
                .find('.icon')
                .text(instance.data.icon);

        });

        instance.publishState('current_values',);
        instance.publishState('selected_value',);
        instance.publishState('deselected_value',);
        instance.data.selected = [];

    }

    instance.data.clearSelected = clearSelected; // Add clearSelected function to the instance
    
    
    

}