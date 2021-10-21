figma.loadFontAsync({ family: "Roboto", style: "Regular" });
let pink1 = 221 / 255;
let pink2 = 0 / 255;
let pink3 = 169 / 255;
let blue1 = 36 / 255;
let blue2 = 0 / 255;
let blue3 = 255 / 255;
let gold1 = 170 / 255;
let gold2 = 102 / 255;
let gold3 = 0 / 255;
let green1 = 2 / 255;
let green2 = 97 / 255;
let green3 = 40 / 255;
let charcoal1 = 31 / 255;
function fireItUp(color1, color2, color3) {
    setTimeout(function () {
        const nodes = figma.currentPage.selection;
        let selectedLayers = nodes;
        let nodesParent = nodes;
        let entirePage = figma.currentPage.children;
        let arrayParentX = [];
        let arrayParentY = [];
        let arrayAll = [];
        let arrayPagePosX = [];
        let arrayPagePosY = [];
        let arrayPageWidth = [];
        let frameNames = [];
        function errorMsg() {
            figma.closePlugin('⚠️ Please select a Frame to run Wire Box ⚠️');
        }
        if (selectedLayers.length === 0) {
            errorMsg();
        }
        else {
            entirePage.forEach(pageFrame => {
                if (pageFrame.type === 'FRAME') {
                    let pageX = pageFrame.x;
                    let pageY = pageFrame.y;
                    let pageWidth = pageFrame.width;
                    arrayPagePosX.push(pageX);
                    arrayPagePosY.push(pageY);
                    arrayPageWidth.push(pageWidth);
                    frameNames.push(pageFrame.name);
                    let finalPagePosX = Math.max(...arrayPagePosX);
                    let finalPagePosY = Math.min(...arrayPagePosY);
                }
            });
            nodesParent.forEach(mainParent => {
                // Ensure that we only fire the plugin when a Frame is selected
                if (mainParent.type === 'FRAME') {
                    const frameX = mainParent.x;
                    const frameY = mainParent.y;
                    arrayParentX.push(frameX);
                    arrayParentY.push(frameY);
                    const frame = figma.createFrame();
                    frame.name = "Wire Box / " + mainParent.name;
                    frame.clipsContent = true;
                    frame.setRelaunchData({ edit: "This frame was created with Wire Box, a hi-fi to lo-fi plugin" });
                    // Define shape types
                    function rectOutline(node) {
                        const rect = figma.createRectangle();
                        let transformPos = node.absoluteTransform;
                        let newX = transformPos[0][2];
                        let newY = transformPos[1][2];
                        rect.name = node.name;
                        rect.x = newX;
                        rect.y = newY;
                        rect.rotation = node.rotation;
                        rect.resize(node.width, node.height);
                        rect.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
                        rect.strokes = [{ type: 'SOLID', color: { r: color1, g: color2, b: color3 } }];
                        if (node.topLeftRadius >= 1 || node.topRightRadius >= 1 || node.bottomLeftRadius >= 1 || node.bottomRightRadius >= 1) {
                            rect.topRightRadius = node.topRightRadius;
                            rect.topLeftRadius = node.topLeftRadius;
                            rect.bottomLeftRadius = node.bottomLeftRadius;
                            rect.bottomRightRadius = node.bottomRightRadius;
                        }
                        frame.appendChild(rect);
                        arrayAll.push(rect);
                    }
                    function rectOutlineNoBg(node) {
                        const rect = figma.createRectangle();
                        let transformPos = node.absoluteTransform;
                        let newX = transformPos[0][2];
                        let newY = transformPos[1][2];
                        rect.name = node.name;
                        rect.x = newX;
                        rect.y = newY;
                        rect.rotation = node.rotation;
                        rect.resize(node.width, node.height);
                        rect.fills = [];
                        rect.strokes = [{ type: 'SOLID', color: { r: color1, g: color2, b: color3 } }];
                        if (node.topLeftRadius >= 1 || node.topRightRadius >= 1 || node.bottomLeftRadius >= 1 || node.bottomRightRadius >= 1) {
                            rect.topRightRadius = node.topRightRadius;
                            rect.topLeftRadius = node.topLeftRadius;
                            rect.bottomLeftRadius = node.bottomLeftRadius;
                            rect.bottomRightRadius = node.bottomRightRadius;
                        }
                        frame.appendChild(rect);
                        arrayAll.push(rect);
                    }
                    function vectorOutline(node) {
                        const vect = figma.createVector();
                        const height = node.height;
                        const width = node.width;
                        let transformPos = node.absoluteTransform;
                        let newX = transformPos[0][2];
                        let newY = transformPos[1][2];
                        vect.rotation = node.rotation;
                        vect.resize(width, height);
                        vect.vectorNetwork = node.vectorNetwork;
                        vect.x = newX;
                        vect.y = newY;
                        vect.strokeWeight = 1;
                        vect.strokes = [{ type: 'SOLID', color: { r: color1, g: color2, b: color3 } }];
                        frame.appendChild(vect);
                        arrayAll.push(vect);
                    }
                    function textOutline(node) {
                        const textBlock = figma.createText();
                        const height = node.height;
                        const width = node.width;
                        let transformPos = node.absoluteTransform;
                        let newX = transformPos[0][2];
                        let newY = transformPos[1][2];
                        // console.log(node.name, newX, newY)
                        textBlock.rotation = node.rotation;
                        textBlock.name = node.name;
                        textBlock.resize(width, height);
                        textBlock.x = newX;
                        textBlock.y = newY;
                        textBlock.characters = node.characters;
                        textBlock.fills = [{ type: 'SOLID', color: { r: color1, g: color2, b: color3 } }];
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
                        frame.appendChild(textBlock);
                        arrayAll.push(textBlock);
                    }
                    function ellipseOutline(node) {
                        const ellip = figma.createEllipse();
                        const height = node.height;
                        const width = node.width;
                        let transformPos = node.absoluteTransform;
                        let newX = transformPos[0][2];
                        let newY = transformPos[1][2];
                        ellip.rotation = node.rotation;
                        ellip.resize(width, height);
                        ellip.x = newX;
                        ellip.y = newY;
                        ellip.strokeWeight = 1;
                        ellip.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
                        ellip.strokes = [{ type: 'SOLID', color: { r: color1, g: color2, b: color3 } }];
                        frame.appendChild(ellip);
                        arrayAll.push(ellip);
                    }
                    function polygonOutline(node) {
                        const poly = figma.createPolygon();
                        const height = node.height;
                        const width = node.width;
                        let transformPos = node.absoluteTransform;
                        let newX = transformPos[0][2];
                        let newY = transformPos[1][2];
                        poly.rotation = node.rotation;
                        poly.resize(width, height);
                        poly.x = newX;
                        poly.y = newY;
                        poly.strokeWeight = 1;
                        poly.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
                        poly.strokes = [{ type: 'SOLID', color: { r: color1, g: color2, b: color3 } }];
                        frame.appendChild(poly);
                        arrayAll.push(poly);
                    }
                    // These functions dive deeper into the configuration of layers - sometimes layers have fills but arent visible
                    function hasVisibleBackgrounds(backgrounds) {
                        return backgrounds.find(background => background.visible);
                    }
                    function hasVisibleFills(fills) {
                        return fills.find(fill => fill.visible && (fill.type === 'SOLID' ||
                            fill.type === 'GRADIENT_LINEAR' ||
                            fill.type === 'GRADIENT_RADIAL' ||
                            fill.type === 'GRADIENT_ANGULAR' ||
                            fill.type === 'GRADIENT_DIAMOND' ||
                            fill.type === 'IMAGE'));
                    }
                    function hasVisibleStrokes(strokes) {
                        return strokes.find(stroke => stroke.visible && stroke.type === 'SOLID');
                    }
                    // Determine parameters for showing
                    function drawNode(node) {
                        if ((node.type === 'INSTANCE' || node.type === 'FRAME' || node.type === 'COMPONENT') && hasVisibleBackgrounds(node.backgrounds)) {
                            rectOutline(node);
                        }
                        // Check the width and height of the nodes as sometimes they can have a 0 height or width - which might just be a bug from Figmas end
                        if (node.type === 'VECTOR') {
                            if (node.width >= 0.1 && node.height >= 0.1 && node.isMask !== true) {
                                vectorOutline(node);
                            }
                        }
                        if (node.type === 'POLYGON') {
                            if (node.width >= 0.1 && node.height >= 0.1 && node.isMask !== true) {
                                polygonOutline(node);
                            }
                        }
                        if (node.type === 'RECTANGLE') {
                            if (node.fills.length >= 1 &&
                                node.width >= 0.1 &&
                                node.height >= 0.1 &&
                                node.opacity >= 0.5 &&
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
                        let arrayWidth = [];
                        let arrayHeight = [];
                        function drawChildren(children) {
                            children.forEach(child => {
                                if (!child.visible)
                                    return;
                                drawNode(child);
                                // Recursively draw childen
                                if ("children" in child)
                                    drawChildren(child.children);
                            });
                        }
                        parents.forEach(parent => {
                            if (!parent.visible)
                                return;
                            drawNode(parent);
                            arrayWidth.push(parent.width);
                            arrayHeight.push(parent.height);
                            drawChildren(parent.children);
                        });
                        // Some math for determining the new size of the created frame
                        let frameWidth = Math.max(...arrayWidth);
                        let frameheight = Math.max(...arrayHeight);
                        frame.resize(frameWidth, frameheight);
                        frame.x = frameX + frameWidth + 100;
                        frame.y = frameY;
                        // Group all the newly created layers, which are then placed at 0x 0y so everythings neat and tidy
                        figma.group(arrayAll, frame);
                        const location = figma.group(arrayAll, frame);
                        location.x = 0;
                        location.y = 0;
                    }
                    recurse(nodes);
                    // console.log(frameNames)
                    figma.closePlugin();
                    figma.notify("Wire Box created");
                }
                else {
                    errorMsg();
                }
            });
        }
        console.log("fired new way");
    }, 100);
} // close function: fireitup
figma.parameters.on('input', ({ query, key, result }) => {
    switch (key) {
        case 'color':
            const colors = ['pink', 'blue', 'charcoal', 'gold', 'green'];
            result.setSuggestions(colors.filter(s => s.includes(query)));
            break;
        default:
            return;
    }
});
// check for parameters
figma.on('run', ({ parameters }) => {
    if (parameters) {
        startPluginWithParameters(parameters);
    }
    else {
        fireItUp(pink1, pink2, pink3);
    }
});
// if parameters selected
function startPluginWithParameters(parameters) {
    var _a;
    if (parameters['color']) {
        const color = (_a = parameters['color']) !== null && _a !== void 0 ? _a : 'pink';
        if (color == 'pink') {
            fireItUp(pink1, pink2, pink3);
        }
        if (color == 'blue') {
            fireItUp(blue1, blue2, blue3);
        }
        if (color == 'gold') {
            fireItUp(gold1, gold2, gold3);
        }
        if (color == 'charcoal') {
            fireItUp(charcoal1, charcoal1, charcoal1);
        }
        if (color == 'green') {
            fireItUp(green1, green2, green3);
        }
    }
}
