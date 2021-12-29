import DarkTheme from "@blockly/theme-dark";

var toolbox = document.getElementById("toolbox");
var options = {
    toolbox: toolbox,
    comments: true,
    collapse: true,
    disable: true,
    horizontalLayout: false,
    maxBlocks: Infinity,
    media: '../../media/',
    oneBasedIndex: true,
    readOnly: false,
    rtl: false,
    move: {
        scrollbars: true,
        drag: true,
        wheel: false,
    },
    toolboxPosition: 'start',
    renderer: 'zelos',
    theme: DarkTheme,
    zoom:
        {
            controls: true,
            wheel: true,
            startScale: 1.0,
            maxScale: 4,
            minScale: 0.25,
            scaleSpeed: 1.1
        }
};

var blocklyArea = document.getElementById('blocklyArea');
var blocklyDiv = document.getElementById('blocklyDiv');
var demoWorkspace = Blockly.inject('blocklyDiv', options);
var onresize = function(e) {
    // Compute the absolute coordinates and dimensions of blocklyArea.
    var element = blocklyArea;
    var x = 0;
    var y = 0;
    do {
        x += element.offsetLeft;
        y += element.offsetTop;
        element = element.offsetParent;
    } while (element);
    // Position blocklyDiv over blocklyArea.
    blocklyDiv.style.left = x + 'px';
    blocklyDiv.style.top = y + 'px';
    blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
    blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
    Blockly.svgResize(demoWorkspace);
};
window.addEventListener('resize', onresize, false);
onresize();
Blockly.svgResize(demoWorkspace);
