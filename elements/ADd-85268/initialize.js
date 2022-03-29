function(instance, context) {
    
    instance.data.id = "toggle-" + Math.floor((1 + Math.random()) * 10000).toString(16).substring(1);
    instance.canvas.append(`<ion-toggle id="${instance.data.id}" mode="ios"></ion-toggle>`)

}