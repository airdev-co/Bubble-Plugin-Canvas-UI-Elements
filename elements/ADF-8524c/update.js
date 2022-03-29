function(instance, properties, context) {

    // Set custom background color
    $('head').append(`
    <style>
        #canvas-loader {
            background: ${properties.background_color};
            }
    </style>
    `)
    
    const animation = properties.lottie_code || `<lottie-player src="//dd7tel2830j4w.cloudfront.net/f1635867089149x174346037682571620/canvasLottieAnimation.json"  background="transparent"  speed="1"  style="width: 150px; height: 150px;"  loop autoplay></lottie-player>`;

    // Inject custom loader animation code
    $('#canvas-loader .canvas-loader').html(animation);

    // Check if the text html element has been injected and if 
    // custom text has been added to the plugin element
    if ($('#canvas-loader .canvas-loader-text').length > 0 && properties.text != null) {

        // Replace the existing text with new text 
        $('#canvas-loader .canvas-loader-text').text(properties.text)

    } else if (properties.text != null) {

        // Inject html element to display the text
        $('#canvas-loader').append(`<span class='canvas-loader-text' style="margin-top: ${properties.text_position}px; text-align: center; font-size: ${properties.bubble.font_size()}px; color: ${properties.bubble.font_color()}; font-family: ${properties.bubble.font_face()}!important;">${properties.text}</span>`)

    }

    // Check if the loader should be auto closed. 
    // If true, change the CSS styling after the seconds defined in the plugin element
    if (properties.auto_close) {

        $(document).ready(function () {

            setTimeout(function () {

                document.querySelector("#canvas-loader").style.display = "none";
                document.querySelector("body").style.visibility = "visible";

            }, (properties.auto_close_delay || 5000))

        })
    }
}