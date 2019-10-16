figma.loadFontAsync({ family: "Roboto", style: "Regular" })

setTimeout(function(){
  
  const nodes = figma.currentPage.selection
  const radius = 4
  const frame = figma.createFrame()

  const pink1 = 1
  const pink2 = 0.15
  const pink3 = 0.8

  frame.name = "Wire Box"
  frame.clipsContent = false

  function rectOutline(node,xPos,yPos) {
    const rect = figma.createRectangle()
    
    rect.name = node.name
    rect.x = xPos + node.x
    rect.y = yPos + node.y
    rect.resize(node.width,node.height)
    rect.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}]
    rect.strokes = [{type: 'SOLID', color: {r: pink1, g: pink2, b: pink3}}]
    rect.topRightRadius = radius
    rect.topLeftRadius = radius
    rect.bottomLeftRadius = radius
    rect.bottomRightRadius = radius
    
    frame.appendChild(rect)
  }

  function vectorOutline(node,xPos,yPos) {
    const vect = figma.createVector()
    const height = node.height
    const width = node.width

    vect.resize(width,height)
    vect.vectorNetwork = node.vectorNetwork
    vect.x = xPos + node.x
    vect.y = yPos + node.y
    vect.strokeWeight = 1
    vect.strokes = [{type: 'SOLID', color: {r: pink1, g: pink2, b: pink3}}]
    
    frame.appendChild(vect)
  }

  function textOutline(node,xPos,yPos) {
    const textBlock = figma.createText()
    const height = node.height
    const width = node.width
    
    textBlock.name = node.name
    textBlock.resize(width,height)
    textBlock.x = xPos + node.x
    textBlock.y = yPos + node.y

    textBlock.characters = node.characters
    textBlock.fills = [{type: 'SOLID', color: {r: pink1, g: pink2, b: pink3}}]
    textBlock.fontSize = node.fontSize
    textBlock.lineHeight = node.lineHeight
    textBlock.paragraphSpacing = node.paragraphSpacing
    textBlock.textAlignHorizontal = node.textAlignHorizontal
    textBlock.textAlignVertical = node.textAlignVertical
    textBlock.textCase = node.textCase
    textBlock.textDecoration = node.textDecoration

    frame.appendChild(textBlock)
  }

  function ellipseOutline(node,xPos,yPos) {
    const ellip = figma.createEllipse()
    const height = node.height
    const width = node.width

    ellip.resize(width,height)
    
    ellip.x = xPos + node.x
    ellip.y = yPos + node.y
    ellip.strokeWeight = 1
    ellip.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}]
    ellip.strokes = [{type: 'SOLID', color: {r: pink1, g: pink2, b: pink3}}]

    frame.appendChild(ellip)
  }


  nodes.forEach(node => {

    let parentX = node.x
    let parentY = node.y
    let parentName = node.name
    
    if (node.type === 'INSTANCE') {

      if (node.backgrounds.length >=1) {
        rectOutline(node,0,0)
      }

      // console.log(parentX,parentY,parentName)
           
      node.children.forEach(child => {

        let parentXNested = parentX + child.x
        let parentYNested = parentY + child.y
        let parentName = node.name
        
        if (child.type === 'VECTOR') {         
          vectorOutline(child,parentX,parentY)
        }

        if (child.type === 'RECTANGLE') {
          
          if (child.visible === true) {
            rectOutline(child,parentX,parentY)
          }
   
        }
        
        if (child.type === 'INSTANCE') {

          if (child.visible === true && child.backgrounds.length >=1) {

            rectOutline(child,parentX,parentY)
          }

          if ( "children" in child) {

            if (child.visible === true) {
            
              child.children.forEach(childInner => {

                let parentXNestedNested = parentXNested + childInner.x
                let parentYNestedNested = parentYNested + childInner.y
                
                if (childInner.type === 'BOOLEAN_OPERATION') {

                  if( "children" in childInner) {

                    childInner.children.forEach(childInnerInner => {
                      
                      if (childInnerInner.type === 'VECTOR') {
                        vectorOutline(childInnerInner,parentXNestedNested,parentYNestedNested)
                      }
                    })
                  }
                }

                if (childInner.type === 'VECTOR') {
                  if (childInner.visible === true) {
                    vectorOutline(childInner,parentXNested,parentYNested)
                  }
                }

                if (childInner.type === 'TEXT') {
                  if (childInner.visible === true) {
                    textOutline(childInner,parentXNested,parentYNested)
                  }

                  
                }

                if (childInner.type === 'ELLIPSE') {
                  if (childInner.visible === true) {
                    ellipseOutline(childInner,parentXNested,parentYNested)
                  }
                }

                if (childInner.type === 'RECTANGLE') {
                  if (childInner.visible === true) {
                    rectOutline(childInner,parentXNested,parentYNested)
                  }
                }

              })
            }
          }

        }

        if (child.type === 'GROUP') {

          if(child.visible === true) {

            
            
            if( "children" in child) {
            
              child.children.forEach(childInner => {
  
                let parentInnerX = parentX + childInner.x
                let parentInnerY = parentY + childInner.y
  
  
                if (childInner.type === 'TEXT') {
  
                  if (childInner.visible === true) {
                   
                    textOutline(childInner,parentX,parentY)
                  
                  }
                }
  
                if (childInner.type === 'ELLIPSE') {
  
                  if (childInner.visible === true) {
                    ellipseOutline(childInner,parentX,parentY)
                  
                  }
                }
  
                if (childInner.type === 'INSTANCE') {
  
                  if (childInner.visible === true) {
  
                    if (childInner.backgrounds.length >=1) {
                      rectOutline(childInner,parentX,parentY)
                    }
  
                  }
                  
                  if( "children" in childInner) {
                    
                    childInner.children.forEach(childInnerInner => {
  
                      if (childInner.visible === true) {
                        if (childInnerInner.type === 'RECTANGLE' ) {
                          if (childInnerInner.visible === true) {
                            rectOutline(childInnerInner,parentInnerX,parentInnerY)
                            console.log(childInnerInner.name)
                          }
                        }
                        
                        if (childInnerInner.type === 'VECTOR' ) {
                          if (childInnerInner.visible === true) {
                            vectorOutline(childInnerInner,parentInnerX,parentInnerY)
                          }
                        }
    
                        if (childInnerInner.type === 'ELLIPSE' ) {
                          if (childInnerInner.visible === true) {
                            ellipseOutline(childInnerInner,parentInnerX,parentInnerY)
                          }
                        }
    
                        if (childInnerInner.type === 'BOOLEAN_OPERATION') {
                          
                          if( "children" in childInnerInner) {
    
                            childInnerInner.children.forEach(childInnerInnerInner => {
                              
                              if (childInnerInnerInner.type === 'VECTOR') {
                                if (childInnerInnerInner.visible === true) {
                                  vectorOutline(childInnerInnerInner,parentInnerX,parentInnerY)
                                }
                              }
                            })
                          }
                        }
                      }                                  
                    })
                  }
                }
              });
            }
          }
        }

        if (child.type === 'TEXT') {

          if (child.visible === true) {
           
            textOutline(child,parentX,parentY)

            // console.log(parentX,parentY,parentName)
            // console.log(child.x,child.y,child.name)
          }
        }

      })
    }

  })
  
  figma.closePlugin()

}, 100)
