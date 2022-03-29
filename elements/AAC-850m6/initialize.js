function(instance, context) {
    
const el = instance.canvas[0],
      i = instance;    
           
initialize();
    
    
function initialize() {

    const getID = () => {
        return Math.floor((1 + Math.random()) * 10000).toString(16).substring(1);
    }

    i.data.id = "airdev" + getID();
    
    
    el.classList.add('airdev-pill-container');
    el.style.overflow = 'visible';
    setTimeout(()=> {
        el.id = i.data.id
    }, 50);

}
    
    const canvasId = i.data.id; // Element id for this instance
    
    
    i.data.selected = [];
    i.data.updated_count = [];
    
    
    // Functions ----------------------------------------------------------------------
    
    
    function clear_selected() {

        // Clear all selections
        
        el.querySelectorAll('.airdev-pill-selected').forEach(x => x.classList.remove('airdev-pill-selected'));

        i.publishState('current_values',);
        i.publishState('selected_value',);
        i.publishState('deselected_value',);
        i.data.selected = [];
        i.data.deselected_value = '';
        i.data.selected_value = '';


    }

    i.data.clear_selected = clear_selected; // Add clearSelected function to the instance
        
    // Constructor for Tag object
    
    function NewTagObj(text, id, value) {		

        this.text = text;
        this.id = id;
        this.value = value;

    }
    
    i.data.NewTagObj = NewTagObj;
    
    
    // Publish selected values
    
    function publish_all() {
        
        if (i.data.selected.length > 0) {
        
                let value = [];

                i.data.selected.map(x => value.push(x.value));

                i.publishState('current_values', value);
            
            } else {
                
                i.publishState('current_values',);
                
            }

    }
    
    i.data.publish_all = publish_all;
    
    // Find item by id
  
    function get_tag_by_id(x) {

        return x.value.toString() == this.toString()

    }
    
    i.data.get_tag_by_id = get_tag_by_id;
    
    
    // Set last selected value
    
    function publish_add(value) {
        
        i.publishState('selected_value', value.value) 			// Publish Selected Value
                
        i.data.selected_value = value; 					// Set selected value on instance
        
        let spider = i.data.selected.map(x => x.id == value.id).includes(true);
        
        (!i.data.selected.map(x => x.id == value.id).includes(true)) ? i.data.selected.push(value) : '';

        i.triggerEvent('is_selected')
        
    }
    
    i.data.publish_add = publish_add;
    
    
    // Set last deselected value
    
    function publish_remove(value) {

      	i.publishState('deselected_value', value.value); 	// Publish Deselected Value
            
     	i.data.deselected_value = value; 			// Set deselected value on instance
        
       	i.data.selected.map((x,index,array) => {
            if (x.id == value.id) {
                array.splice(index,1)
            }
        });

        i.triggerEvent('is_deselected');
    }
    
    i.data.publish_remove = publish_remove;

}