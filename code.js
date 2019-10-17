figma.loadFontAsync({ family: "Roboto", style: "Regular" });
setTimeout(function () {
    const nodes = figma.currentPage.selection;
    const frame = figma.createFrame();
    const pink1 = 1;
    const pink2 = 0.15;
    const pink3 = 0.8;
    const radius = 4;
    frame.name = "Wire Box";
    frame.clipsContent = false;
    let xPos = 0;
    let yPos = 0;
    // define shape types
    function rectOutline(node) {
        const rect = figma.createRectangle();
        let transformPos = node.absoluteTransform;
        let newX = transformPos[0][2];
        let newY = transformPos[1][2];
        rect.name = node.name;
        rect.x = newX;
        rect.y = newY;
        rect.resize(node.width, node.height);
        rect.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
        rect.strokes = [{ type: 'SOLID', color: { r: pink1, g: pink2, b: pink3 } }];
        rect.topRightRadius = radius;
        rect.topLeftRadius = radius;
        rect.bottomLeftRadius = radius;
        rect.bottomRightRadius = radius;
        frame.appendChild(rect);
    }
    function vectorOutline(node) {
        const vect = figma.createVector();
        const height = node.height;
        const width = node.width;
        let transformPos = node.absoluteTransform;
        let newX = transformPos[0][2];
        let newY = transformPos[1][2];
        vect.resize(width, height);
        vect.vectorNetwork = node.vectorNetwork;
        vect.x = newX;
        vect.y = newY;
        vect.strokeWeight = 1;
        vect.strokes = [{ type: 'SOLID', color: { r: pink1, g: pink2, b: pink3 } }];
        frame.appendChild(vect);
    }
    function textOutline(node) {
        const textBlock = figma.createText();
        const height = node.height;
        const width = node.width;
        let transformPos = node.absoluteTransform;
        let newX = transformPos[0][2];
        let newY = transformPos[1][2];
        textBlock.name = node.name;
        textBlock.resize(width, height);
        textBlock.x = newX;
        textBlock.y = newY;
        textBlock.characters = node.characters;
        textBlock.fills = [{ type: 'SOLID', color: { r: pink1, g: pink2, b: pink3 } }];
        textBlock.fontSize = node.fontSize;
        textBlock.lineHeight = node.lineHeight;
        textBlock.paragraphSpacing = node.paragraphSpacing;
        textBlock.textAlignHorizontal = node.textAlignHorizontal;
        textBlock.textAlignVertical = node.textAlignVertical;
        textBlock.textCase = node.textCase;
        textBlock.textDecoration = node.textDecoration;
        frame.appendChild(textBlock);
    }
    function ellipseOutline(node) {
        const ellip = figma.createEllipse();
        const height = node.height;
        const width = node.width;
        let transformPos = node.absoluteTransform;
        let newX = transformPos[0][2];
        let newY = transformPos[1][2];
        ellip.resize(width, height);
        ellip.x = newX;
        ellip.y = newY;
        ellip.strokeWeight = 1;
        ellip.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
        ellip.strokes = [{ type: 'SOLID', color: { r: pink1, g: pink2, b: pink3 } }];
        frame.appendChild(ellip);
    }
    // determine parameters for showing
    function drawItems(node) {
        if (node.type === 'INSTANCE' || node.type === 'COMPONENT') {
            if (node.visible === true) {
                if (node.backgrounds.length >= 1) {
                    rectOutline(node);
                }
            }
        }
        if (node.type === 'VECTOR') {
            if (node.visible === true) {
                vectorOutline(node);
            }
        }
        if (node.type === 'RECTANGLE') {
            if (node.visible === true) {
                rectOutline(node);
            }
        }
        if (node.type === 'ELLIPSE') {
            if (node.visible === true) {
                ellipseOutline(node);
            }
        }
        if (node.type === 'TEXT') {
            if (node.visible === true) {
                textOutline(node);
            }
        }
    }
    // execute
    function recurse(parents) {
        parents.forEach(parent => {
            drawItems(parent);
            parent.children.forEach(child => {
                drawItems(child);
                if ("children" in child) {
                    child.children.forEach(granchild => {
                        drawItems(granchild);
                        if ("children" in granchild) {
                            granchild.children.forEach(greatgranchild => {
                                drawItems(greatgranchild);
                                if ("children" in greatgranchild) {
                                    greatgranchild.children.forEach(greatgreatgranchild => {
                                        drawItems(greatgreatgranchild);
                                        if ("children" in greatgreatgranchild) {
                                            greatgreatgranchild.children.forEach(greatgreatgreatgranchild => {
                                                drawItems(greatgreatgreatgranchild);
                                                if ("children" in greatgreatgreatgranchild) {
                                                    greatgreatgreatgranchild.children.forEach(greatgreatgreatgreatgranchild => {
                                                        drawItems(greatgreatgreatgreatgranchild);
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        });
    }
    recurse(nodes);
    figma.closePlugin();
}, 100);
