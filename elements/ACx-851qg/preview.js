function(instance, properties) {
    
    let icon = '//dd7tel2830j4w.cloudfront.net/f1616017419676x657338651108263300/check_box-24px.svg';


    	$(instance.canvas).append(`<div id='airdev-checkbox' style='display: flex; justify-content: flex-start;'><div style="border-style: solid; border-radius:${properties.borderRadius}; padding: ${properties.padding}; margin: ${properties.margin}; background-color:${properties.bgColor}; border-color:${properties.borderColor}; border-width: ${properties.borderWidth}; font-size: ${properties.bubble.font_size()}px; font-family: '${properties.bubble.font_face()}'; display: flex; flex-grow: 1;"><img src="${icon}" width="${properties.icon_size}" height="${properties.icon_size}"><span style="margin-left: 10px;">${properties.label_text}</span></div></div>`)
        


}