function(instance, properties) {
    
    instance.canvas.append(`<div style="box-sizing: border-box; height: ${properties.bubble.height()}px; width: ${properties.bubble.width()}px; border-radius: ${properties.border_radius}; border: ${properties.border_thickness} solid ${properties.border_color}; padding: 0px 15px; display: flex; align-items: center;"><span style="color: #E5E8EB; font-size: ${properties.bubble.font_size()}px;">888-888-8888</span></div>`)



}