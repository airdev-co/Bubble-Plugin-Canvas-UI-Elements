function(properties, context) {
    
    
    properties.lottie_code != null ? $('#canvas-loader .canvas-loader').html(properties.lottie_code) : '';
    
    if ($('#canvas-loader .canvas-loader-text').length > 0 && properties.text != null) {
        
        $('#canvas-loader .canvas-loader-text').text(properties.text)
   
    } else if (properties.text != null) {    
        
    $('#canvas-loader').append(`<span class='canvas-loader-text' style="margin-top: ${properties.text_position}px; text-align: center; font-size: ${properties.bubble.font_size()}px; color: ${properties.bubble.font_color()}; font-family: ${properties.bubble.font_face()}!important;">${properties.text}</span>`)
        
    }
    
	document.querySelector("#canvas-loader").style.display = "block";
    document.querySelector("body").style.visibility = "hidden";

}