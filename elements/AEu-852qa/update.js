function(instance, properties, context) {

    const 
    	p = properties,
        i = instance,
        canvasId = instance.data.id,
        el = instance.canvas[0],
		
          // Function variables
          Tab = i.data.NewTabObj,
          get_tag_by_id = i.data.get_tag_by_id,
          select = i.data.select,
          
        // Get data for tags  
        tab_container = $(`<div class='airdev-tab-container' role='tablist'></div>`), 
        tab_object_array = [];

    var tab_count, tab_array;
    // static texts
    if (p.use_static_texts){
        i.data.useStaticTexts = true;
        tab_array = p.static_texts.split(/\r\n|\n|\r/g);
        tab_count = tab_array.length;
    }
    // dynamic texts
    else {
        tab_count = p.data_list.length();
        tab_array = p.data_list.get(0, tab_count);
    }

    let
        tab_style = p.tab_style,
        tab_el_type = p.tab_element_type,
        // tab_alignment = p.tab_alignment === 'Center' ? 'justify-content: center;' : p.tab_alignment === 'Space Out' ? 'justify-content: space-around;' : p.tab_alignment === 'Right' ? 'justify-content: flex-end;' : 'justify-content: flex-start;',
        tab_grow = p.tab_grow == true ? 'flex-grow: 1;' : '',
        tab_alignment = 'justify-content: flex-start;',

        // Normal State - Pill design settings
        padding = p.padding,
        margin = p.margin,
        default_font_color = p.default_font_color,
        bg_color = p.bg_color,
        border_width = p.border_width,
        border_color = p.border_color,
        border_radius = p.border_radius,

        // Hover State - Pill design settings
        hover_bg_color = p.hover_bg_color || bg_color,
        hover_font_color = p.hover_font_color || p.bubble.font_color(),
        hover_border_color = p.hover_border_color || border_color,

        // Active State - Pill design settings
        active_bg_color = p.active_bg_color || bg_color,
        active_font_color = p.active_font_color || p.bubble.font_color(),
        active_border_color = p.active_border_color || border_color;
    
    i.data.useIndicator = tab_style != 'Outline';
    i.data.tabStyle = tab_style;

    // ADD ID TO INSTANCE
    $(instance.canvas).attr('id', canvasId).css('overflow', 'auto');

   // Generate CSS Styles and append to HTML head
    
    if (tab_style == 'Outline') {
        
        $(`#style${canvasId}`)
            .html(`
			#${canvasId} .spacer {
				display: flex;
				flex: 1;
				}
            #${canvasId} .airdev-tab-container {
                display: flex;
				flex-direction: row;
                ${tab_alignment};
                border-radius: ${border_radius};
                border-width: ${border_width};
                border-color: ${border_color};
				min-width: fit-content;
				border-style: solid;
				overflow: hidden;
            }
			#${canvasId} .airdev-tab-text {
                text-align: ${properties.bubble.font_alignment()};
				width: 100%;
                }

            #${canvasId} .airdev-tab {
				transition: all .3s ease;
				cursor: pointer;
                color: ${default_font_color};
                padding: ${padding};
                background: ${bg_color};
				border: none;
				border-right-style: solid;
                border-right-width: ${border_width};
                border-right-color: ${border_color};
				${tab_grow}
				white-space: nowrap;
            }
            #${canvasId} .airdev-tab:hover {
                color: ${hover_font_color};
                background: ${hover_bg_color};
            }
            #${canvasId} .airdev-tab.active {
                color: ${active_font_color};
                background: ${active_bg_color};
            }

            #${canvasId} .airdev-tab:last-child {
                border: none;
            }
				`)
        
        
    } else if (tab_style == 'Folder') {
        
        $(`#style${canvasId}`)
            .html(`
			#${canvasId} .airdev-tab-container .spacer {
				display: flex;
				flex: 1;
				}
            #${canvasId} .airdev-tab-container {
                display: flex;
				flex-direction: row;
                ${tab_alignment}
				padding: 0px ${p.tab_offset_horizontal || '0px'} 0px ${p.tab_offset_horizontal || '0px'};
            }
			#${canvasId} .airdev-tab-text {
                text-align: ${properties.bubble.font_alignment()};
				width: 100%;
                }

            #${canvasId} .airdev-tab {
				cursor: pointer;
				border-style: solid;
                color: ${default_font_color};
                margin: ${margin};
                padding: ${padding};
                background: ${bg_color};
                border-radius: ${border_radius} ${border_radius} 0px 0px;
                border-width: ${border_width};
                border-color: ${border_color};
				border-bottom: none;
				${tab_grow}
				white-space: nowrap;
            }
            #${canvasId} .airdev-tab:hover {
                color: ${hover_font_color};
                background: ${hover_bg_color};
                border-color: ${hover_border_color};
            }
            #${canvasId} .airdev-tab.active {
                color: ${active_font_color};
                background: ${active_bg_color};
                border-color: ${active_border_color};
            }
            #${canvasId} .indicator {
				display: flex;
				height: ${p.indicator_track_height};
				background-color: ${p.indicator_track_color};
            }
            #${canvasId} .indicator-inner {
                transition: all .15s ease-in-out;
                position: absolute;
                bottom: 0px;
				height: ${p.indicator_height};
				background-color: ${p.indicator_color};
            }
				`)
        
        
    } else {
        
        $(`#style${canvasId}`)
            .html(`
			#${canvasId} .airdev-tab-container .spacer {
				display: flex;
				flex: 1;
				}
            #${canvasId} .airdev-tab-container {
                display: flex;
				flex-direction: row;
                ${tab_alignment}
				padding: 0px ${p.tab_offset_horizontal || '0px'} 0px ${p.tab_offset_horizontal || '0px'};
            }
			#${canvasId} .airdev-tab-text {
                text-align: ${properties.bubble.font_alignment()};
				width: 100%;
                }

            #${canvasId} .airdev-tab {
				cursor: pointer;
                color: ${default_font_color};
				transition: all .15s ease;
				display: flex;
				flex-direction: column;
				align-items: center;
				margin: ${margin};
                padding: ${padding};
                background: ${bg_color};
				z-index: 1;
				${tab_grow}
				white-space: nowrap;
            }
            #${canvasId} .airdev-tab:hover {
                color: ${hover_font_color};
                background: ${hover_bg_color};
            }
            #${canvasId} .airdev-tab.active {
                color: ${active_font_color};
                background: ${active_bg_color};
            }
            #${canvasId} .indicator {
				display: flex;
				height: ${p.indicator_track_height};
				background-color: ${p.indicator_track_color};
				z-index: 0;
            }
            #${canvasId} .indicator-inner {
                transition: all .15s ease-in-out;
                position: absolute;
                bottom: 0px;
				height: ${p.indicator_height};
				background-color: ${p.indicator_color};
            }
				`)
        
        
    }
    
    
    
    
    
        
    
    let active_id;
    
    // CREATE ARRAY OF OBJECTS FROM THE DATA SOURCE. THIS IS THE SOURCE OF TRUTH FOR ALL PLUGIN ACTIONS
    
    tab_array.map((item, i) => {

        let tabText,
            tabId,
            tabValue;

        // Set ID for Tag

        if (!item.hasOwnProperty('get')) {

            tabId = `${canvasId + item}`;
            tabText = item;
            tabValue = item;

        } else if (item.get('display') !== null) {

            let display = item.get('display');


            tabId = `${canvasId + display}`;
            tabText = item.get(p.data_field_title);
            tabValue = display;


        } else {

            tabId = canvasId + item.get('_id');
            tabText = item.get(p.data_field_title);
            tabValue = item.get('_id');

        }

        tab_object_array.push(new Tab(tabText, tabId, tabValue));
        
    });
    
    // ------------> END CREATE ARRAY OF OBJECTS
    
    // GET DEFAULT SELECTION VALUE
    
    if (i.data.useStaticTexts){
        active_id = canvasId + p.default_static_text;
    }
    else if (!p.data_active.hasOwnProperty('get')) {

        active_id = canvasId + p.data_active;

    } else if (p.data_active.get('display') !== null) {

        active_id = canvasId + p.data_active.get('display');

    } else {
        
        active_id = canvasId + p.data_active.get('_id');

    }
    


   // Add HTML to instance  -------------------------------------------

    
    function drawTabs() {
    
        el.innerHTML = '';

        tab_object_array.map( (tab, i) => {

          $(tab_container).append(`<span class='airdev-tab ${tab.id == active_id ? 'active' : ''}' role='tab' tabindex='0' aria-selected='false' id="${tab.id.split(/\r\n|\n|\r|\s/g).join("$$replaced$$")}" value="${tab.value}"><${tab_el_type} class='airdev-tab-text'>${tab.text || ""}</${tab_el_type}></span>`);
            
        });
        
        
        $(el).append(tab_container);
        i.data.useIndicator ? $(el).append(`<div class='indicator'><div class='indicator-inner'></div></div>`) : '';

        
        // Reset height of element to match tags
        instance.setHeight(el.offsetHeight + p.bubble.border_width_bottom());
        
        // Add select event to all tags
    	$(`#${canvasId} .airdev-tab`).on("click", select);
        
    } // end drawTags function
    
    
    drawTabs();
    
    if (tab_style == 'Outline') {
        $(instance.canvas).css({
            "display":"flex",
            "justify-content": 'flex-start'
        })
        
        if (p.tab_alignment == 'Right' || p.tab_alignment == 'Center') {
            
            $(el).prepend(`<div class="spacer"></div>`)
            
        }
        
        if (p.tab_alignment == 'Left' || p.tab_alignment == 'Center' ) {
            
            $(el).append(`<div class="spacer"></div>`)
            
        }
    } else {
        
        if ((p.tab_alignment == 'Right' || p.tab_alignment == 'Center') && p.tab_grow != true) {
            
            $(tab_container).prepend(`<div class="spacer"></div>`)
            
        }
        
        if ((p.tab_alignment == 'Left' || p.tab_alignment == 'Center') && p.tab_grow != true) {
            
            $(tab_container).append(`<div class="spacer"></div>`)
            
        }
        
    }
    
    
    // Resize the Indicator track to be full width
    
    $(`#${canvasId} .indicator`).css('min-width', $(`#${canvasId} .airdev-tab-container`)[0].scrollWidth);
    
    
    // Run click event on the active tab
    try {
        document.querySelector(`#${canvasId} .active`).click();
    } catch(e) {
        // probably fine, no default tab selected
        console.warn("Canvas tabs: no default tab selected");
    }
           

}