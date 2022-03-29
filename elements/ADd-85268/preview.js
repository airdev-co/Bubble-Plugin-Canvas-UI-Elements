function(instance, properties) {
    
    const size = properties.size;
    
    switch (size) {
          case "Small":
            
            instance.canvas.append(`<div style="width: 36px; height: 18px; background-color: #e7e9eb; border-radius: 18px;">
  <div style="position: absolute; width: 12px; height: 12px; border-radius: 13px; background-color: white; margin: 3px;">
  </div>
</div>`)
            
            break;
          case "Medium":
            
            instance.canvas.append(`<div style="width:42px; height: 24px; background-color: #e7e9eb; border-radius: 24px;">
  <div style="position: absolute; width: 18px; height: 18px; border-radius: 18px; background-color: white; margin: 3px;">
  </div>
</div>`)
            
            break;
            
          default:
            
            instance.canvas.append(`<div style="width: 48px; height: 30px; background-color: #e7e9eb; border-radius: 30px;">
  <div style="position: absolute; width: 24px; height: 24px; border-radius: 24px; background-color: white; margin: 3px;">
  </div>
</div>`)
            
            break;
        }
    
    
    
    
    



}