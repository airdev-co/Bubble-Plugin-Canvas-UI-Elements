function(instance, properties, context) {

    const p = properties,
          Option = instance.data.Option,
          publishAllSelected = instance.data.publishAllSelected,
          findItem = instance.data.findItem,
          clearSelected = instance.data.clearSelected,
          publishDeselected = instance.data.publishDeselected,
          publishSelected = instance.data.publishSelected;

    const
        $ = context.jQuery, // Set jQuery
        id = instance.data.id,

        // Set single or multi select
        singleSelect = p.main_selection_style !== 'Checkbox',

        // Set whether tags should wrap when width is too short    
        flexDirection = p.main_flow === 'Stack Vertically' ? 'flex-direction: column;' : 'flex-direction: row;',

        // Wrap pills        
        flexWrap = p.main_flow === 'Wrap' ? 'flex-wrap: wrap;' : /*'flex-wrap: nowrap; overflow: scroll!important;' */ 'flex-wrap: wrap;',

        flexAlign = p.main_alignment === 'Center' ? 'justify-content: center;' : p.main_alignment === 'Right' ? 'justify-content: flex-end;' : 'justify-content: flex-start;',

        // Normal State - Item design settings
        padding = p.padding,
        margin = p.margin,
        shadow = p.shadow,
        background = p.bgColor,
        borderWidth = p.borderWidth,
        borderColor = p.borderColor,
        borderRadius = p.borderRadius,

        // Hover State - Item design settings
        hShadow = p.hShadow || shadow,
        hBackground = p.hBgColor || background,
        hColor = p.hColor || p.bubble.font_color(),
        hBorderColor = p.hBorderColor || borderColor,

        // Selected State - Item design settings
        vShadow = p.vShadow || shadow,
        vBackground = p.vBgColor || background,
        vColor = p.vColor || p.bubble.font_color(),
        vBorderColor = p.vBorderColor || borderColor;

    let
        optionsLength = p.data_source.length(),
        options = p.data_source.get(0, optionsLength), // List of options
        htmlContainer = $(`<div id='${id}' class='airdev-pills-container'></div>`),
        optionsArray = [],
        icon,
        icon_selected;

    if (p.main_selection_style !== 'Checkbox') {

        icon = 'radio_button_unchecked';
        icon_selected = 'radio_button_checked';

    } else {

        icon = 'check_box_outline_blank';
        icon_selected = 'check_box';
    }
    
    instance.data.icon = icon;

    // ADD ID TO INSTANCE
    $(instance.canvas).attr('id', id).css('overflow', 'visible!important');

    // Generate CSS Styles and append to HTML head
    if (!$(`#style${id}`).length) {
        $(`<style id="style${id}">`)
            .prop("type", "text/css")
            .html(`
            #${id} .airdev-pills-container {
                display: flex;
                ${flexDirection}
                ${flexWrap}
                ${flexAlign}
            }

            #${id} .airdev-pill {
                margin: ${margin};
                padding: ${padding};
                background: ${background};
                border-radius: ${borderRadius};
                border-width: ${borderWidth};
                border-color: ${borderColor};
                box-shadow: ${shadow};
            }
            #${id} .airdev-pill:hover {
                box-shadow: ${hShadow};
                color: ${hColor};
                background: ${hBackground};
                border-color: ${hBorderColor};
            }
            #${id} .airdev-pill-selected {
                box-shadow: ${vShadow}!important;
                color: ${vColor}!important;
                background: ${vBackground}!important;
                border-color: ${vBorderColor}!important;
            }
            #${id} .icon {
                font-size: ${p.icon_size}; 
                transition: all .1s ease;
                margin-right: 10px;
            }
            #${id} .airdev-pill:hover .icon.feather {
                stroke: ${hColor};
            }
            #${id} .airdev-pill-selected .icon.feather {
                stroke: ${vColor}!important;
            }`
            ).appendTo("head");
    }

    options.map(function (item, i) {

        let tagText,
            tagId,
            tagValue;

        // Set ID for Tag

        if (!item.hasOwnProperty('get')) {

            tagId = `airdev${i}`;
            tagText = item;
            tagValue = item;

        } else if (item.get('display') !== null) {

            tagId = `airdev${i}`;
            tagText = item.get(p.data_field);
            tagValue = item.get('display');


        } else {

            tagId = item.get('_id');
            tagText = item.get(p.data_field);
            tagValue = item.get('_id');

        }

        optionsArray.push(new Option(tagText, tagId, tagValue));

        $(htmlContainer).append(`<a class='airdev-pill' href="javascript:" id="${tagId}" value="${tagValue}"><span class='icon material-icons'>${icon}</span><div class='airdev-pill-text'>${tagText || ""}</div></a>`);
    });

    // Add html to instance

    $(instance.canvas).html(htmlContainer);

    // Default Selections
    
    let selected = instance.data.selected;
    
    if (instance.data.update_count == 0 && p.default_data != null) {
        
        selected = p.default_data.get(0, p.default_data.length())
        
    }
    
    instance.data.update_count.push(selected.length)
    
    
    if (selected.length > 0) {

        selected.map(function (item, i) {

            let tagId

            if (!item.hasOwnProperty('get')) {

                tagId = optionsArray.find(findItem, item).id

            } else if (item.get('display') !== null) {

                tagId = optionsArray.find(findItem, item.get('display')).id;

            } else {

                tagId = item.get('_id');
            }

            $(`#${id} #${tagId}`)
                .addClass('airdev-pill-selected')
                .find('.icon')
                .text(icon_selected)

        });

        publishAllSelected();

    }

    $(`#${id} .airdev-pill`).on("click", selectOption);  // Add click event to all tags
   
    // Disable clicks
    (p.disable_selection) ? $(`#${id} .airdev-pill`).addClass('airdev-disable-clicks') : '';

    instance.setHeight($(htmlContainer).height())  // RESET THE HEIGHT OF THE BUBBLE ELEMENT. REPOSITIONS OTHER ELEMENTS ON THE PAGE

    function selectOption() {

        let
            item = $(this).text(),
            value = $(this).attr("value");

        if ($(this).hasClass("airdev-pill-selected")) {   		// Check if the clicked tag is already selected

            $(this)
                .removeClass("airdev-pill-selected") // Remove the 'Selected' class from this tag
                .find('.icon')
                .text(icon);

            publishDeselected(value);

            publishAllSelected();

            

        } else {

            if (singleSelect === true) {

                let lastValue = $(`#${id} .airdev-pill-selected`).attr("value");

                publishDeselected(lastValue);

                // Remove the 'Selected' class from other tags
                $(`#${id} .airdev-pill-selected`)
                    .removeClass("airdev-pill-selected")
                    .find('.icon')
                    .text(icon);;

            }

            $(this).addClass("airdev-pill-selected")	// Add 'Selected' class to this tag
                .find('.icon')
                .text(icon_selected)

            publishSelected(value)

            publishAllSelected()

        }

    }

 

}