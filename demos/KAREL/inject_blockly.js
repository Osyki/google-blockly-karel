//for theming purposes
goog.require('Blockly.zelos.Renderer');

//for toolbox
goog.require('KARELtoolbox');

//include all generators here
goog.require('Blockly.KAREL');


/**
 * Create a namespace for the application.
 */
var Code = {};

/**
 * Blockly's main workspace.
 * @type {Blockly.WorkspaceSvg}
 */
Code.workspace = null;

/**
 * Default toolbox
 * @type {{toolboxPosition: string, move: {scrollbars: boolean, wheel: boolean, drag: boolean}, renderer: string, comments: boolean, readOnly: boolean, zoom: {startScale: number, controls: boolean, maxScale: number, wheel: boolean, scaleSpeed: number, minScale: number}, media: string, maxBlocks: number, oneBasedIndex: boolean, horizontalLayout: boolean, disable: boolean, toolbox: ({contents: [{contents: [{kind: string, type: string}], kind: string, name: string},{kind: string, custom: string, name: string},{contents: [{kind: string, type: string},{kind: string, type: string},{kind: string, type: string}], kind: string, name: string}], kind: string}|{contents: [{colour: string, contents: [{kind: string, type: string}], kind: string, name: string},{contents: [{kind: string, type: string},{kind: string, type: string}], kind: string, name: string},{contents: [{kind: string, type: string}], kind: string, name: string}], kind: string}|*), theme: {fontStyle: {size: number, weight: string, family: string}, componentStyles: {toolboxForegroundColour: string, cursorColour: string, workspaceBackgroundColour: string, flyoutOpacity: number, scrollbarOpacity: number, flyoutForegroundColour: string, scrollbarColour: string, insertionMarkerOpacity: number, flyoutBackgroundColour: string, insertionMarkerColour: string, toolboxBackgroundColour: string}}, collapse: boolean}}
 */
Code.toolboxoptions = {
    toolbox: KARELtoolbox,
    comments: true,
    collapse: true,
    disable: true,
    horizontalLayout: false,
    maxBlocks: Infinity,
    media: '../../media/',
    oneBasedIndex: true,
    readOnly: false,
    move: {
        scrollbars: true, drag: true, wheel: false,
    },
    toolboxPosition: 'start',
    zoom: {
        controls: true,
        wheel: true,
        startScale: 0.90,
        maxScale: 4,
        minScale: 0.25,
        scaleSpeed: 1.1
    },
    renderer: 'zelos',
    theme: {
        'fontStyle': {
            "family": "Open Sans, serif", "weight": "normal", "size": 11,
        }, 'componentStyles': {
            'workspaceBackgroundColour': "#1e1e1e",
            'toolboxBackgroundColour': "#333",
            'toolboxForegroundColour': "#fff",
            'flyoutBackgroundColour': "#252526",
            'flyoutForegroundColour': "#ccc",
            'flyoutOpacity': 1,
            'scrollbarColour': "#797979",
            'insertionMarkerColour': "#fff",
            'insertionMarkerOpacity': .3,
            'scrollbarOpacity': .4,
            'cursorColour': "#d0d0d0",
        }
    }
};

/**
 * Blockly injection
 */
Code.init = function() {
    //inject blockly
    Code.workspace = Blockly.inject('content_area', Code.toolboxoptions);

    //adds a change listener to workspace for real-time code generation
    Code.workspace.addChangeListener(generateCode);
};


/**
 * Real-time generation of code
 */
function generateCode() {
    const content = document.getElementById('codeTextArea');
    content.textContent = Blockly.KAREL.workspaceToCode(Code.workspace);
}

/**
 * FIXME: New workspace
 */
function newWorkspaceXML() {
}

/**
 * FIXME: Save workspace
 */
function saveWorkspaceXML() {
}

/**
 * FIXME: Load workspace
 */
Code.loadWorkspaceXML = function() {

};

/**
 * run Blockly injection on page load
 */
window.addEventListener('load', Code.init);
