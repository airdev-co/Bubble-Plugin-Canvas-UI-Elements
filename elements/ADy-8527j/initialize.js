function(instance, context) {
    
    const canvas = instance.canvas;
    
    $(canvas).css('overflow','visible');
    
    instance.data.id = 'canvas-' + Math.floor((1 + Math.random()) * 10000).toString(16).substring(1);
    
    canvas[0].style.zIndex = 100;
    
    // Create the container div for the input
    
    let div = document.createElement('div');
    
    // Create the input element
    const tel = document.createElement('input');
    
        tel.setAttribute('id', instance.data.id);
        tel.setAttribute('type', 'tel');
        tel.setAttribute('name','phone');
    
    
    // Append the div and input element to the instance
    
    div.appendChild(tel);
    
    instance.canvas.append(div);
    
    // Add telephone input to the instance data
    
    instance.data.tel = tel;
    
    
    
    // Functions ----------------
    
    function setInputBorderColor(color) {

        if (color) { // if a color was passed to this function set the border to that color
            tel.style.borderColor = color;
        } else {
            tel.style.border = ``;
        }

    }
    
    instance.data.setInputBorderColor = setInputBorderColor;
    
    
    function formatTelInput(iti, retry_boolean, retries) {
        
        let errorCode = '';
        
        
        // Get and set the currently input number value
        
        if (typeof intlTelInputUtils !== 'undefined') { // utils are lazy loaded, so must check
            
            // Get the E164 formatted version of the number that was input

            
            let currentText = iti.getNumber(intlTelInputUtils.numberFormat.E164);
            // console.log("currentText");
            // console.log(currentText);
            
            
            // Make sure the currentText is a string. Can sometimes be returned as an object
            
            if (typeof currentText === 'string') {
                
                iti.setNumber(currentText); // will autoformat because of formatOnDisplay=true
                
                // Publish the country code and the valid status to the element states
                
                // console.log("valid #");
                // console.log(currentText);
                // console.log(iti.isValidNumber());
                
                instance.publishState('country_code', iti.getSelectedCountryData().dialCode);
            	instance.publishState('is_valid', iti.isValidNumber());
                
                // Publish the values of the number if valid or clear them if not valid
                
                if (iti.isValidNumber()) {
                
                    instance.publishState('international_phone_number', iti.getNumber(intlTelInputUtils.numberFormat.E164));
                    instance.publishState('national_phone_number', iti.getNumber(intlTelInputUtils.numberFormat.NATIONAL));   
                    
                } else {
                    
                    instance.publishState('international_phone_number', "");
                    instance.publishState('national_phone_number', "");
                    
                }
                
            }
        } else if (retry_boolean && retries > 0) {
            // retry 100ms later if specified
            setTimeout(function() {
                formatTelInput(iti, retry_boolean, retries - 1);
            }, 100);
            // console.log("schedule retry, " + retries + " retries remaining");
            return;
        }
        
        // Check for errors and publish the correct error code if necessary
        
        $(tel).val().length > 0 ? errorCode = iti.getValidationError() : errorCode = 0;
        
        switch (errorCode) {
                
          case 1:
            
            instance.publishState('error','The country code is invalid')
            
            break;
                
          case 2:
            
            instance.publishState('error','The phone number you entered is too short')
            
            break;
                
          case 3:
            
            instance.publishState('error','The phone number you entered is too long')
            
            break;
                
          case 4:
            
            instance.publishState('error','This phone number appears to be a local number only')
            
            break;
                
          case 5:
            
            instance.publishState('error','The length of your phone number is not valid')
            
            break;
            
          default:
            
            instance.publishState('error','')
            
            break;
        }
        
        

        // Fallback to set border colors if there is an error

        if (!iti.isValidNumber() && tel.value.length > 0) { // Checks if number is valid and that there is content in the input
            
            instance.data.setInputBorderColor(instance.data.borderError)
            
        } else if (tel === document.activeElement) {
            
            instance.data.setInputBorderColor(instance.data.borderFocus)
            
        } else {
            
            instance.data.setInputBorderColor(instance.data.border);
        }

    }
    
    instance.data.formatTelInput = formatTelInput;



}