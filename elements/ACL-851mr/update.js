function(instance, properties, context) {
  var palletColors;
  if(properties.palette_colors != null){
      palletColors = properties.palette_colors.get(0,99);
  }  
  $(document).ready(function(){
    
    var initcolor = properties.initial_color;
    var defaultPallet = [["#ffffff", "#bdc3c7", "#f1c40f", "#f39c12", "#e74c3c", "#1abc9c", "#17d9fd", "#0000ff", "#2980b9", "#9b59b6","#000000" ]];
    var classid = instance.data.id;
    var style_id = classid+'style';
    var picker = $(`#${classid}.${classid}`);
    var bg_color = properties.background_color;
    var border_color = properties.border_color;
    var border_radius = properties.border_radius;
      
    $(`<style id="${classid}style" class="${classid}style">`)
            .prop("type", "text/css")
            .html(`
                .${style_id} {
                background-color: ${bg_color};
                border-color: ${border_color};
                border-radius: ${border_radius}px;
                }
                `).appendTo('head'); 

    picker.spectrum({
      color: initcolor,
      showInput: properties.show_input,
      showInitial: properties.show_previous_color,
      allowEmpty: properties.allow_empty,
      showAlpha: properties.show_alpha,
      disabled: properties.disabled,
      localStorageKey: "canvascolorpicker.bubble",
      showPalette: properties.show_palette,
      showPaletteOnly: properties.palette_only,
      togglePaletteOnly: properties.toggle_palette_only,
      showSelectionPalette: properties.show_selection_palette,
      clickoutFiresChange: properties.clickout_fires_change,
      cancelText: properties.cancel_text,
      chooseText: properties.choose_text,
      togglePaletteMoreText: properties.togglepalettemoretext,
      togglePaletteLessText: properties.togglepalettelesstext,
      containerClassName: 'canvas-picker-container',
      replacerClassName: style_id,
      preferredFormat: properties.preferred_format,
      maxSelectionSize: properties.max_selection_size,
      palette: (palletColors != null)? palletColors: defaultPallet,
      hideAfterPaletteSelect: properties.hide_after_select,
      //events
      change: function(color) {
          if(color !== null){
              
              publishColor(color);
              
          }
          else{
            instance.publishState('value', null );
          }
          instance.triggerEvent('color_changed', function() {});
      }
     
    }); 
      
    publishColor(tinycolor(initcolor))  

  }) //end of document ready
  
    
  function publishColor(color, alpha){
      
      alpha ? color.setAlpha(alpha) : '';
      
      instance.publishState('hex', color.toHexString());
      instance.publishState('hsl', color.toHslString());
      instance.publishState('hsv', color.toHsvString());
      instance.publishState('rgb', color.toRgbString());
      instance.publishState('value', color.toString());
      
  }
}