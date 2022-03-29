function(instance, properties, context) {

    const size = properties.size;
    
    let   sizeId = '';
    
    switch (size) {
            
          case "Small":
            
            sizeId = "toggle-sm"
            
            break;
            
          case "Medium":
            
            sizeId = "toggle-md"
            
            break;
            
          default:
            
            sizeId = "toggle-lg"
            
            break;
        }
    
    let style = document.createElement('style');
    
    style.append(`ion-toggle#${instance.data.id} {
                      --background: ${properties.track_unchecked};
                      --background-checked: ${properties.track_checked};

                      --handle-background: ${properties.handle_unchecked};
                      --handle-background-checked: ${properties.handle_checked};
                    }`)
    
    const el = document.getElementById(instance.data.id);
    
    el.append(style)
    
    el.classList.add(sizeId);
    el.setAttribute("checked", properties.is_checked === true)
    
    properties.this_toggle_is_disabled ? el.setAttribute('disabled','') : el.setAttribute('disabled','false');
       
    el.addEventListener('ionChange', elToggled)
            
    function elToggled() {
        
        if (instance.data.isChecked !== el['checked']) {
        
            instance.data.isChecked = el['checked'];
            instance.publishState('is_checked', el['checked']);
            instance.triggerEvent('is_changed');
            
        }
   
    }
  
}