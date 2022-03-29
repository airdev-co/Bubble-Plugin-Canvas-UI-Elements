function(instance, properties) {
    
    let previewTags = ['Design', 'Arts', 'Architecture', 'Business', 'Development', 'Prototyping', 'Mobile', 'UX', 'HTML', 'UI'],
        
        // Set whether tags should wrap when width is too short    
        pillDirection = properties.main_flow === 'Stack Vertically' ? 'flex-direction: column;' : 'flex-direction: row;' , 
              
        // Wrap pills        
        pillWrap = properties.main_flow === 'Wrap to next line' ? 'flex-wrap: wrap;' : 'flex-wrap: nowrap; overflow: scroll!important;' , 
          
        pillAlign = properties.main_alignment === 'Center' ? 'justify-content: center;' : properties.main_alignment === 'Right' ? 'justify-content: flex-end;' : 'justify-content: flex-start;',
        
        icon = properties.main_selection_style == 'Checkbox' ? '//dd7tel2830j4w.cloudfront.net/f1616017419676x657338651108263300/check_box-24px.svg' : '//dd7tel2830j4w.cloudfront.net/f1616018135692x428163608206902460/radio_button_checked-24px.svg';


    	$(instance.canvas).append(`<div id='airdev-pills' style='display: flex; ${pillDirection} ${pillAlign} ${pillWrap}'></div>`)

    	$(previewTags).each(function() {
        
        $('#airdev-pills').append(`<div style="border-style: solid; border-radius:${properties.borderRadius}; padding: ${properties.padding}; margin: ${properties.margin}; background-color:${properties.bgColor}; border-color:${properties.borderColor}; border-width: ${properties.borderWidth}; font-size: ${properties.bubble.font_size()}px; font-family: '${properties.bubble.font_face()}'; display: flex; flex-direction: row; align-items: center; "><img src="${icon}" width="${properties.icon_size}" height="${properties.icon_size}"><span style="margin-left: 10px;">${this}</span></div>`)
        
    })


}