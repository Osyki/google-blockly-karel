//for theming purposes
goog.require('Blockly.zelos.Renderer');

//for toolbox
goog.require('KARELtoolbox');

//include all generators here
goog.require('Blockly.KAREL');


/**
 * Create a namespace for the application.
 */
const Code = {};

/**
 * Blockly's main workspace.
 * @type {Blockly.WorkspaceSvg}
 */
Code.workspace = null;

/**
 * default option is KAREL FIXME: (change to C++ later)
 * @type {{contents: [{contents: [{kind: string, type: string}], kind: string, name: string},{kind: string, custom: string, name: string},{contents: [{kind: string, type: string},{kind: string, type: string},{kind: string, type: string}], kind: string, name: string}], kind: string}|{contents, kind: string}|*}
 */
Code.toolbox = KARELToolbox;

/**
 * Tab names for each generator
 * @type {string[]}
 */
Code.tabs = ['KAREL', 'C++'];

/**
 * Current tab
 */
Code.currentTab = 'KAREL';

/**
 * Default toolbox set to KARELtoolbox currently
 * @type {{toolboxPosition: string, move: {scrollbars: boolean, wheel: boolean, drag: boolean}, renderer: string, comments: boolean, readOnly: boolean, zoom: {startScale: number, controls: boolean, maxScale: number, wheel: boolean, scaleSpeed: number, minScale: number}, media: string, maxBlocks: number, oneBasedIndex: boolean, horizontalLayout: boolean, disable: boolean, toolbox: ({contents: [{contents: [{kind: string, type: string}], kind: string, name: string},{kind: string, custom: string, name: string},{contents: [{kind: string, type: string},{kind: string, type: string},{kind: string, type: string}], kind: string, name: string}], kind: string}|{contents: [{colour: string, contents: [{kind: string, type: string}], kind: string, name: string},{contents: [{kind: string, type: string},{kind: string, type: string}], kind: string, name: string},{contents: [{kind: string, type: string}], kind: string, name: string}], kind: string}|*), theme: {fontStyle: {size: number, weight: string, family: string}, componentStyles: {toolboxForegroundColour: string, cursorColour: string, workspaceBackgroundColour: string, flyoutOpacity: number, scrollbarOpacity: number, flyoutForegroundColour: string, scrollbarColour: string, insertionMarkerOpacity: number, flyoutBackgroundColour: string, insertionMarkerColour: string, toolboxBackgroundColour: string}}, collapse: boolean}}
 */
Code.toolboxoptions = {
    toolbox: Code.toolbox,
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
    Code.workspace.addChangeListener(Code.checkWorkspace);
};

/**
 * FIXME: Used to validate current workspace
 * FIXME: Function to check if block placement is valid. If valid, generate code. Otherwise, throw error
 */
Code.checkWorkspace = function() {
    if (Code.validWorkspace()) {
        Code.generateCode();
    } else {
        //FIXME: Change alert to modal + button.
        alert('ERROR: Invalid block placement. Removing last placed block.');
    }
}

/**
 * Helper function to validate workspace
 */
Code.validWorkspace = function() {
    //TODO: Validate variables are being used correctly in order
    return true;
}

/**
 * Case to add main block depending on currentTab
 */
Code.addMainBlock = function() {
    //TODO: Switch with cases for KAREL and C++
}

/**
 * Real-time generation of code
 * FIXME: Need C++ generator
 */
Code.generateCode = function() {
    const content = document.getElementById('codeTextArea');
    Code.swapToolbar();
    content.style.whiteSpace = "pre";
    switch (Code.currentTab) {
        case 'KAREL':
            // FIXME: Function to add main block to KAREL workspace
            Code.addMainBlock();
            content.textContent = Blockly.KAREL.workspaceToCode(Code.workspace);
            break;

        // case 'C++':
            // FIXME: Function to add main block to C++ workspace
        //     Code.addMainBlock();
            // content.textContent = Code.currentTab + ' not defined yet!';
            // break;

        default:
            content.style.whiteSpace = "pre-line";
            content.textContent = Code.currentTab + ' not defined yet!\n\n' +
                'You need to add a case for your tab in the Code.generateCode function in inject_blockly.js.';
            break;
    }

}
/**
 * Swap toolbar
 */
Code.swapToolbar = function () {
    //TODO: Switch to swap toolbar
    switch (Code.currentTab) {
        case 'KAREL':
            Code.toolbox = KARELToolbox;
            break;

        //FIXME: C++ toolbox
        case 'C++':
        default:
            Code.toolbox = blankToolbox;
    }
    Code.workspace.updateToolbox(Code.toolbox);
}

/**
 * FIXME: Changes workspace/codegeneration. Need to implement C++
 */
Code.changeWorkspace = function(buttonName) {
    let warningText = 'Are you sure you want to switch tabs? ' +
        'Doing so will reset your current workspace.';

    //FIXME: Change modal+button instead of a confirmation alert.
    if (confirm(warningText) === true) {
        //changes old currentTab back to gray
        var tabElement = document.getElementById(Code.currentTab);
        tabElement.className = 'tabbuttonoff';
        tabElement.parentElement.className = 'tabdivoff';
        //changes new currentTab to active
        Code.currentTab = buttonName;
        tabElement = document.getElementById(Code.currentTab);
        tabElement.className = 'tabbuttonon';
        tabElement.parentElement.className = 'tabdivon';
        //clear workspace, swap toolbar and set new generator
        Code.workspace.clear();
        Code.generateCode();
    }

}

/**
 * FIXME: New workspace
 */
Code.newWorkspaceXML = function() {
};

/**
 * FIXME: Save workspace
 */
Code.saveWorkspaceXML = function() {
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
