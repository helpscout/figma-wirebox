figma.loadFontAsync({ family: "Roboto", style: "Regular" });
setTimeout(function () {
    const nodes = figma.currentPage.selection;
    const radius = 4;
    const frame = figma.createFrame();
    const pink1 = 1;
    const pink2 = 0.3;
    const pink3 = 0.5;
    frame.name = "Wire Box";
    frame.clipsContent = false;
    nodes.forEach(node => {
        if (node.type === "INSTANCE") {
            const rect = figma.createRectangle();
            const height = node.height;
            const width = node.width;
            const parentX = node.x;
            const parentY = node.y;
            rect.name = node.name;
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
                // console.log(nodeX,nodeY, child.name)
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
                    let newParentX = parentX;
                    let newParentY = parentY;
                    let nestedX = child.x;
                    let nestedY = child.y;
                    console.log(child.x, child.y);
                    if (child.visible === true) {
                        const rect = figma.createRectangle();
                        const height = child.height;
                        const width = child.width;
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
                    if ("children" in child) {
                        child.children.forEach(childInner => {
                            if (childInner.type === 'BOOLEAN_OPERATION') {
                                console.log(childInner.x, childInner.y);
                                if ("children" in childInner) {
                                    childInner.children.forEach(childInnerInner => {
                                        if (childInnerInner.type === 'VECTOR') {
                                            const vect = figma.createVector();
                                            const height = childInnerInner.height;
                                            const width = childInnerInner.width;
                                            vect.resize(width, height);
                                            vect.vectorNetwork = childInnerInner.vectorNetwork;
                                            vect.x = nestedX + childInnerInner.x;
                                            vect.y = nestedY + childInnerInner.y;
                                            console.log(childInnerInner.x, childInnerInner.y);
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
                if (child.type === 'GROUP') {
                    let newParentX = parentX;
                    let newParentY = parentY;
                    // console.log(newParentX,newParentY, child.name)
                    if ("children" in child) {
                        child.children.forEach(childInner => {
                            if (childInner.type === 'TEXT') {
                                if (childInner.visible === true) {
                                    const textBlock = figma.createText();
                                    const height = childInner.height;
                                    const width = childInner.width;
                                    textBlock.name = childInner.name;
                                    textBlock.resize(width, height);
                                    textBlock.x = newParentX + childInner.x;
                                    textBlock.y = newParentY + childInner.y;
                                    // console.log(textBlock.x,textBlock.y, textBlock.name)
                                    textBlock.characters = childInner.characters;
                                    textBlock.fills = [{ type: 'SOLID', color: { r: pink1, g: pink2, b: pink3 } }];
                                    textBlock.fontSize = childInner.fontSize;
                                    textBlock.lineHeight = childInner.lineHeight;
                                    textBlock.paragraphSpacing = childInner.paragraphSpacing;
                                    textBlock.textAlignHorizontal = childInner.textAlignHorizontal;
                                    textBlock.textAlignVertical = childInner.textAlignVertical;
                                    textBlock.textCase = childInner.textCase;
                                    textBlock.textDecoration = childInner.textDecoration;
                                    frame.appendChild(textBlock);
                                }
                            }
                            if (childInner.type === 'INSTANCE') {
                                let childInnerX = parentX + childInner.x;
                                let childInnerY = parentY + childInner.y;
                                if ("children" in childInner) {
                                    childInner.children.forEach(childInnerInner => {
                                        if (childInnerInner.type === 'VECTOR') {
                                            const vect = figma.createVector();
                                            const height = childInnerInner.height;
                                            const width = childInnerInner.width;
                                            vect.resize(width, height);
                                            vect.vectorNetwork = childInnerInner.vectorNetwork;
                                            vect.x = childInnerX + childInnerInner.x;
                                            vect.y = childInnerY + childInnerInner.y;
                                            vect.strokeWeight = 0;
                                            vect.fills = [{ type: 'SOLID', color: { r: pink1, g: pink2, b: pink3 } }];
                                            frame.appendChild(vect);
                                        }
                                        if (childInnerInner.type === 'ELLIPSE') {
                                            const rect = figma.createEllipse();
                                            const height = childInnerInner.height;
                                            const width = childInnerInner.width;
                                            rect.resize(width, height);
                                            rect.x = childInnerX + childInnerInner.x;
                                            rect.y = childInnerY + childInnerInner.y;
                                            rect.strokeWeight = 0;
                                            rect.fills = [{ type: 'SOLID', color: { r: pink1, g: pink2, b: pink3 } }];
                                            frame.appendChild(rect);
                                        }
                                        if (childInnerInner.type === 'BOOLEAN_OPERATION') {
                                            // console.log(childInnerInner.name)
                                            if ("children" in childInnerInner) {
                                                childInnerInner.children.forEach(childInnerInnerInner => {
                                                    if (childInnerInnerInner.type === 'VECTOR') {
                                                        const vect = figma.createVector();
                                                        const height = childInnerInnerInner.height;
                                                        const width = childInnerInnerInner.width;
                                                        vect.resize(width, height);
                                                        vect.vectorNetwork = childInnerInnerInner.vectorNetwork;
                                                        vect.x = childInnerX + childInnerInnerInner.x;
                                                        vect.y = childInnerY + childInnerInnerInner.y;
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
                        textBlock.lineHeight = child.lineHeight;
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
