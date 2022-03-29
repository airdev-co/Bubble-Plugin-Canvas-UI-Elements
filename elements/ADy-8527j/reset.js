function(instance, context) {

	var iti = instance.data.iti;
    
    if (instance.data.default_value)
    	iti.setNumber(instance.data.default_value);
    else
        iti.setNumber("");
    
    if (instance.data.limit_to_this_country)
        iti.setCountry(instance.data.limit_to_this_country);


}