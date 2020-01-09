figma.loadFontAsync({ family: "Roboto", style: "Regular" });
setTimeout(function () {
    var nodes = figma.currentPage.selection;
    var selectedLayers = nodes;
    var nodesParent = nodes;
    var entirePage = figma.currentPage.children;
    // Arrays for storing heights, widths, and new items created by the plugin
    var arrayParentX = [];
    var arrayParentY = [];
    var arrayAll = [];
    var arrayPagePosX = [];
    var arrayPagePosY = [];
    var arrayPageWidth = [];
    function errorMsg() {
        figma.closePlugin('⚠️ Please select a Frame, Component, or Instance to run Wire Box ⚠️');
    }
    if (selectedLayers.length === 0) {
        errorMsg();
    }
    else {
        entirePage.forEach(function (pageFrame) {
            if (pageFrame.type === 'FRAME') {
                var pageX = pageFrame.x;
                var pageY = pageFrame.y;
                var pageWidth = pageFrame.width;
                arrayPagePosX.push(pageX);
                arrayPagePosY.push(pageY);
                arrayPageWidth.push(pageWidth);
                var finalPagePosX = Math.max.apply(Math, arrayPagePosX);
                var finalPagePosY = Math.min.apply(Math, arrayPagePosY);
                // console.log(finalPagePosX)
                // console.log(finalPagePosY)
            }
        });
        nodesParent.forEach(function (mainParent) {
            // Ensure that we only fire the plugin when frames, components or instances are selected
            if (mainParent.type === 'FRAME' || mainParent.type === 'INSTANCE' || mainParent.type === 'COMPONENT') {
                var frameX_1 = mainParent.x;
                var frameY_1 = mainParent.y;
                arrayParentX.push(frameX_1);
                arrayParentY.push(frameY_1);
                var frame_1 = figma.createFrame();
                var pink1_1 = 1;
                var pink2_1 = 0.15;
                var pink3_1 = 0.8;
                frame_1.name = "Wire Box";
                frame_1.clipsContent = false;
                // Define shape types
                function rectOutline(node) {
                    var rect = figma.createRectangle();
                    var transformPos = node.absoluteTransform;
                    var newX = transformPos[0][2];
                    var newY = transformPos[1][2];
                    rect.name = node.name;
                    rect.x = newX;
                    rect.y = newY;
                    rect.rotation = node.rotation;
                    rect.resize(node.width, node.height);
                    rect.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
                    rect.strokes = [{ type: 'SOLID', color: { r: pink1_1, g: pink2_1, b: pink3_1 } }];
                    if (node.topLeftRadius >= 1 || node.topRightRadius >= 1 || node.bottomLeftRadius >= 1 || node.bottomRightRadius >= 1) {
                        rect.topRightRadius = node.topRightRadius;
                        rect.topLeftRadius = node.topLeftRadius;
                        rect.bottomLeftRadius = node.bottomLeftRadius;
                        rect.bottomRightRadius = node.bottomRightRadius;
                    }
                    frame_1.appendChild(rect);
                    arrayAll.push(rect);
                }
                function rectOutlineNoBg(node) {
                    var rect = figma.createRectangle();
                    var transformPos = node.absoluteTransform;
                    var newX = transformPos[0][2];
                    var newY = transformPos[1][2];
                    rect.name = node.name;
                    rect.x = newX;
                    rect.y = newY;
                    rect.rotation = node.rotation;
                    rect.resize(node.width, node.height);
                    rect.fills = [];
                    rect.strokes = [{ type: 'SOLID', color: { r: pink1_1, g: pink2_1, b: pink3_1 } }];
                    if (node.topLeftRadius >= 1 || node.topRightRadius >= 1 || node.bottomLeftRadius >= 1 || node.bottomRightRadius >= 1) {
                        rect.topRightRadius = node.topRightRadius;
                        rect.topLeftRadius = node.topLeftRadius;
                        rect.bottomLeftRadius = node.bottomLeftRadius;
                        rect.bottomRightRadius = node.bottomRightRadius;
                    }
                    frame_1.appendChild(rect);
                    arrayAll.push(rect);
                }
                function vectorOutline(node) {
                    var vect = figma.createVector();
                    var height = node.height;
                    var width = node.width;
                    var transformPos = node.absoluteTransform;
                    var newX = transformPos[0][2];
                    var newY = transformPos[1][2];
                    vect.rotation = node.rotation;
                    vect.resize(width, height);
                    vect.vectorNetwork = node.vectorNetwork;
                    vect.x = newX;
                    vect.y = newY;
                    vect.strokeWeight = 1;
                    vect.strokes = [{ type: 'SOLID', color: { r: pink1_1, g: pink2_1, b: pink3_1 } }];
                    frame_1.appendChild(vect);
                    arrayAll.push(vect);
                }
                function textOutline(node) {
                    var textBlock = figma.createText();
                    var height = node.height;
                    var width = node.width;
                    var transformPos = node.absoluteTransform;
                    var newX = transformPos[0][2];
                    var newY = transformPos[1][2];
                    textBlock.rotation = node.rotation;
                    textBlock.name = node.name;
                    textBlock.resize(width, height);
                    textBlock.x = newX;
                    textBlock.y = newY;
                    textBlock.characters = node.characters;
                    textBlock.fills = [{ type: 'SOLID', color: { r: pink1_1, g: pink2_1, b: pink3_1 } }];
                    if (node.fontSize !== figma.mixed) {
                        textBlock.fontSize = node.fontSize;
                    }
                    else {
                        textBlock.fontSize = 14;
                    }
                    if (node.lineHeight !== figma.mixed) {
                        textBlock.lineHeight = node.lineHeight;
                    }
                    if (node.paragraphSpacing !== figma.mixed) {
                        textBlock.paragraphSpacing = node.paragraphSpacing;
                    }
                    textBlock.textAlignHorizontal = node.textAlignHorizontal;
                    textBlock.textAlignVertical = node.textAlignVertical;
                    if (node.textCase !== figma.mixed) {
                        textBlock.textCase = node.textCase;
                    }
                    frame_1.appendChild(textBlock);
                    arrayAll.push(textBlock);
                }
                function ellipseOutline(node) {
                    var ellip = figma.createEllipse();
                    var height = node.height;
                    var width = node.width;
                    var transformPos = node.absoluteTransform;
                    var newX = transformPos[0][2];
                    var newY = transformPos[1][2];
                    ellip.rotation = node.rotation;
                    ellip.resize(width, height);
                    ellip.x = newX;
                    ellip.y = newY;
                    ellip.strokeWeight = 1;
                    ellip.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
                    ellip.strokes = [{ type: 'SOLID', color: { r: pink1_1, g: pink2_1, b: pink3_1 } }];
                    frame_1.appendChild(ellip);
                    arrayAll.push(ellip);
                }
                function polygonOutline(node) {
                    var poly = figma.createPolygon();
                    var height = node.height;
                    var width = node.width;
                    var transformPos = node.absoluteTransform;
                    var newX = transformPos[0][2];
                    var newY = transformPos[1][2];
                    poly.rotation = node.rotation;
                    poly.resize(width, height);
                    poly.x = newX;
                    poly.y = newY;
                    poly.strokeWeight = 1;
                    poly.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
                    poly.strokes = [{ type: 'SOLID', color: { r: pink1_1, g: pink2_1, b: pink3_1 } }];
                    frame_1.appendChild(poly);
                    arrayAll.push(poly);
                }
                // These functions dive deeper into the configuration of layers - sometimes layers have fills but arent visible for example
                function hasVisibleBackgrounds(backgrounds) {
                    return backgrounds.find(function (background) { return background.visible; });
                }
                function hasVisibleFills(fills) {
                    return fills.find(function (fill) { return fill.visible && (fill.type === 'SOLID' || fill.type === 'IMAGE'); });
                }
                function hasVisibleStrokes(strokes) {
                    return strokes.find(function (stroke) { return stroke.visible && stroke.type === 'SOLID'; });
                }
                // Determine parameters for showing
                function drawNode(node) {
                    if ((node.type === 'INSTANCE' || node.type === 'COMPONENT') && hasVisibleBackgrounds(node.backgrounds)) {
                        rectOutline(node);
                    }
                    // Check the width and height of the nodes as sometimes they can have a 0 height or width - which might just be a bug from Figmas end
                    if (node.type === 'VECTOR') {
                        if (node.width >= 0.1 && node.height >= 0.1) {
                            vectorOutline(node);
                        }
                    }
                    if (node.type === 'POLYGON') {
                        if (node.width >= 0.1 && node.height >= 0.1) {
                            polygonOutline(node);
                        }
                    }
                    if (node.type === 'RECTANGLE') {
                        if (node.fills.length >= 1 &&
                            node.width >= 0.1 &&
                            node.height >= 0.1 &&
                            node.opacity >= 0.9 &&
                            node.isMask !== true &&
                            node.name !== 'Bounds' &&
                            node.name !== 'bounds' &&
                            hasVisibleFills(node.fills)) {
                            rectOutline(node);
                        }
                        if (node.strokeWeight >= 1.1 &&
                            node.name !== 'Bounds' &&
                            node.name !== 'bounds' &&
                            hasVisibleStrokes(node.strokes)) {
                            rectOutlineNoBg(node);
                        }
                        if (node.strokeWeight === 1 &&
                            node.fills.length === 0 &&
                            node.name !== 'Bounds' &&
                            node.name !== 'bounds' &&
                            hasVisibleStrokes(node.strokes)) {
                            rectOutlineNoBg(node);
                        }
                    }
                    if (node.type === 'ELLIPSE' && node.width >= 0.1 && node.height >= 0.1) {
                        ellipseOutline(node);
                    }
                    if (node.type === 'TEXT' && node.width >= 0.1 && node.height >= 0.1) {
                        textOutline(node);
                    }
                }
                // execute
                function recurse(parents) {
                    var arrayWidth = [];
                    var arrayHeight = [];
                    function drawChildren(children) {
                        children.forEach(function (child) {
                            if (!child.visible)
                                return;
                            drawNode(child);
                            // Recursively draw childen
                            if ("children" in child)
                                drawChildren(child.children);
                        });
                    }
                    parents.forEach(function (parent) {
                        if (!parent.visible)
                            return;
                        drawNode(parent);
                        arrayWidth.push(parent.width);
                        arrayHeight.push(parent.height);
                        drawChildren(parent.children);
                    });
                    // Some math for determining the new size of the created frame
                    var frameWidth = Math.max.apply(Math, arrayWidth);
                    var frameheight = Math.max.apply(Math, arrayHeight);
                    frame_1.resize(frameWidth, frameheight);
                    frame_1.x = frameX_1 + frameWidth + 100;
                    frame_1.y = frameY_1;
                    // Group all the newly created layers, which are then placed at 0x 0y so everythings neat and tidy
                    figma.group(arrayAll, frame_1);
                    var location = figma.group(arrayAll, frame_1);
                    location.x = 0;
                    location.y = 0;
                }
                recurse(nodes);
                figma.closePlugin();
            }
            else {
                errorMsg();
            }
        });
    }
}, 100);
