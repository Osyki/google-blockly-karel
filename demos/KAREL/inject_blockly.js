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
 * Blockly Default Toolbox options
 */
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
    rtl: false,
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

/**
 * List of tab names.
 * @private
 */
Code.TABS_ = ['KAREL'];
Code.selected = 'KAREL';

/**
 * Blockly injection
 */
Code.init = function () {
    var blocklyArea = document.getElementById('blocklyArea');
    var blocklyDiv = document.getElementById('blocklyDiv');
    Code.workspace = Blockly.inject('blocklyDiv', Code.toolboxoptions);
    var onresize = function(e) {
        // Compute the absolute coordinates and dimensions of blocklyArea.
        var element = blocklyArea;
        var x = 3;
        var y = -5;
        do {
            x += element.offsetLeft;
            y += element.offsetTop;
            element = element.offsetParent;
        } while (element);
        // Position blocklyDiv over blocklyArea.
        blocklyDiv.style.left = x + 'px';
        blocklyDiv.style.top = y + 'px';
        blocklyDiv.style.width = blocklyArea.offsetWidth - 5 + 'px';
        blocklyDiv.style.height = blocklyArea.offsetHeight + 5 + 'px';
        Blockly.svgResize(Code.workspace);
    };
    window.addEventListener('resize', onresize, false);
    onresize();
    Blockly.svgResize(Code.workspace);
    
    Code.workspace.addChangeListener(Code.generateCode);
}

/**
 *  Generate code.
 */
Code.generateCode = function (event) {
    let code;
    if (Code.checkAllGeneratorFunctionsDefined(Blockly.KAREL)) {
        const content = document.getElementById('codeTextArea');
        content.textContent = '';
        code = generator.workspaceToCode(Code.workspace);
        content.textContent = code;
        // Remove the 'prettyprinted' class, so that Prettify will recalculate.
       // content.className = content.className.replace('prettyprinted', '');
    }
};

/**
 * Check whether all blocks in use have generator functions.
 * @param generator {!Blockly.Generator} The generator to use.
 */
Code.checkAllGeneratorFunctionsDefined = function (generator) {
    const blocks = Code.workspace.getAllBlocks(false);
    const missingBlockGenerators = [];
    for (let i = 0; i < blocks.length; i++) {
        const blockType = blocks[i].type;
        if (!generator[blockType]) {
            if (missingBlockGenerators.indexOf(blockType) === -1) {
                missingBlockGenerators.push(blockType);
            }
        }
    }

    const valid = missingBlockGenerators.length === 0;
    if (!valid) {
        const msg = 'The generator code for the following blocks not specified for ' +
            generator.name_ + ':\n - ' + missingBlockGenerators.join('\n - ');
        Blockly.alert(msg); // Assuming synchronous. No callback.
    }
    return valid;
};

Code.init()
