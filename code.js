figma.loadFontAsync({ family: "Roboto", style: "Regular" });
setTimeout(function () {
    const nodes = figma.currentPage.selection;
    const radius = 4;
    const frame = figma.createFrame();
    // frame.x = figma.viewport.center.x - frame.width / 2
    // frame.y = figma.viewport.center.y - frame.height / 2
    const pink1 = 1;
    const pink2 = 0.3;
    const pink3 = 0.5;
    frame.name = "Wire Box";
    frame.clipsContent = false;
    nodes.forEach(node => {
        if (node.type === "INSTANCE") {
            const rect = figma.createRectangle();
            rect.name = node.name;
            const height = node.height;
            const width = node.width;
            const parentX = node.x;
            const parentY = node.y;
            console.log(parentX);
            rect.x = node.x;
            rect.y = node.y;
            rect.resize(width, height);
            rect.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
            rect.strokes = [{ type: 'SOLID', color: { r: pink1, g: pink2, b: pink3 } }];
            rect.topRightRadius = radius;
            rect.topLeftRadius = radius;
            rect.bottomLeftRadius = radius;
            rect.bottomRightRadius = radius;
            frame.appendChild(rect);
            node.children.forEach(child => {
                let nodeX = parentX + child.x;
                let nodeY = parentY + child.y;
                console.log(nodeX);
                if ("children" in child) {
                    child.children.forEach(childInner => {
                        // console.log(childInner.name)
                    });
                }
                if (child.type === 'VECTOR') {
                    const vect = figma.createVector();
                    const height = child.height;
                    const width = child.width;
                    let newParentX = parentX;
                    let newParentY = parentY;
                    vect.resize(width, height);
                    vect.vectorNetwork = child.vectorNetwork;
                    vect.x = newParentX + child.x;
                    vect.y = newParentY + child.y;
                    vect.strokeWeight = 0;
                    vect.fills = [{ type: 'SOLID', color: { r: pink1, g: pink2, b: pink3 } }];
                    frame.appendChild(vect);
                }
                if (child.type === 'INSTANCE') {
                    if (child.visible === true) {
                        const rect = figma.createRectangle();
                        const height = child.height;
                        const width = child.width;
                        let parent = child.parent;
                        let newParentX = parentX;
                        let newParentY = parentY;
                        rect.name = child.name;
                        rect.resize(width, height);
                        rect.x = newParentX + child.x;
                        rect.y = newParentY + child.y;
                        rect.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
                        rect.strokes = [{ type: 'SOLID', color: { r: pink1, g: pink2, b: pink3 } }];
                        rect.topRightRadius = radius;
                        rect.topLeftRadius = radius;
                        rect.bottomLeftRadius = radius;
                        rect.bottomRightRadius = radius;
                        frame.appendChild(rect);
                    }
                }
                if (child.type === 'GROUP') {
                    if ("children" in child) {
                        child.children.forEach(childInner => {
                            if (childInner.type === 'INSTANCE') {
                                let childInnerX = parentX + childInner.x;
                                let childInnerY = parentY + childInner.y;
                                if ("children" in childInner) {
                                    childInner.children.forEach(childInnerInner => {
                                        if (childInnerInner.type === 'VECTOR') {
                                            const vect = figma.createVector();
                                            const height = childInnerInner.height;
                                            const width = childInnerInner.width;
                                            let newParentX = parentX;
                                            let newParentY = parentY;
                                            vect.resize(width, height);
                                            vect.vectorNetwork = childInnerInner.vectorNetwork;
                                            vect.x = childInnerX + childInnerInner.x;
                                            vect.y = childInnerY + childInnerInner.y;
                                            vect.strokeWeight = 0;
                                            vect.fills = [{ type: 'SOLID', color: { r: pink1, g: pink2, b: pink3 } }];
                                            frame.appendChild(vect);
                                        }
                                    });
                                }
                            }
                        });
                    }
                }
                if (child.type === 'TEXT') {
                    if (child.visible === true) {
                        const textBlock = figma.createText();
                        const height = child.height;
                        const width = child.width;
                        let parent = child.parent;
                        let newParentX = parentX;
                        let newParentY = parentY;
                        textBlock.name = child.name;
                        textBlock.resize(width, height);
                        textBlock.x = newParentX + child.x;
                        textBlock.y = newParentY + child.y;
                        textBlock.characters = child.characters;
                        textBlock.fills = [{ type: 'SOLID', color: { r: pink1, g: pink2, b: pink3 } }];
                        textBlock.fontSize = child.fontSize;
                        textBlock.paragraphSpacing = child.paragraphSpacing;
                        textBlock.textAlignHorizontal = child.textAlignHorizontal;
                        textBlock.textAlignVertical = child.textAlignVertical;
                        textBlock.textCase = child.textCase;
                        textBlock.textDecoration = child.textDecoration;
                        frame.appendChild(textBlock);
                    }
                }
            });
        }
    });
    figma.closePlugin();
}, 100);
