goog.require('Blockly.KAREL');

/**
 * Create a namespace for the application.
 */
var Code = {};

/**
 * Lookup for names of supported languages.  Keys should be in ISO 639 format.
 */
Code.LANGUAGE_NAME = {
    'ar': 'العربية',
    'be-tarask': 'Taraškievica',
    'br': 'Brezhoneg',
    'ca': 'Català',
    'cs': 'Česky',
    'da': 'Dansk',
    'de': 'Deutsch',
    'el': 'Ελληνικά',
    'en': 'English',
    'es': 'Español',
    'et': 'Eesti',
    'fa': 'فارسی',
    'fr': 'Français',
    'he': 'עברית',
    'hrx': 'Hunsrik',
    'hu': 'Magyar',
    'ia': 'Interlingua',
    'is': 'Íslenska',
    'it': 'Italiano',
    'ja': '日本語',
    'kab': 'Kabyle',
    'ko': '한국어',
    'mk': 'Македонски',
    'ms': 'Bahasa Melayu',
    'nb': 'Norsk Bokmål',
    'nl': 'Nederlands, Vlaams',
    'oc': 'Lenga d\'òc',
    'pl': 'Polski',
    'pms': 'Piemontèis',
    'pt-br': 'Português Brasileiro',
    'ro': 'Română',
    'ru': 'Русский',
    'sc': 'Sardu',
    'sk': 'Slovenčina',
    //'sq': 'Shqip',
    'sr': 'Српски',
    'sv': 'Svenska',
    'ta': 'தமிழ்',
    'th': 'ภาษาไทย',
    'tlh': 'tlhIngan Hol',
    'tr': 'Türkçe',
    'uk': 'Українська',
    'vi': 'Tiếng Việt',
    'zh-hans': '简体中文',
    'zh-hant': '正體中文'
};
/**
 * List of RTL languages.
 */
Code.LANGUAGE_RTL = ['ar', 'fa', 'he', 'lki'];

/**
 * Blockly's main workspace.
 * @type {Blockly.WorkspaceSvg}
 */
Code.workspace = null;

/**
 * Get blockly the toolbox
 * @type {HTMLElement}
 */
Code.toolbox = document.getElementById("toolbox");

/**
 * Extracts a parameter from the URL.
 * If the parameter is absent default_value is returned.
 * @param {string} name The name of the parameter.
 * @param {string} defaultValue Value to return if parameter not found.
 * @return {string} The parameter value or the default value if not found.
 */
Code.getStringParamFromUrl = function(name, defaultValue) {
    var val = location.search.match(new RegExp('[?&]' + name + '=([^&]+)'));
    return val ? decodeURIComponent(val[1].replace(/\+/g, '%20')) : defaultValue;
};

/**
 * Get the language of this user from the URL.
 * @return {string} User's language.
 */
Code.getLang = function() {
    var lang = Code.getStringParamFromUrl('lang', '');
    if (Code.LANGUAGE_NAME[lang] === undefined) {
        // Default to English.
        lang = 'en';
    }
    return lang;
};

/**
 * Is the current language (Code.LANG) an RTL language?
 * @return {boolean} True if RTL, false if LTR.
 */
Code.isRtl = function() {
    return Code.LANGUAGE_RTL.indexOf(Code.LANG) !== -1;
};


/**
 * Load blocks saved on App Engine Storage or in session/local storage.
 * @param {string} defaultXml Text representation of default blocks.
 */
Code.loadBlocks = function(defaultXml) {
    try {
        var loadOnce = window.sessionStorage.loadOnceBlocks;
    } catch (e) {
        // Firefox sometimes throws a SecurityError when accessing sessionStorage.
        // Restarting Firefox fixes this, so it looks like a bug.
        var loadOnce = null;
    }
    if ('BlocklyStorage' in window && window.location.hash.length > 1) {
        // An href with #key trigers an AJAX call to retrieve saved blocks.
        BlocklyStorage.retrieveXml(window.location.hash.substring(1));
    } else if (loadOnce) {
        // Language switching stores the blocks during the reload.
        delete window.sessionStorage.loadOnceBlocks;
        var xml = Blockly.Xml.textToDom(loadOnce);
        Blockly.Xml.domToWorkspace(xml, Code.workspace);
    } else if (defaultXml) {
        // Load the editor with default starting blocks.
        var xml = Blockly.Xml.textToDom(defaultXml);
        Blockly.Xml.domToWorkspace(xml, Code.workspace);
    } else if ('BlocklyStorage' in window) {
        // Restore saved blocks in a separate thread so that subsequent
        // initialization is not affected from a failed load.
        window.setTimeout(BlocklyStorage.restoreBlocks, 0);
    }
};


/**
 * Save the blocks and reload with a different language.
 */
Code.changeLanguage = function() {
    // Store the blocks for the duration of the reload.
    // MSIE 11 does not support sessionStorage on file:// URLs.
    if (window.sessionStorage) {
        var xml = Blockly.Xml.workspaceToDom(Code.workspace);
        var text = Blockly.Xml.domToText(xml);
        window.sessionStorage.loadOnceBlocks = text;
    }

    var languageMenu = document.getElementById('languageMenu');
    var newLang = encodeURIComponent(
        languageMenu.options[languageMenu.selectedIndex].value);
    var search = window.location.search;
    if (search.length <= 1) {
        search = '?lang=' + newLang;
    } else if (search.match(/[?&]lang=[^&]*/)) {
        search = search.replace(/([?&]lang=)[^&]*/, '$1' + newLang);
    } else {
        search = search.replace(/\?/, '?lang=' + newLang + '&');
    }

    window.location = window.location.protocol + '//' +
        window.location.host + window.location.pathname + search;
};

/**
 * Changes the output language by clicking the tab matching
 * the selected language in the codeMenu.
 */
Code.changeCodingLanguage = function() {
    var codeMenu = document.getElementById('code_menu');
    Code.tabClick(codeMenu.options[codeMenu.selectedIndex].value);
};


/**
 * Bind a function to a button's click event.
 * On touch enabled browsers, ontouchend is treated as equivalent to onclick.
 * @param {!Element|string} el Button element or ID thereof.
 * @param {!Function} func Event handler to bind.
 */
Code.bindClick = function(el, func) {
    if (typeof el === 'string') {
        el = document.getElementById(el);
    }
    el.addEventListener('click', func, true);

    function touchFunc(e) {
        // Prevent code from being executed twice on touchscreens.
        e.preventDefault();
        func(e);
    }

    el.addEventListener('touchend', touchFunc, true);
};

/**
 * Load the Prettify CSS and JavaScript.
 */
Code.importPrettify = function() {
    var script = document.createElement('script');
    script.setAttribute('src', 'https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js');
    document.head.appendChild(script);
};

/**
 * Compute the absolute coordinates and dimensions of an HTML element.
 * @param {!Element} element Element to match.
 * @return {!Object} Contains height, width, x, and y properties.
 * @private
 */
Code.getBBox_ = function(element) {
    var height = element.offsetHeight;
    var width = element.offsetWidth;
    var x = 0;
    var y = 0;
    do {
        x += element.offsetLeft;
        y += element.offsetTop;
        element = element.offsetParent;
    } while (element);
    return {
        height: height,
        width: width,
        x: x,
        y: y
    };
};

/**
 * User's language (e.g. "en").
 * @type {string}
 */
Code.LANG = Code.getLang();

/**
 * List of tab names.
 * @private
 */
Code.TABS_ = ['KAREL'];
Code.selected = 'KAREL';


/**
 * Switch the visible pane when a tab is clicked.
 * @param {string} clickedName Name of tab clicked.
 */
Code.tabClick = function(clickedName) {
    // If the XML tab was open, save and render the content.
    if (document.getElementById('tab_xml').classList.contains('tabon')) {
        var xmlTextarea = document.getElementById('content_xml');
        var xmlText = xmlTextarea.value;
        var xmlDom = null;
        try {
            xmlDom = Blockly.Xml.textToDom(xmlText);
        } catch (e) {
            var q = window.confirm(
                MSG['parseError'].replace(/%1/g, 'XML').replace('%2', e));
            if (!q) {
                // Leave the user on the XML tab.
                return;
            }
        }
        if (xmlDom) {
            Code.workspace.clear();
            Blockly.Xml.domToWorkspace(xmlDom, Code.workspace);
        }
    }

    if (document.getElementById('tab_json').classList.contains('tabon')) {
        var jsonTextarea = document.getElementById('content_json');
        var jsonText = jsonTextarea.value;
        var json = null;
        try {
            json = JSON.parse(jsonText);
        } catch (e) {
            var q = window.confirm(
                MSG['parseError'].replace(/%1/g, 'JSON').replace('%2', e));
            if (!q) {
                // Leave the user on the JSON tab.
                return;
            }
        }
        if (json) {
            Blockly.serialization.workspaces.load(json, Code.workspace);
        }
    }

    if (document.getElementById('tab_blocks').classList.contains('tabon')) {
        Code.workspace.setVisible(false);
    }
    // Deselect all tabs and hide all panes.
    for (var i = 0; i < Code.TABS_.length; i++) {
        var name = Code.TABS_[i];
        var tab = document.getElementById('tab_' + name);
        tab.classList.add('taboff');
        tab.classList.remove('tabon');
        document.getElementById('content_' + name).style.visibility = 'hidden';
    }

    // Select the active tab.
    Code.selected = clickedName;
    var selectedTab = document.getElementById('tab_' + clickedName);
    selectedTab.classList.remove('taboff');
    selectedTab.classList.add('tabon');
    // Show the selected pane.
    document.getElementById('content_' + clickedName).style.visibility =
        'visible';
    Code.renderContent();
    // The code menu tab is on if the blocks tab is off.
    var codeMenuTab = document.getElementById('tab_code');
    if (clickedName === 'blocks') {
        Code.workspace.setVisible(true);
        codeMenuTab.className = 'taboff';
    } else {
        codeMenuTab.className = 'tabon';
    }
    // Sync the menu's value with the clicked tab value if needed.
    var codeMenu = document.getElementById('code_menu');
    for (var i = 0; i < codeMenu.options.length; i++) {
        if (codeMenu.options[i].value === clickedName) {
            codeMenu.selectedIndex = i;
            break;
        }
    }
    Blockly.svgResize(Code.workspace);
};

/**
 * Populate the currently selected pane with content generated from the blocks.
 */
Code.renderContent = function() {
    var content = document.getElementById('content_' + Code.selected);
    // Initialize the pane.
    if (content.id === 'content_xml') {
        var xmlTextarea = document.getElementById('content_xml');
        var xmlDom = Blockly.Xml.workspaceToDom(Code.workspace);
        var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
        xmlTextarea.value = xmlText;
        xmlTextarea.focus();
    } else if (content.id === 'content_json') {
        var jsonTextarea = document.getElementById('content_json');
        jsonTextarea.value = JSON.stringify(
            Blockly.serialization.workspaces.save(Code.workspace), null, 2);
        jsonTextarea.focus();
    } else if (content.id === 'content_javascript') {
        Code.attemptCodeGeneration(Blockly.JavaScript);
    } else if (content.id === 'content_python') {
        Code.attemptCodeGeneration(Blockly.Python);
    } else if (content.id === 'content_php') {
        Code.attemptCodeGeneration(Blockly.PHP);
    } else if (content.id === 'content_dart') {
        Code.attemptCodeGeneration(Blockly.Dart);
    } else if (content.id === 'content_lua') {
        Code.attemptCodeGeneration(Blockly.Lua);
    } else if (content.id === 'content_KAREL') {
        Code.attemptCodeGeneration(Blockly.KAREL);
    }
    if (typeof PR === 'object') {
        PR.prettyPrint();
    }
};

/**
 * Attempt to generate the code and display it in the UI, pretty printed.
 * @param generator {!Blockly.Generator} The generator to use.
 */
Code.attemptCodeGeneration = function(generator) {
    var content = document.getElementById('codeTextArea');
    content.textContent += 'thisisatest';
    if (Code.checkAllGeneratorFunctionsDefined(generator)) {
        var code = Blockly.KAREL.workspaceToCode(Code.workspace);
        content.textContent = code;
        // Remove the 'prettyprinted' class, so that Prettify will recalculate.
        // content.className = content.className.replace('prettyprinted', '');
    }
};

/**
 * Check whether all blocks in use have generator functions.
 * @param generator {!Blockly.Generator} The generator to use.
 */
Code.checkAllGeneratorFunctionsDefined = function(generator) {
    var blocks = Code.workspace.getAllBlocks(false);
    var missingBlockGenerators = [];
    for (var i = 0; i < blocks.length; i++) {
        var blockType = blocks[i].type;
        if (!generator[blockType]) {
            if (missingBlockGenerators.indexOf(blockType) === -1) {
                missingBlockGenerators.push(blockType);
            }
        }
    }

    var valid = missingBlockGenerators.length === 0;
    if (!valid) {
        var msg = 'The generator code for the following blocks not specified for ' +
            generator.name_ + ':\n - ' + missingBlockGenerators.join('\n - ');
        Blockly.dialog.alert(msg);  // Assuming synchronous. No callback.
    }
    return valid;
};

/**
 * Blockly injection
 */
Code.init = function() {
    //Code.initLanguage();

    //default toolbox
    Code.toolboxoptions = {
        toolbox: toolbox,
        comments: true,
        collapse: true,
        disable: true,
        horizontalLayout: false,
        maxBlocks: Infinity,
        media: '../../media/',
        oneBasedIndex: true,
        readOnly: false,
        move: {
            scrollbars: true,
            drag: true,
            wheel: false,
        },
        toolboxPosition: 'start',
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

    var blocklyArea = document.getElementById('content_area');
    var blocklyDiv = document.getElementById('blocklyDiv');
    Code.workspace = Blockly.inject('blocklyDiv', Code.toolboxoptions);
    var onresize = function(e) {
        // Compute the absolute coordinates and dimensions of blocklyArea.
        var element = blocklyArea;
        var x = 3;
        var y = -10;
        do {
            x += element.offsetLeft;
            y += element.offsetTop;
            element = element.offsetParent;
        } while (element);
        // Position blocklyDiv over blocklyArea.
        blocklyDiv.style.left = x + 'px';
        blocklyDiv.style.top = y + 'px';
        blocklyDiv.style.width = blocklyArea.offsetWidth - 6 + 'px';
        blocklyDiv.style.height = blocklyArea.offsetHeight + 5 + 'px';
        Blockly.svgResize(Code.workspace);
    };
    window.addEventListener('resize', onresize, false);
    onresize();
    Blockly.svgResize(Code.workspace);
    
    Code.workspace.addChangeListener(showCode);

};

function showCode() {
    var content = document.getElementById('codeTextArea');
    var code = Blockly.KAREL.workspaceToCode(Code.workspace);
    content.textContent = code;
}

window.addEventListener('load', Code.init);
