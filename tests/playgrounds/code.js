// Custom requires for the playground.
// Rendering.
goog.require('Blockly.minimalist.Renderer');
goog.require('Blockly.Themes.Zelos');

// Other.
goog.require('Blockly.WorkspaceCommentSvg');
goog.require('Blockly.Dart.all');
goog.require('Blockly.JavaScript.all');
goog.require('Blockly.Lua.all');
goog.require('Blockly.PHP.all');
goog.require('Blockly.Python.all');
goog.require('Blockly.blocks.all');
'use strict';

function start() {
    setBackgroundColour();
    initPlayground();
}

function createWorkspace(blocklyDiv, options) {
    const workspace = Blockly.inject(blocklyDiv, options);
    workspace.configureContextMenu = configureContextMenu.bind(workspace);
    return workspace;
}

function configurePlayground(playground) {
    // Rendering options.
    const gui = playground.getGUI();
    const renderingFolder = gui.addFolder('Rendering');
    const renderingOptions = {
        'font Size': 10,
    };
    renderingFolder.add(renderingOptions, 'font Size', 0, 50)
        .onChange(function(value) {
            const ws = playground.getWorkspace();
            const fontStyle = {
                'size': value,
            };
            ws.getTheme().setFontStyle(fontStyle);
            // Refresh theme.
            ws.setTheme(ws.getTheme());
        });
    playground.addGenerator('KAREL', Blockly.KAREL);
    // playground.removeGenerator('Python');
    // playground.removeGenerator('Lua');
    // playground.removeGenerator('PHP');
    // playground.removeGenerator('Dart');
}

function initPlayground() {
    if (typeof window.createPlayground === 'undefined') {
        alert('You need to run \'npm install\' in order to use this playground.');
        return;
    }
    const defaultOptions = {
        comments: true,
        collapse: true,
        disable: true,
        grid:
            {
                spacing: 25,
                length: 3,
                colour: '#ccc',
                snap: true,
            },
        horizontalLayout: false,
        maxBlocks: Infinity,
        maxInstances: {'test_basic_limit_instances': 3},
        maxTrashcanContents: 256,
        media: '../../media/',
        oneBasedIndex: true,
        readOnly: false,
        rtl: false,
        move: {
            scrollbars: true,
            drag: true,
            wheel: false,
        },
        toolbox: KARELtoolbox,
        toolboxPosition: 'start',
        renderer: 'minimalist',
        zoom:
            {
                controls: true,
                wheel: true,
                startScale: 1.0,
                maxScale: 4,
                minScale: 0.25,
                scaleSpeed: 1.1,
            },
    };

    const playgroundConfig = {
        toolboxes: {
            'categories': toolboxCategories,
            'simple': toolboxSimple,
            'test blocks': toolboxTestBlocks,
        },
    };

    createPlayground(document.getElementById('root'), createWorkspace,
        defaultOptions, playgroundConfig,
        'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.19.2/min/vs')
        .then(function(playground) {
            configurePlayground(playground);
        });
}

function setBackgroundColour() {
    // Set background colour to differentiate file: vs. localhost
    // vs. server copy.
    if (location.protocol == 'file:') {
        document.body.style.backgroundColor = '#89A203';  // Unpleasant green.
    } else if (location.hostname === 'localhost' ||
        location.hostname === '127.0.0.1' ||
        location.hostname === '[::1]') {
        document.body.style.backgroundColor = '#d6d6ff';  // Familliar lilac.
    }
}


function configureContextMenu(menuOptions, e) {
    const workspace = this;
    const screenshotOption = {
        text: 'Download Screenshot',
        enabled: workspace.getTopBlocks().length,
        callback: function() {
            Blockly.downloadScreenshot(workspace);
        },
    };
    menuOptions.push(screenshotOption);

    // Adds a default-sized workspace comment to the workspace.
    menuOptions.push(Blockly.ContextMenu.workspaceCommentOption(workspace, e));
}
