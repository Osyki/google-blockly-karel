
/* TODO: Change toolbox XML ID if necessary. Can export toolbox XML from Workspace Factory. */
var toolbox = document.getElementById("toolbox");

var options = {
    toolbox : toolbox,
    collapse : true,
    comments : true,
    disable : true,
    maxBlocks : Infinity,
    trashcan : true,
    horizontalLayout : false,
    toolboxPosition : 'start',
    css : true,
    media : 'https://blockly-demo.appspot.com/static/media/',
    rtl : false,
    scrollbars : true,
    sounds : true,
    oneBasedIndex : true,
    grid : {
        spacing : 20,
        length : 1,
        colour : '#888',
        snap : false
    },
    zoom : {
        controls : true,
        wheel : true,
        startScale : 1,
        maxScale : 3,
        minScale : 0.3,
        scaleSpeed : 1.2
    }
};

/* Inject your workspace */



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
