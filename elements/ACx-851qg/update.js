function(instance, properties, context) {
	// note: set up this "update" function to be able to call it frm the "Clear checkbox" action. 
    // later, should remove the update action and write a better implementation of the "clear checkbox" action (previously, there was no implementation at all).
    function update(instance, properties, context) {

        const p = properties;
    
        var d = instance.data;
        
        d.is_checked = p.is_checked;
        instance.publishState('is_checked', d.is_checked)

        const
            $ = context.jQuery, // Set jQuery
            id = instance.data.id,

            // Set single or multi select
            singleSelect = p.main_selection_style !== 'Checkbox',

            // Normal State - Pill design settings
            padding = p.padding,
            margin = p.margin,
            shadow = p.shadow,
            background = p.bgColor,
            borderWidth = p.borderWidth,
            borderColor = p.borderColor,
            borderRadius = p.borderRadius,

            // Hover State - Pill design settings
            hShadow = p.hShadow || shadow,
            hBackground = p.hBgColor || background,
            hColor = p.hColor || p.bubble.font_color(),
            hBorderColor = p.hBorderColor || borderColor,

            // Selected State - Pill design settings
            vShadow = p.vShadow || shadow,
            vBackground = p.vBgColor || background,
            vColor = p.vColor || p.bubble.font_color(),
            vBorderColor = p.vBorderColor || borderColor;

        let
            htmlContainer = $(`<div id='${id}' class='airdev-checkbox-container'></div>`),
            icon = d.is_checked ? 'check_box' : 'check_box_outline_blank';

        // ADD ID TO INSTANCE
        $(instance.canvas).attr('id', id).css('overflow', 'visible!important');

        // Generate CSS Styles and append to HTML head
        if (!$(`#style${id}`).length) {
            $(`<style id="style${id}">`)
                .prop("type", "text/css")
                .html(`
                #${id} .airdev-checkbox-container {
                    display: flex;
                    justify-content: flex-start;
                }
                #${id} .airdev-checkbox {
                    margin: ${margin};
                    padding: ${padding};
                    background: ${background};
                    border-radius: ${borderRadius};
                    border-width: ${borderWidth};
                    border-color: ${borderColor};
                    box-shadow: ${shadow};
                }
                #${id} .airdev-checkbox:hover {
                    box-shadow: ${hShadow};
                    color: ${hColor};
                    background: ${hBackground};
                    border-color: ${hBorderColor};
                }
                #${id} .airdev-checkbox-selected {
                    box-shadow: ${vShadow}!important;
                    color: ${vColor}!important;
                    background: ${vBackground}!important;
                    border-color: ${vBorderColor}!important;
                }
                #${id} .icon {
                    font-size: ${p.icon_size}; 
                    transition: all .1s ease;
                    margin-right: 10px;
                }`
                ).appendTo("head");
        }

        // Add html to instance

        $(htmlContainer).append(`<a class='airdev-checkbox ${d.is_checked ? 'airdev-checkbox-selected' : ''}' style='flex-grow: 1;' href="javascript:"><span class='icon material-icons'>${icon}</span><div class='airdev-checkbox-label'>${p.label_text || ''}</div></a>`);

        $(instance.canvas).html(htmlContainer);

        $(`#${id} .airdev-checkbox`).on("click", function() {
            
            d.is_checked = !d.is_checked; 
            
            instance.publishState('is_checked', d.is_checked)
            instance.triggerEvent('is_clicked')

            if (d.is_checked) {
                
                $(this)
                    .addClass('airdev-checkbox-selected')
                    .children('.material-icons')
                    .text('check_box');
                
            } else {
                
                $(this)
                    .removeClass('airdev-checkbox-selected')
                    .children('.material-icons')
                    .text('check_box_outline_blank');
                
            }

        }); 
    
        // Disable clicks
        (p.disable_selection) ? $(`#${id} .airdev-checkbox`).addClass('airdev-disable-clicks') : '';

        instance.setHeight($(htmlContainer).height())  // RESET THE HEIGHT OF THE BUBBLE ELEMENT. REPOSITIONS OTHER ELEMENTS ON THE PAGE

    }
    update(instance, properties, context);
    instance.data.properties = properties;
    instance.data.update = update;
    
}