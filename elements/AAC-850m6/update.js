function(instance, properties, context) {

    const 
    	p = properties,
        i = instance,
        canvasId = instance.data.id,
        el = instance.canvas[0],
		
          // Function variables
          Tag = i.data.NewTagObj,
          clear_selected = i.data.clear_selected,
          get_tag_by_id = i.data.get_tag_by_id,
          publish_all = i.data.publish_all,
          publish_add = i.data.publish_add,
          publish_remove = i.data.publish_remove,
          
        // Get data for tags  
        tag_count = p.data_source.length(),
        tag_array = p.data_source.get(0, tag_count), // Pill array
        tag_container = $(`<div id='${canvasId}' class='airdev-pill-container'></div>`), 
        tag_object_array = [];

    let
        // Set single or multi select
        single_select = p.main_selection_style !== 'Multiple Selection',

        // Set whether tags should wrap when width is too short    
        flex_direction = p.main_flow === 'Stack Vertically' ? 'flex-direction: column;' : 'flex-direction: row;',

        // Wrap tag list        
        flex_wrap = p.main_flow === 'Wrap to next line' ? 'flex-wrap: wrap;' : 'flex-wrap: nowrap; overflow: scroll!important;',
        flex_align,
        
        // Type of html element to use for the tags
        tag_el_type = p.tag_element_type,

        // Normal State - Pill design settings
        padding = p.padding,
        padding_int = padding.split(' ').length > 1 ? parseInt(padding.split(' ')[1]) : parseInt(padding),
        margin = p.margin,
        margin_int = margin.split(' ').length > 1 ? parseInt(margin.split(' ')[1]) : parseInt(margin),
        shadow = p.shadow,
        bg_color = p.bg_color,
        border_width = p.border_width,
        border_color = p.border_color,
        border_radius = p.border_radius,

        // Hover State - Pill design settings
        hover_shadow = p.hover_shadow || shadow,
        hover_bg_color = p.hover_bg_color || bg_color,
        hover_font_color = p.hover_font_color || p.bubble.font_color(),
        hover_border_color = p.hover_border_color || border_color,

        // Active State - Pill design settings
        active_shadow = p.active_shadow || shadow,
        active_bg_color = p.active_bg_color || bg_color,
        active_font_color = p.active_font_color || p.bubble.font_color(),
        active_border_color = p.active_border_color || border_color,
        
        // Get/Set vars for Expand functionality  
        parent_width = el.clientWidth - (p.bubble.padding_horizontal() * 2),
      	show_all = !i.data.showAll ? false : i.data.showAll,
      	see_all_width = 80 + (padding_int * 2) + (margin_int * 2); 


    // Set the alignment of the tags
    if (p.main_flow !== 'Scroll Horizontally') {

        flex_align = p.main_alignment === 'Center' ? 'justify-content: center;' : p.main_alignment === 'Right' ? 'justify-content: flex-end;' : 'justify-content: flex-start;';

    } else {

        flex_align = p.main_alignment === 'Right' ? 'direction: rtl;' : 'direction: ltr;';

    }

    // ADD ID TO INSTANCE
    $(instance.canvas).attr('id', canvasId).css('overflow', 'visible!important');

    // Generate CSS Styles and append to HTML head
    if (!$(`#style${canvasId}`).length) {
        $(`<style id="style${canvasId}">`)
            .prop("type", "text/css")
            .html(`
            #${canvasId}.airdev-pill-container {
                display: flex;
                ${flex_direction}
                ${flex_wrap}
                ${flex_align}
            }
			#${canvasId} .airdev-pill-text {
                text-align: ${properties.bubble.font_alignment()};
				width: 100%;
                }

            #${canvasId} .airdev-pill {
                margin: ${margin};
                padding: ${padding};
                background: ${bg_color};
                border-radius: ${border_radius};
                border-width: ${border_width};
                border-color: ${border_color};
                box-shadow: ${shadow};
            }
            #${canvasId} .airdev-pill:hover {
                box-shadow: ${hover_shadow};
                color: ${hover_font_color};
                background: ${hover_bg_color};
                border-color: ${hover_border_color};
            }
            #${canvasId} .airdev-pill-selected {
                box-shadow: ${active_shadow}!important;
                color: ${active_font_color}!important;
                background: ${active_bg_color}!important;
                border-color: ${active_border_color}!important;
            }
			#${canvasId} .airdev-pill-see-more {
                display: flex;
                flex-direction: column;
                justify-content:flex-end;
                margin: ${margin};
                padding: ${padding};
				border: 1px solid ${border_color};
				background: white;
                border-radius: ${border_radius};
            }`
            ).appendTo("head");
    } else {
        
        $(`#style${canvasId}`)
            .html(`
            #${canvasId}.airdev-pill-container {
                display: flex;
                ${flex_direction}
                ${flex_wrap}
                ${flex_align}
            }
			#${canvasId} .airdev-pill-text {
                text-align: ${properties.bubble.font_alignment()};
				width: 100%;
                }

            #${canvasId} .airdev-pill {
                margin: ${margin};
                padding: ${padding};
                background: ${bg_color};
                border-radius: ${border_radius};
                border-width: ${border_width};
                border-color: ${border_color};
                box-shadow: ${shadow};
            }
            #${canvasId} .airdev-pill:hover {
                box-shadow: ${hover_shadow};
                color: ${hover_font_color};
                background: ${hover_bg_color};
                border-color: ${hover_border_color};
            }
            #${canvasId} .airdev-pill-selected {
                box-shadow: ${active_shadow}!important;
                color: ${active_font_color}!important;
                background: ${active_bg_color}!important;
                border-color: ${active_border_color}!important;
            }
			#${canvasId} .airdev-pill-see-more {
                display: flex;
                flex-direction: column;
                justify-content:flex-end;
                margin: ${margin};
                padding: ${padding};
				border: 1px solid ${border_color};
				background: white;
                border-radius: ${border_radius};
            }`)
        
        
    }
    
    // CREATE ARRAY OF OBJECTS FROM THE DATA SOURCE. THIS IS THE SOURCE OF TRUTH FOR ALL PLUGIN ACTIONS
    
    tag_array.map((item, i) => {

        let tagText,
            tagId,
            tagValue;

        // Set ID for Tag

        if (!item.hasOwnProperty('get')) {

            tagId = `${canvasId + "-" + i}`;
            // console.log(tagId);
            tagText = item;
            tagValue = item;

        } else if (item.get('display') !== null) {

            tagId = `${canvasId + "-" + i}`;
            // console.log(tagId);
            tagText = item.get(p.data_field);
            tagValue = item.get('display');


        } else {

            tagId = canvasId + "-" + item.get('_id');
            tagText = item.get(p.data_field);
            tagValue = item.get('_id');

        }

        tag_object_array.push(new Tag(tagText, tagId, tagValue));
        
    });
    
    // ------------> END CREATE ARRAY OF OBJECTS
    

   // Add HTML to instance  -------------------------------------------

    
    //Check if the collapse value has already been set. If not, set it to the value the user set in the plugin property editor (p.main_collapse)
    (typeof i.data.collapse == 'boolean') ? '' : i.data.collapse = p.collapse_tags;
    
        
    // Draw tags element
    drawTags(i.data.collapse);
    
    
    function drawTags(collapse) {

        if (typeof canvasId === "undefined")
            return;
        
        
        i.data.collapse = collapse;
    
        el.innerHTML = '';

        tag_object_array.every( (tag, i) => {

          $(el).append(`<a class='airdev-pill' href="javascript:" id="${tag.id}" value="${tag.value}"><${tag_el_type} class='airdev-pill-text'>${tag.text || ""}</${tag_el_type}></a>`);
            
            
          if (!collapse) {
              
              return true;
              
          } else if (i < tag_count - 1 && (getTagsWidth() > parent_width - see_all_width - (margin_int * i * 2))) {

            el.removeChild(el.lastChild)
            $(el).append(`<a class='airdev-pill-see-more' href="javascript:" id="${i}"><${tag_el_type} class='airdev-pill-text'>See all +${tag_count - i}</${tag_el_type}></a>`)
            return false;
              
          } else {
              
            return true;
              
          }
        });
        
        // Add 'See Less' tag if fully expanded
        if (p.collapse_tags &&
            el.lastChild && 
            !el.lastChild.classList.contains('airdev-pill-see-more') &&
            canMinimize()) {
            
            $(el).append(`<a class='airdev-pill-see-more' href="javascript:" id="airdev-pill-see-more"><div class='airdev-pill-text'>See less</div></a>`)
            
        }
        
        // console.log("i.data.selected.length");
        // console.log(i.data.selected.length);
        // console.log(i.data.selected);
        // Add selected class to selected tags
        i.data.selected.length > 0 ? i.data.selected.map(x => $(`#${x.id}`).addClass('airdev-pill-selected')) : '';
        
        // Reset height of element to match tags
        instance.setHeight(el.offsetHeight + (properties.bubble.border_width() * 2));
        
        // Add select event to all tags
    	$(`#${canvasId} .airdev-pill`).not('.airdev-pill-see-more').on("click", selectTag);
        
        // Add click event to see more/see less buttons
        $(`#${canvasId}  .airdev-pill-see-more`).on('click',() => drawTags(!collapse));
   
        
       
    } // end drawTags function
    
    function getTagsWidth() {
        
        return Object.values(el.childNodes).reduce((total, i) => total + i.offsetWidth, 0);
    }
    
    function canMinimize() {
        
        return getTagsWidth() > parent_width - (margin_int * 2 * el.children.length);
        
    }
    


    // Disable clicks -------------------------------------------
    (p.main_selection_style === 'Disable Selection') ? $(`#${canvasId} .airdev-pill`).addClass('airdev-disable-clicks') : '';
    
    // SET DEFAULT SELECTIONS
    
    let 
    	selected = i.data.selected;
    
//    if (instance.data.updated_count.length == 0 && p.default_data != null) {
    if (!i.data.ignore_default && p.default_data != null) {
    //    console.log("FIRST SELECTED")
        selected = p.default_data.get(0, p.default_data.length());
        // console.log(selected)
    }
    
    // i.data.updated_count.push(selected.length)
    
    // checks if the UPDATE function has run 1 or less times - means that the default data can only be set a max of 2 times.
    // if (instance.data.updated_count.length <= 1) {
        // console.log("UPDATED COUNT is 1 or less???")
        // console.log(instance.data.updated_count.length)
    if (!instance.data.ignore_default) {

        // console.log(i);
        
        // console.log("!i.data.ignore_default");
        // console.log("log i.data.ignore_default");
        // console.log(instance.data.ignore_default);

        let new_selected_array = [];

        selected.map( (item, i) => {

            try {
                
                let tag = '';

                if (!item.hasOwnProperty('get')) {

                   tag = tag_object_array.find(get_tag_by_id, item);

                } else if (item.get('display') !== null) {

                    tag = tag_object_array.find(get_tag_by_id, item.get('display'));

                } else {

                    tag = tag_object_array.find(get_tag_by_id, item.get('_id'));
                }
                
                
                
               // $(`#${tag.id}`).addClass('airdev-pill-selected');
                    
               new_selected_array.push(tag)
                
            	} catch(error) {  
                    
                    console.log(error)
                
        		}
                    
                    

        });
        

        i.data.selected = new_selected_array;
                
        if (single_select === true && i.data.selected.length > 0) {
         	
            publish_add(i.data.selected[0])
            
        }
        
        publish_all();	
        
        setTimeout(() => {

            // console.log("SET SELECTED CLASS _ SETTIMEOUT")
            
            i.data.selected.map(x => $(`#${canvasId} #${x.id}`).addClass('airdev-pill-selected'));
            
                },150);

    }
                     
    /// ------> END SET DEFAULT SELECTIONS                 
    
    // SELECT AND DESELECT TAGS WHEN THEY ARE CLICKED
    
    function selectTag() {

        // console.log("selectTag");
        instance.data.ignore_default = true;
        // console.log("i.data.ignore_default");
        // console.log(i.data.ignore_default);
        // console.log(i);
        // i.data.selected = [];
        let
            item = this.innerText,
            value = this.getAttribute("value"),
            thisObj = tag_object_array.find(get_tag_by_id, value);


        // console.log(this);
        // console.log(thisObj);
        // i.data.selected.map(x => console.log(x.id));

        if (i.data.selected.map(x => x.id == thisObj.id).includes(true)) {   		// Map the selected array to see if this object is currently selected

            // removes the item from the selected/"published" list
            // console.log("IF FLOW");

            this.classList.remove("airdev-pill-selected");			// Remove the 'Selected' class from this tag

            // console.log(this);
            

            // this.classList = ["airdev-pill airdev-pill-selected"]				// Add 'Selected' class to this tag
            // console.log(this.classList);

            // try {
            //     this.classList.remove("airdev-pill-selected");			// Remove the 'Selected' class from this tag
            //     console.log(this.classList);
            // } catch(e){}
            publish_remove(thisObj);

            publish_all();

        } else {
            
            // adds the item to the selected/"published" list
            // console.log("ELSE FLOW");

            if (single_select === true) {
                
                // console.log("ELSE > IF FLOW");
                
                if (value !== i.data.selected_value && i.data.selected.length > 0) {
                
                    // console.log("ELSE > IF > IF FLOW");
                    
                    publish_remove(i.data.selected_value);
                    
                }

                // Remove the 'Selected' class from other tags
                $(`#${canvasId} .airdev-pill-selected`).removeClass("airdev-pill-selected");

            }

            // console.log(this)

            this.classList.add("airdev-pill-selected");				// Add 'Selected' class to this tag

            // this.classList = ["airdev-pill airdev-pill-selected"]				// Add 'Selected' class to this tag
            // console.log(this.classList);
            
            publish_add(thisObj);

            publish_all()

        }

    }
    // -------> END SELECT/DESLECT FUNCTION


}