function(instance, properties) {
    
    let previewTags = ['Design', 'Arts', 'Architecture', 'Business', 'Development', 'Prototyping', 'Mobile', 'User Experience', 'HTML & CSS', 'UI'],
        
        // Set whether tags should wrap when width is too short    
        pillDirection = properties.main_flow === 'Stack Vertically' ? 'flex-direction: column;' : 'flex-direction: row;' , 
              
        // Wrap pills        
        pillWrap = properties.main_flow === 'Wrap to next line' ? 'flex-wrap: wrap;' : 'flex-wrap: nowrap; overflow: scroll!important;' , 
          
        pillAlign;
    
    if (properties.main_flow !== 'Scroll Horizontally'){
        
        pillAlign = properties.main_alignment === 'Center' ? 'justify-content: center;' : properties.main_alignment === 'Right' ? 'justify-content: flex-end;' : 'justify-content: flex-start;';
            
    } else {
        
        pillAlign = properties.main_alignment === 'Right' ? 'direction: rtl; align-items: center;' : 'direction: ltr; align-items: center;';
        
    }


    	$(instance.canvas).append(`<div id='airdev-pills' style='display: flex; ${pillDirection} ${pillAlign} ${pillWrap} '></div>`)

    	$(previewTags).each(function() {
        
        $('#airdev-pills').append(`<div style="border-style: solid; border-radius:${properties.border_radius}; padding: ${properties.padding}; margin: ${properties.margin}; background-color:${properties.bg_color}; border-color:${properties.border_color}; border-width: ${properties.border_width}; font-size: ${properties.bubble.font_size()}px; font-family: '${properties.bubble.font_face()}'; ">${this}</div>`)
        
    })


}