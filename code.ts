figma.loadFontAsync({ family: "Roboto", style: "Regular" })

setTimeout(function(){
  
  const nodes = figma.currentPage.selection
  const frame = figma.createFrame()
  const pink1 = 1
  const pink2 = 0.15
  const pink3 = 0.8
  const radius = 4
  frame.name = "Wire Box"
  frame.clipsContent = false

  let xPos = 0
  let yPos = 0

  // define shape types

  function rectOutline(node) {
    const rect = figma.createRectangle()

    let transformPos = node.absoluteTransform
    let newX = transformPos[0][2];
    let newY = transformPos[1][2];
       
    rect.name = node.name
    rect.x = newX
    rect.y = newY
    rect.rotation = node.rotation
    rect.resize(node.width,node.height)
    rect.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}]
    rect.strokes = [{type: 'SOLID', color: {r: pink1, g: pink2, b: pink3}}]
    rect.topRightRadius = radius
    rect.topLeftRadius = radius
    rect.bottomLeftRadius = radius
    rect.bottomRightRadius = radius
    
    frame.appendChild(rect)
  }

  function vectorOutline(node) {
    const vect = figma.createVector()
    const height = node.height
    const width = node.width

    let transformPos = node.absoluteTransform
    let newX = transformPos[0][2];
    let newY = transformPos[1][2];

    vect.rotation = node.rotation
    vect.resize(width,height)
    vect.vectorNetwork = node.vectorNetwork
    vect.x = newX
    vect.y = newY
    vect.strokeWeight = 1
    vect.strokes = [{type: 'SOLID', color: {r: pink1, g: pink2, b: pink3}}]
    
    frame.appendChild(vect)
  }

  function textOutline(node) {
    const textBlock = figma.createText()
    const height = node.height
    const width = node.width

    let transformPos = node.absoluteTransform
    let newX = transformPos[0][2];
    let newY = transformPos[1][2];
    
    textBlock.rotation = node.rotation
    textBlock.name = node.name
    textBlock.resize(width,height)
    textBlock.x = newX
    textBlock.y = newY

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

  function ellipseOutline(node) {
    const ellip = figma.createEllipse()
    const height = node.height
    const width = node.width

    let transformPos = node.absoluteTransform
    let newX = transformPos[0][2];
    let newY = transformPos[1][2];

    ellip.rotation = node.rotation
    ellip.resize(width,height)
    ellip.x = newX
    ellip.y = newY
    ellip.strokeWeight = 1
    ellip.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}]
    ellip.strokes = [{type: 'SOLID', color: {r: pink1, g: pink2, b: pink3}}]

    frame.appendChild(ellip)
  }

  function polygoneOutline(node) {
    const poly = figma.createPolygon()
    const height = node.height
    const width = node.width

    let transformPos = node.absoluteTransform
    let newX = transformPos[0][2];
    let newY = transformPos[1][2];

    poly.rotation = node.rotation
    poly.resize(width,height)
    poly.x = newX
    poly.y = newY
    poly.strokeWeight = 1
    poly.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}]
    poly.strokes = [{type: 'SOLID', color: {r: pink1, g: pink2, b: pink3}}]

    frame.appendChild(poly)
  }

  // determine parameters for showing

  function drawItems(node,nodeParent) {

    if(nodeParent.visible === true) {
      if (node.type === 'INSTANCE' || node.type ==='COMPONENT') {
        if (node.visible === true ) {
          if (node.backgrounds.length >=1 && node.width >= 0.1 && node.height >= 0.1) {
            rectOutline(node)
          }
        }
      }
      if (node.type === 'VECTOR') {
        if (node.visible === true && node.width >= 0.1 && node.height >= 0.1) {       
          vectorOutline(node)
        }
      }
      if (node.type === 'POLYGON') {
        if (node.visible === true) {       
          polygoneOutline(node)
        }
      }
      if (node.type === 'RECTANGLE') {      
        if (node.visible === true && node.fills.length >=1 && node.width >= 0.1 && node.height >= 0.1) {
          rectOutline(node)
        }
        if (node.strokeWeight >= 1.1) {
          rectOutline(node)
        }
      }
      if (node.type === 'ELLIPSE') {      
        if (node.visible === true && node.width >= 0.1 && node.height >= 0.1) {
          ellipseOutline(node)
        }
      }
      if (node.type === 'TEXT') {      
        if (node.visible === true && node.width >= 0.1 && node.height >= 0.1) {
          textOutline(node)
        }
      }
    }
  }

  // execute

  function recurse(parents){

    let arrayWidth = []
    let arrayHeight = []
    
    parents.forEach(parent => {
      drawItems(parent,parent)

      arrayWidth.push(parent.width)
      arrayHeight.push(parent.height)

      parent.children.forEach(child => {
        
        drawItems(child,parent)

        if ( "children" in child) {
          child.children.forEach(granchild => {
            drawItems(granchild,child)

            if ( "children" in granchild) {
              granchild.children.forEach(greatgranchild => {
                drawItems(greatgranchild,granchild)

                if ( "children" in greatgranchild) {
                  greatgranchild.children.forEach(greatgreatgranchild => {
                    drawItems(greatgreatgranchild,greatgranchild)

                    if ( "children" in greatgreatgranchild) {
                      greatgreatgranchild.children.forEach(greatgreatgreatgranchild => {
                        drawItems(greatgreatgreatgranchild,greatgreatgranchild)

                        if ( "children" in greatgreatgreatgranchild) {
                          greatgreatgreatgranchild.children.forEach(greatgreatgreatgreatgranchild => {
                            drawItems(greatgreatgreatgreatgranchild,greatgreatgreatgranchild)

                            if ("children" in greatgreatgreatgreatgranchild) {
                              greatgreatgreatgreatgranchild.children.forEach(greatgreatgreatgreatgreatgranchild => {
                                drawItems(greatgreatgreatgreatgreatgranchild,greatgreatgreatgreatgranchild)
                              })
                            }
                          })
                        }
                      })
                    }
                  })
                }
              })
            }
          });
        }
      })
    })
    console.log(arrayWidth)

    let frameWidth = Math.max(...arrayWidth)
    let frameheight = Math.max(...arrayHeight)
    frame.resize(frameWidth,frameheight)

    frame.x = frameWidth + 100
    frame.y = frameheight - frameheight
    
  }   

  recurse(nodes)
  
  figma.closePlugin()

}, 100)


