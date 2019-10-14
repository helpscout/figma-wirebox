figma.loadFontAsync({ family: "Roboto", style: "Regular" })

setTimeout(function(){
  
  const nodes = figma.currentPage.selection
  const radius = 4
  const frame = figma.createFrame()

  const pink1 = 1
  const pink2 = 0.3
  const pink3 = 0.5

  frame.name = "Wire Box"
  frame.clipsContent = false

  nodes.forEach(node => {
    
    if (node.type === "INSTANCE" ) {

      const rect = figma.createRectangle()
      rect.name = node.name

      const height = node.height
      const width = node.width
      const parentX = node.x
      const parentY = node.y

      rect.x = node.x
      rect.y = node.y
      rect.resize(node.width,node.height)
      rect.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}]
      rect.strokes = [{type: 'SOLID', color: {r: pink1, g: pink2, b: pink3}}]
      rect.topRightRadius = radius
      rect.topLeftRadius = radius
      rect.bottomLeftRadius = radius
      rect.bottomRightRadius = radius
      frame.appendChild(rect)
      
      
      node.children.forEach(child => {

        if (child.type === 'VECTOR') {
          const vect = figma.createVector()
          const height = child.height
          const width = child.width
          let newParentX = parentX
          let newParentY = parentY

          vect.resize(width,height)
          vect.vectorNetwork = child.vectorNetwork
          vect.x = newParentX + child.x
          vect.y = newParentX + child.y
          vect.strokeWeight = 0
          vect.fills = [{type: 'SOLID', color: {r: pink1, g: pink2, b: pink3}}]
          frame.appendChild(vect)
        }
        
        if (child.type === 'INSTANCE') {

          if (child.visible === true) {
            
            const rect = figma.createRectangle()
            const height = child.height
            const width = child.width
            let parent = child.parent

            let newParentX = parentX
            let newParentY = parentY
          
            rect.name = child.name
            rect.resize(width,height)
            rect.x = newParentX + child.x
            rect.y = newParentY + child.y
            rect.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}]
            rect.strokes = [{type: 'SOLID', color: {r: pink1, g: pink2, b: pink3}}]
            rect.topRightRadius = radius
            rect.topLeftRadius = radius
            rect.bottomLeftRadius = radius
            rect.bottomRightRadius = radius
            frame.appendChild(rect)
          }
        }

        if (child.type === 'TEXT') {

          if (child.visible === true) {
          const textBlock = figma.createText()
          const height = child.height
          const width = child.width

          let parent = child.parent
          let newParentX = parentX
          let newParentY = parentY
          
          textBlock.name = child.name
          textBlock.resize(width,height)
          textBlock.x = newParentX + child.x
          textBlock.y = newParentY + child.y
          textBlock.characters = child.characters
          textBlock.fills = [{type: 'SOLID', color: {r: pink1, g: pink2, b: pink3}}]
          textBlock.fontSize = child.fontSize
          textBlock.paragraphSpacing = child.paragraphSpacing
          textBlock.textAlignHorizontal = child.textAlignHorizontal
          textBlock.textAlignVertical = child.textAlignVertical
          textBlock.textCase = child.textCase
          textBlock.textDecoration = child.textDecoration
          frame.appendChild(textBlock)
          }
        }

      })
    }

  })
  
  figma.closePlugin()

}, 100)
