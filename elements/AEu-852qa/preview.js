function(instance, properties) {
    
    let previewTags = ['Timeline','Favorites','Details'];
    
    if (properties.tab_style == "Outline") {
        
        $(instance.canvas).append(`<div id="airdev-tabs" style='width: fit-content; display: flex; flex-direction: row; border-style: solid; border-radius:${properties.border_radius}; border-color:${properties.border_color}; border-width: ${properties.border_width}; overflow: hidden; '></div>`)

    	$(previewTags).each(function(x) {
        
        $('#airdev-tabs').append(`<div style="border-right-style: solid; padding: ${properties.padding}; background:${x == 0 ? properties.active_bg_color : properties.bg_color}; border-right-color:${properties.border_color}; border-right-width: ${properties.border_width}; font-size: ${properties.bubble.font_size()}px; font-family: '${properties.bubble.font_face()}'; color: ${x == 0 ? properties.active_font_color : properties.default_font_color}; white-space: nowrap;">${this}</div>`)
        
    })
        
        
    } else if (properties.tab_style == "Folder") {
        
        $(instance.canvas).append(`<div id="airdev-tabs" style='display: flex; flex-direction: row; border-bottom: ${properties.indicator_track_height} solid ${properties.indicator_track_color};'></div>`)

    	$(previewTags).each(function(x) {
        
        $('#airdev-tabs').append(`<div style="border-style: solid; border-radius:${properties.border_radius} ${properties.border_radius} 0px 0px; padding: ${properties.padding}; margin: ${properties.margin}; background:${x == 0 ? properties.active_bg_color : properties.bg_color}; border-color:${x == 0 ? properties.active_border_color : properties.border_color}; border-width: ${properties.border_width}; color: ${x == 0 ? properties.active_font_color : properties.default_font_color}; white-space: nowrap; font-size: ${properties.bubble.font_size()}px; font-family: '${properties.bubble.font_face()}'; ${x == 0 ? 'margin-bottom: -' + properties.indicator_track_height + '; border-bottom: ' + properties.indicator_track_height + ' solid ' + properties.active_bg_color : ''} ">${this}</div>`)
        
        })
        } else {
        
        $(instance.canvas).append(`<div id="airdev-tabs" style='display: flex; flex-direction: row; border-bottom: ${properties.indicator_track_height} solid ${properties.indicator_track_color};'></div>`)

    	$(previewTags).each(function(x) {
        
        $('#airdev-tabs').append(`<div style="border-style: solid; border-radius:${properties.border_radius} ${properties.border_radius} 0px 0px; padding: ${properties.padding}; margin: ${properties.margin}; background:${x == 0 ? properties.active_bg_color : properties.bg_color}; border-color:${x == 0 ? properties.active_border_color : properties.border_color}; border-width: ${properties.border_width}; color: ${x == 0 ? properties.active_font_color : properties.default_font_color}; white-space: nowrap; font-size: ${properties.bubble.font_size()}px; font-family: '${properties.bubble.font_face()}'; ${x == 0 ? 'margin-bottom: -' + properties.indicator_height + '; border-bottom: ' + properties.indicator_height + ' solid ' + properties.indicator_color : ''} ">${this}</div>`)
        
        })  
    }
       
    	


}