function(instance, properties, context) {

    let font_weight = properties.bubble.bold() == true ? "bold" : properties.bubble.font_face().match(/:\w*$/g)[0].substring(1);

    const tel = instance.data.tel;

    instance.data.border = properties.border_color;
    instance.data.borderFocus = properties.border_color_focused;
    instance.data.borderError = properties.border_color_error;
    
    // Get the country data and set to empty array if no data is passed to the input
    
    let countries = properties.country_list.split(','),
        countriesPreferred = properties.country_preferred.split(','),
        countriesExclude = properties.country_exclude.split(',');

    countries[0].length > 0 ? countries = countries.map(x => x.trim()) : countries = [];
    countriesPreferred[0].length > 0 ? countriesPreferred = countriesPreferred.map(x => x.trim()) : countriesPreferred = [];
    countriesExclude[0].length > 0 ? countriesExclude = countriesExclude.map(x => x.trim()) : countriesExclude = [];


    if (!instance.data.iti) {        
        
        instance.canvas.append(`<style>
				.${instance.data.id}.iti {
					width: 100%;
				}
                .${instance.data.id} .iti__country-list {
                    border-radius: ${properties.border_radius};
                    border-color: ${properties.border_color};
                    }
                #${instance.data.id} {
                  border: ${properties.border_thickness} solid ${properties.border_color};
                  border-radius: ${properties.border_radius};
                }

                input#${instance.data.id} {
                    height: ${properties.bubble.height()}px;
                    font-size: ${properties.bubble.font_size()}px;
                    font-family: ${properties.bubble.font_face().match(/^[\w]+/g)};
      				font-weight: ${font_weight};
                    color: ${properties.bubble.font_color()};
                    width: 100%;
                }
				.${instance.data.id} .iti__selected-flag {
                    background-color: #fafafa;
                    border-radius: ${properties.border_radius} 0px 0px ${properties.border_radius};
				}
                .${instance.data.id} .iti__country {
                    padding:12px 18px;
                }
                .${instance.data.id} .iti__country:hover,
                .${instance.data.id} .iti__highlight,
                .${instance.data.id} .iti__active {
                    background-color: #fafafa;
                }

</style>`)

		// Initialize the input 
        
        const iti = window.intlTelInput(tel, {
                utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
                onlyCountries: countries,
                excludeCountries: countriesExclude,
                preferredCountries: countriesPreferred,
                nationalMode: true,
                formatOnDisplay: true, 
                separateDialCode: true,
                allowDropdown: !properties.limit_to_this_country,
                customContainer: instance.data.id,
            	initialCountry: properties.initial_country || ""
            }
        );
        
        // Set the initialized value to the instance data object
        instance.data.iti = iti;
        window.iti = iti;
        window.tel = instance.data.tel;

        
        // Set listeners on the input to reformat and check for errors
        
        tel.addEventListener("countrychange", function () {

            // console.log("countrychange");
            instance.data.formatTelInput(iti);

        });

        tel.addEventListener('keyup', function(){

            // console.log("keyup");
            instance.data.formatTelInput(iti);
            
        });
        
        tel.addEventListener('change', function() {
            
            // console.log("change");
            instance.data.formatTelInput(iti);
        
        });

        tel.addEventListener('focus', function () {
            
            // console.log("focus");
            instance.data.formatTelInput(iti);
        });

        tel.addEventListener('blur', function () {
            
            // console.log("blur");
            instance.data.formatTelInput(iti);
   
        });


    }
    
    
    // Get the initilized instance

	var iti = instance.data.iti;
    
    
    // If a country has been set in the 'Limit to this country' input this will set that country on the input
    
    if (properties.limit_to_this_country) {
        instance.data.limit_to_this_country = properties.limit_to_this_country
        iti.setCountry(properties.limit_to_this_country)   
    }
    
    
    // If the there is a phone number value set this will insert that number into the input
    
    // console.log("properties.default_value");
    // console.log(properties.default_value);

    if (properties.default_value) {
        
        instance.data.default_value = properties.default_value;
        
        iti.setNumber(properties.default_value);

        instance.data.formatTelInput(iti,
            true, //retry up to 10 times 
            10);

        // setTimeout(function() { instance.data.formatTelInput(iti); }, 100);
    }
    
    instance.data.tel.disabled = (properties.disabled === true) ? true : false;
    
}