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
    
    
    $(`<style id="style${canvasId}">`)
            .prop("type", "text/css")
            .html(`
            #${canvasId}.airdev-tab-container {
            }`)
        	.appendTo("head");

    
    // Functions ----------------------------------------------------------------------
    

    // Constructor for Tag object
    
    function NewTabObj(text, id, value) {		

        this.text = text;
        this.id = id;
        this.value = value;

    }
    
    i.data.NewTabObj = NewTabObj;
        
    
    // Set active tab
    
    function select() {
        
        document.querySelectorAll(`#${canvasId} .active`).forEach((z) => {
            z.classList.remove("active");
          });
        
        this.classList.add('active')
        
        if (i.data.useIndicator) {
            
            let left = i.data.tabStyle == "Folder" ? this.offsetLeft + 1 + 'px': this.offsetLeft + 'px',
                width = i.data.tabStyle == "Folder" ? this.offsetWidth - 2 + 'px' : this.offsetWidth + 'px',
        		indicator = document.querySelector(`#${canvasId} .indicator-inner`);
            
            indicator.style.left = left;
            indicator.style.width = width;
        }
        
        if (i.data.useStaticTexts)
            i.publishState('active_tab_static', this.getAttribute('value')) 			// Publish Selected Value
        else
            i.publishState('active_tab', this.getAttribute('value')) 			// Publish Selected Value
        i.triggerEvent('is_clicked')
        
    }
    
    i.data.select = select;


}