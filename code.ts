figma.loadFontAsync({ family: "Roboto", style: "Regular" })

setTimeout(function(){
  
  const nodes = figma.currentPage.selection
  let selectedLayers = nodes
  let nodesParent = nodes
  let entirePage = figma.currentPage.children

  // Arrays for storing heights, widths, and new items created by the plugin

  let arrayParentX = []
  let arrayParentY = []
  let arrayAll = []
  let arrayPagePosX = []
  let arrayPagePosY = []
  let arrayPageWidth = []

  function errorMsg() {
    figma.closePlugin('⚠️ Please select a Frame, Component, or Instance to run Wire Box ⚠️');
  }

  if (selectedLayers.length === 0) {
    
    errorMsg()
  
  } else {


    entirePage.forEach(pageFrame => {

      if(pageFrame.type === 'FRAME') {
        
        let pageX = pageFrame.x
        let pageY = pageFrame.y
        let pageWidth = pageFrame.width

        arrayPagePosX.push(pageX)
        arrayPagePosY.push(pageY)
        arrayPageWidth.push(pageWidth)

        let finalPagePosX = Math.max(...arrayPagePosX)
        let finalPagePosY = Math.min(...arrayPagePosY)

        console.log(finalPagePosX)
        console.log(finalPagePosY)


      } 
    });
    
    nodesParent.forEach(mainParent => {

      // Ensure that we only fire the plugin when frames, components or instances are selected
      
      if (mainParent.type === 'FRAME' || mainParent.type === 'INSTANCE' || mainParent.type === 'COMPONENT') {

        const frameX = mainParent.x
        const frameY = mainParent.y

        arrayParentX.push(frameX)
        arrayParentY.push(frameY)

        const frame = figma.createFrame()
        const pink1 = 1
        const pink2 = 0.15
        const pink3 = 0.8
        frame.name = "Wire Box"
        frame.clipsContent = false

        // Define shape types

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

          if(node.topLeftRadius >=1 || node.topRightRadius >=1 || node.bottomLeftRadius >=1 || node.bottomRightRadius >=1) {
            rect.topRightRadius = node.topRightRadius
            rect.topLeftRadius = node.topLeftRadius
            rect.bottomLeftRadius = node.bottomLeftRadius
            rect.bottomRightRadius = node.bottomRightRadius
          }
         
          frame.appendChild(rect)
          arrayAll.push(rect)
        }

        function rectOutlineNoBg(node) {
          const rect = figma.createRectangle()

          let transformPos = node.absoluteTransform
          let newX = transformPos[0][2];
          let newY = transformPos[1][2];
            
          rect.name = node.name
          rect.x = newX
          rect.y = newY
          rect.rotation = node.rotation
          rect.resize(node.width,node.height)
          rect.fills = []
          rect.strokes = [{type: 'SOLID', color: {r: pink1, g: pink2, b: pink3}}]

          if(node.topLeftRadius >=1 || node.topRightRadius >=1 || node.bottomLeftRadius >=1 || node.bottomRightRadius >=1) {
            rect.topRightRadius = node.topRightRadius
            rect.topLeftRadius = node.topLeftRadius
            rect.bottomLeftRadius = node.bottomLeftRadius
            rect.bottomRightRadius = node.bottomRightRadius
          }
         
          frame.appendChild(rect)
          arrayAll.push(rect)
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
          arrayAll.push(vect)
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

          if (node.fontSize !== figma.mixed) {
            textBlock.fontSize = node.fontSize
          } else {
            textBlock.fontSize = 14
          }

          if (node.lineHeight !== figma.mixed) {
            textBlock.lineHeight = node.lineHeight
          }

          if (node.paragraphSpacing !== figma.mixed) {
            textBlock.paragraphSpacing = node.paragraphSpacing
          }
           
          textBlock.textAlignHorizontal = node.textAlignHorizontal
          textBlock.textAlignVertical = node.textAlignVertical

          if (node.textCase !== figma.mixed) {
            textBlock.textCase = node.textCase
          }
          

          frame.appendChild(textBlock)
          arrayAll.push(textBlock)
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
          arrayAll.push(ellip)
        }

        function polygonOutline(node) {
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
          arrayAll.push(poly)
        }

        // These functions dive deeper into the configuration of layers - sometimes layers have fills but arent visible for example

        function containsBg(arr,key,val,obj) {
          for (var i = 0; i < arr.length; i++) {
              if(arr[i][key] === val) return rectOutline(obj);
          }
          return false;
        }

        function containsDual(arr,key,val,key2,val2,obj) {
          for (var i = 0; i < arr.length; i++) {
              if(arr[i][key] === val && arr[i][key2] === val2 ) return rectOutline(obj);
          }
          return false;
        }

        function containsDualOutline(arr,key,val,key2,val2,obj) {
          for (var i = 0; i < arr.length; i++) {
              if(arr[i][key] === val && arr[i][key2] === val2 ) return rectOutlineNoBg(obj);
          }
          return false;
        }

        // Determine parameters for showing

        function drawItems(node,nodeParent,nodeGrandParent) {

          if(nodeParent.visible === true && nodeGrandParent.visible === true) {
            if (node.type === 'INSTANCE' || node.type ==='COMPONENT') {
              if (node.visible === true ) {

                const arrayBg = node.backgrounds
                containsBg(arrayBg,"visible",true,node) 
              }
            }

            // Check the width and height of the nodes as sometimes they can have a 0 height or width - which might just be a bug from Figmas end

            if (node.type === 'VECTOR') {
              if (node.visible === true && node.width >= 0.1 && node.height >= 0.1) {       
                vectorOutline(node)
              }
            }
            if (node.type === 'POLYGON') {
              if (node.visible === true && node.width >= 0.1 && node.height >= 0.1) {       
                polygonOutline(node)
              }
            }
            if (node.type === 'RECTANGLE') {      
              if (node.visible === true && node.fills.length >=1 && node.width >= 0.1 && node.height >= 0.1 && node.opacity >= 0.9 && node.isMask !== true && node.name !== 'Bounds' && node.name !== 'bounds') {
                
                const arrayBg = node.fills 
                containsDual(arrayBg,"type","SOLID","visible",true,node)
                containsDual(arrayBg,"type","IMAGE","visible",true,node) 
                
              }
              if (node.visible === true && node.strokeWeight >= 1.1 && node.name !== 'Bounds' && node.name !== 'bounds') {
                const arrayBg = node.strokes
                containsDualOutline(arrayBg,"type","SOLID","visible",true,node)
                
              }

              if (node.visible === true && node.strokeWeight === 1 && node.fills.length === 0 && node.name !== 'Bounds' && node.name !== 'bounds') {
                const arrayBg = node.strokes
                containsDualOutline(arrayBg,"type","SOLID","visible",true,node)
                
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

            // Checks 3 levels of depth for each node - the current node, its parent, and its grandparent. The Figma API will return a node as visible, however its parent, for example, might not be. If so we don't want to render said node.

            drawItems(parent,parent,parent)

            arrayWidth.push(parent.width)
            arrayHeight.push(parent.height)

            parent.children.forEach(child => {

              drawItems(child,parent,parent)

              if ( "children" in child) {
                child.children.forEach(granchild => {
                  drawItems(granchild,child,parent)

                  if ( "children" in granchild) {
                    granchild.children.forEach(greatgranchild => {
                      drawItems(greatgranchild,granchild,child)

                      if ( "children" in greatgranchild) {
                        greatgranchild.children.forEach(greatgreatgranchild => {
                          drawItems(greatgreatgranchild,greatgranchild,granchild)

                          if ( "children" in greatgreatgranchild) {
                            greatgreatgranchild.children.forEach(greatThreegranchild => {
                              drawItems(greatThreegranchild,greatgreatgranchild,greatgranchild)

                              if ( "children" in greatThreegranchild) {
                                greatThreegranchild.children.forEach(greatFourgranchild => {
                                  drawItems(greatFourgranchild,greatThreegranchild,greatgreatgranchild)

                                  if ("children" in greatFourgranchild) {
                                    greatFourgranchild.children.forEach(greatFivegranchild => {
                                      drawItems(greatFivegranchild,greatFourgranchild,greatThreegranchild)

                                      if ("children" in greatFivegranchild) {
                                        greatFivegranchild.children.forEach(greatSixgranchild => {
                                          drawItems(greatSixgranchild,greatFivegranchild,greatFourgranchild)

                                          if ("children" in greatSixgranchild) {
                                            greatSixgranchild.children.forEach(greatSevengranchild => {
                                              drawItems(greatSevengranchild,greatSixgranchild,greatFivegranchild)
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
                        })
                      }
                    })
                  }
                });
              }
            })
          })

          // Some math for determining the new size of the created frame

          let frameWidth = Math.max(...arrayWidth)
          let frameheight = Math.max(...arrayHeight)
          frame.resize(frameWidth,frameheight)

          frame.x = frameX + frameWidth + 100
          frame.y = frameY 
          
          // Group all the newly created layers, which are then placed at 0x 0y so everythings neat and tidy
          
          figma.group(arrayAll,frame)
          const location = figma.group(arrayAll,frame)

          location.x = 0
          location.y = 0
        }   

        recurse(nodes)

        figma.closePlugin()

      } else {
        errorMsg()
      }
    });  
  }

}, 100)


