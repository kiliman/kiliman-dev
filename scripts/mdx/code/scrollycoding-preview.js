var Component=(()=>{var u=Object.create;var c=Object.defineProperty;var d=Object.getOwnPropertyDescriptor;var m=Object.getOwnPropertyNames;var g=Object.getPrototypeOf,y=Object.prototype.hasOwnProperty;var f=(o,n)=>()=>(n||o((n={exports:{}}).exports,n),n.exports),D=(o,n)=>{for(var s in n)c(o,s,{get:n[s],enumerable:!0})},l=(o,n,s,t)=>{if(n&&typeof n=="object"||typeof n=="function")for(let r of m(n))!y.call(o,r)&&r!==s&&c(o,r,{get:()=>n[r],enumerable:!(t=d(n,r))||t.enumerable});return o};var h=(o,n,s)=>(s=o!=null?u(g(o)):{},l(n||!o||!o.__esModule?c(s,"default",{value:o,enumerable:!0}):s,o)),E=o=>l(c({},"__esModule",{value:!0}),o);var p=f((B,a)=>{a.exports=_jsx_runtime});var C={};D(C,{chCodeConfig:()=>F,default:()=>k});var e=h(p()),F={staticMediaQuery:"not screen, (max-width: 768px)",showCopyButton:!0,theme:{name:"material-default",semanticHighlighting:!0,tokenColors:[{name:"Global settings",settings:{background:"#263238",foreground:"#EEFFFF"}},{name:"String",scope:"string",settings:{foreground:"#C3E88D"}},{name:"Punctuation",scope:"punctuation, constant.other.symbol",settings:{foreground:"#89DDFF"}},{name:"String Escape",scope:"constant.character.escape, text.html constant.character.entity.named",settings:{foreground:"#EEFFFF"}},{name:"Boolean",scope:"constant.language.boolean",settings:{foreground:"#ff9cac"}},{name:"Number",scope:"constant.numeric",settings:{foreground:"#F78C6C"}},{name:"Variable",scope:"variable, variable.parameter, support.variable, variable.language, support.constant, meta.definition.variable entity.name.function, meta.function-call.arguments",settings:{foreground:"#EEFFFF"}},{name:"Other Keyword",scope:"keyword.other",settings:{foreground:"#F78C6C"}},{name:"Keyword",scope:"keyword, modifier, variable.language.this, support.type.object, constant.language",settings:{foreground:"#89DDFF"}},{name:"Function call",scope:"entity.name.function, support.function",settings:{foreground:"#82AAFF"}},{name:"Storage",scope:"storage.type, storage.modifier, storage.control",settings:{foreground:"#C792EA"}},{name:"Modules",scope:"support.module, support.node",settings:{foreground:"#f07178",fontStyle:"italic"}},{name:"Type",scope:"support.type, constant.other.key",settings:{foreground:"#FFCB6B"}},{name:"Type",scope:"entity.name.type, entity.other.inherited-class, entity.other",settings:{foreground:"#FFCB6B"}},{name:"Comment",scope:"comment",settings:{foreground:"#546E7A",fontStyle:"italic"}},{name:"Comment",scope:"comment punctuation.definition.comment, string.quoted.docstring",settings:{foreground:"#546E7A",fontStyle:"italic"}},{name:"Punctuation",scope:"punctuation",settings:{foreground:"#89DDFF"}},{name:"Class",scope:"entity.name, entity.name.type.class, support.type, support.class, meta.use",settings:{foreground:"#FFCB6B"}},{name:"Class variable",scope:"variable.object.property, meta.field.declaration entity.name.function",settings:{foreground:"#f07178"}},{name:"Class method",scope:"meta.definition.method entity.name.function",settings:{foreground:"#f07178"}},{name:"Function definition",scope:"meta.function entity.name.function",settings:{foreground:"#82AAFF"}},{name:"Template expression",scope:"template.expression.begin, template.expression.end, punctuation.definition.template-expression.begin, punctuation.definition.template-expression.end",settings:{foreground:"#89DDFF"}},{name:"Reset embedded/template expression colors",scope:"meta.embedded, source.groovy.embedded, meta.template.expression",settings:{foreground:"#EEFFFF"}},{name:"YAML key",scope:"entity.name.tag.yaml",settings:{foreground:"#f07178"}},{name:"JSON key",scope:"meta.object-literal.key, meta.object-literal.key string, support.type.property-name.json",settings:{foreground:"#f07178"}},{name:"JSON constant",scope:"constant.language.json",settings:{foreground:"#89DDFF"}},{name:"CSS class",scope:"entity.other.attribute-name.class",settings:{foreground:"#FFCB6B"}},{name:"CSS ID",scope:"entity.other.attribute-name.id",settings:{foreground:"#F78C6C"}},{name:"CSS tag",scope:"source.css entity.name.tag",settings:{foreground:"#FFCB6B"}},{name:"CSS properties",scope:"support.type.property-name.css",settings:{foreground:"#B2CCD6"}},{name:"HTML tag outer",scope:"meta.tag, punctuation.definition.tag",settings:{foreground:"#89DDFF"}},{name:"HTML tag inner",scope:"entity.name.tag",settings:{foreground:"#f07178"}},{name:"HTML tag attribute",scope:"entity.other.attribute-name",settings:{foreground:"#C792EA"}},{name:"HTML entities",scope:"punctuation.definition.entity.html",settings:{foreground:"#EEFFFF"}},{name:"Markdown heading",scope:"markup.heading",settings:{foreground:"#89DDFF"}},{name:"Markdown link text",scope:"text.html.markdown meta.link.inline, meta.link.reference",settings:{foreground:"#f07178"}},{name:"Markdown list item",scope:"text.html.markdown beginning.punctuation.definition.list",settings:{foreground:"#89DDFF"}},{name:"Markdown italic",scope:"markup.italic",settings:{foreground:"#f07178",fontStyle:"italic"}},{name:"Markdown bold",scope:"markup.bold",settings:{foreground:"#f07178",fontStyle:"bold"}},{name:"Markdown bold italic",scope:"markup.bold markup.italic, markup.italic markup.bold",settings:{foreground:"#f07178",fontStyle:"italic bold"}},{name:"Markdown code block",scope:"markup.fenced_code.block.markdown punctuation.definition.markdown",settings:{foreground:"#C3E88D"}},{name:"Markdown inline code",scope:"markup.inline.raw.string.markdown",settings:{foreground:"#C3E88D"}},{name:"INI property name",scope:"keyword.other.definition.ini",settings:{foreground:"#f07178"}},{name:"INI section title",scope:"entity.name.section.group-title.ini",settings:{foreground:"#89DDFF"}},{name:"C# class",scope:"source.cs meta.class.identifier storage.type",settings:{foreground:"#FFCB6B"}},{name:"C# class method",scope:"source.cs meta.method.identifier entity.name.function",settings:{foreground:"#f07178"}},{name:"C# function call",scope:"source.cs meta.method-call meta.method, source.cs entity.name.function",settings:{foreground:"#82AAFF"}},{name:"C# type",scope:"source.cs storage.type",settings:{foreground:"#FFCB6B"}},{name:"C# return type",scope:"source.cs meta.method.return-type",settings:{foreground:"#FFCB6B"}},{name:"C# preprocessor",scope:"source.cs meta.preprocessor",settings:{foreground:"#546E7A"}},{name:"C# namespace",scope:"source.cs entity.name.type.namespace",settings:{foreground:"#EEFFFF"}},{name:"JSX Text",scope:"meta.jsx.children, SXNested",settings:{foreground:"#EEFFFF"}},{name:"JSX Components name",scope:"support.class.component",settings:{foreground:"#FFCB6B"}},{name:"C-related Block Level Variables",scope:"source.cpp meta.block variable.other",settings:{foreground:"#EEFFFF"}},{name:"Member Access Meta",scope:"source.python meta.member.access.python",settings:{foreground:"#f07178"}},{name:"Function Call",scope:"source.python meta.function-call.python, meta.function-call.arguments",settings:{foreground:"#82AAFF"}},{name:"Blocks",scope:"meta.block",settings:{foreground:"#f07178"}},{name:"Function Call",scope:"entity.name.function.call",settings:{foreground:"#82AAFF"}},{name:"Namespaces",scope:"source.php support.other.namespace, source.php meta.use support.class",settings:{foreground:"#EEFFFF"}},{name:"Constant keywords",scope:"constant.keyword",settings:{foreground:"#89DDFF",fontStyle:"italic"}},{name:"Entity name",scope:"entity.name.function",settings:{foreground:"#82AAFF"}},{name:"Global settings",settings:{background:"#263238",foreground:"#EEFFFF"}},{name:"Markup Deleted",scope:["markup.deleted"],settings:{foreground:"#f07178"}},{name:"Markup Inserted",scope:["markup.inserted"],settings:{foreground:"#C3E88D"}},{name:"Markup Underline",scope:["markup.underline"],settings:{fontStyle:"underline"}},{name:"Keyword Control",scope:["keyword.control"],settings:{foreground:"#89DDFF",fontStyle:"italic"}},{name:"Parameter",scope:["variable.parameter"],settings:{fontStyle:"italic"}},{name:"Python - Self Parameter",scope:["variable.parameter.function.language.special.self.python"],settings:{foreground:"#f07178",fontStyle:"italic"}},{name:"Python - Format Placeholder",scope:["constant.character.format.placeholder.other.python"],settings:{foreground:"#F78C6C"}},{name:"Markdown - Blockquote",scope:["markup.quote"],settings:{fontStyle:"italic",foreground:"#89DDFF"}},{name:"Markdown - Fenced Language",scope:["markup.fenced_code.block"],settings:{foreground:"#EEFFFF90"}},{name:"Markdown - Blockquote Punctuation",scope:["punctuation.definition.quote"],settings:{foreground:"#ff9cac"}},{name:"JSON Key - Level 0",scope:["meta.structure.dictionary.json support.type.property-name.json"],settings:{foreground:"#C792EA"}},{name:"JSON Key - Level 1",scope:["meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json"],settings:{foreground:"#FFCB6B"}},{name:"JSON Key - Level 2",scope:["meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json"],settings:{foreground:"#F78C6C"}},{name:"JSON Key - Level 3",scope:["meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json"],settings:{foreground:"#f07178"}},{name:"JSON Key - Level 4",scope:["meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json"],settings:{foreground:"#916b53"}},{name:"JSON Key - Level 5",scope:["meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json"],settings:{foreground:"#82AAFF"}},{name:"JSON Key - Level 6",scope:["meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json"],settings:{foreground:"#ff9cac"}},{name:"JSON Key - Level 7",scope:["meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json"],settings:{foreground:"#C792EA"}},{name:"JSON Key - Level 8",scope:["meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json"],settings:{foreground:"#C3E88D"}}],colors:{focusBorder:"#FFFFFF00",foreground:"#EEFFFF","button.background":"#80CBC420","button.foreground":"#ffffff","dropdown.background":"#263238","input.background":"#303C41","inputOption.activeBorder":"#EEFFFF30","list.activeSelectionBackground":"#263238","list.activeSelectionForeground":"#80CBC4","list.dropBackground":"#f0717880","list.focusBackground":"#EEFFFF20","list.focusForeground":"#EEFFFF","list.highlightForeground":"#80CBC4","list.hoverBackground":"#263238","list.inactiveSelectionBackground":"#00000030","activityBar.background":"#263238","activityBar.dropBackground":"#f0717880","activityBarBadge.background":"#80CBC4","activityBarBadge.foreground":"#000000","badge.background":"#00000030","badge.foreground":"#546E7A","sideBar.background":"#263238","sideBarSectionHeader.background":"#263238","editorGroup.dropBackground":"#f0717880","editorGroup.focusedEmptyBorder":"#f07178","editorGroupHeader.tabsBackground":"#263238","tab.border":"#263238","tab.activeBorder":"#80CBC4","tab.inactiveBackground":"#263238","tab.activeModifiedBorder":"#607a86","tab.inactiveModifiedBorder":"#904348","tab.unfocusedActiveModifiedBorder":"#c05a60","tab.unfocusedInactiveModifiedBorder":"#904348","editor.background":"#263238","editor.foreground":"#EEFFFF","editorLineNumber.foreground":"#37474F","editorLineNumber.activeForeground":"#607a86","editorCursor.foreground":"#FFCC00","editor.selectionBackground":"#80CBC420","editor.selectionHighlightBackground":"#FFCC0020","editor.wordHighlightBackground":"#ff9cac30","editor.wordHighlightStrongBackground":"#C3E88D30","editor.findMatchHighlight":"#EEFFFF","editor.findRangeHighlightBackground":"#FFCB6B30","editor.lineHighlightBorder":"#00000000","editor.rangeHighlightBackground":"#FFFFFF0d","editorWhitespace.foreground":"#EEFFFF40","editorWidget.background":"#263238","editorHoverWidget.background":"#263238","editorMarkerNavigation.background":"#EEFFFF05","peekView.border":"#00000030","peekViewEditor.background":"#EEFFFF05","peekViewResult.background":"#EEFFFF05","peekViewTitle.background":"#EEFFFF05","panel.background":"#263238","panel.border":"#26323860","panelTitle.activeBorder":"#80CBC4","panelTitle.inactiveForeground":"#EEFFFF","statusBar.background":"#263238","statusBar.debuggingBackground":"#C792EA","statusBar.debuggingForeground":"#ffffff","statusBar.noFolderBackground":"#263238","statusBarItem.activeBackground":"#f0717880","statusBarItem.hoverBackground":"#546E7A20","statusBarItem.remoteBackground":"#80CBC4","statusBarItem.remoteForeground":"#000000","titleBar.activeBackground":"#263238","pickerGroup.border":"#FFFFFF1a","terminal.ansiBlack":"#000000","terminal.ansiBlue":"#82AAFF","terminal.ansiBrightBlack":"#546E7A","terminal.ansiBrightBlue":"#82AAFF","terminal.ansiBrightCyan":"#89DDFF","terminal.ansiBrightGreen":"#C3E88D","terminal.ansiBrightMagenta":"#C792EA","terminal.ansiBrightRed":"#f07178","terminal.ansiBrightWhite":"#ffffff","terminal.ansiBrightYellow":"#FFCB6B","terminal.ansiCyan":"#89DDFF","terminal.ansiGreen":"#C3E88D","terminal.ansiMagenta":"#C792EA","terminal.ansiRed":"#f07178","terminal.ansiWhite":"#ffffff","terminal.ansiYellow":"#FFCB6B","debugToolBar.background":"#263238","debugConsole.errorForeground":"#f07178","debugConsole.infoForeground":"#89DDFF","debugConsole.warningForeground":"#FFCB6B","selection.background":"#00000080","editorRuler.foreground":"#37474F","widget.shadow":"#00000030","scrollbar.shadow":"#00000030","editorLink.activeForeground":"#EEFFFF","progressBar.background":"#80CBC4","pickerGroup.foreground":"#80CBC4","tree.indentGuidesStroke":"#37474F","terminalCursor.foreground":"#FFCB6B","terminalCursor.background":"#000000","inputOption.activeBackground":"#EEFFFF30","textLink.foreground":"#80CBC4","textLink.activeForeground":"#EEFFFF","sideBar.foreground":"#607a86","sideBar.border":"#26323860","sideBarTitle.foreground":"#EEFFFF","sideBarSectionHeader.border":"#26323860","panel.dropBackground":"#EEFFFF","panelTitle.activeForeground":"#FFFFFF","editor.lineHighlightBackground":"#00000050","editor.findMatchBackground":"#000000","editor.findMatchHighlightBackground":"#00000050","editor.findMatchBorder":"#80CBC4","editor.findMatchHighlightBorder":"#ffffff30","editorIndentGuide.background":"#37474F70","editorIndentGuide.activeBackground":"#37474F","editorGroup.border":"#00000030","editorGutter.modifiedBackground":"#82AAFF60","editorGutter.addedBackground":"#C3E88D60","editorGutter.deletedBackground":"#f0717860","activityBar.border":"#26323860","activityBar.foreground":"#EEFFFF","activityBar.activeBorder":"#80CBC4","extensionBadge.remoteForeground":"#EEFFFF","scrollbarSlider.background":"#EEFFFF20","scrollbarSlider.hoverBackground":"#EEFFFF10","scrollbarSlider.activeBackground":"#80CBC4","tab.unfocusedActiveBorder":"#546E7A","tab.activeForeground":"#FFFFFF","tab.inactiveForeground":"#607a86","tab.activeBackground":"#263238","tab.unfocusedActiveForeground":"#EEFFFF","editorWidget.resizeBorder":"#80CBC4","editorWidget.border":"#80CBC4","notebook.focusedCellBorder":"#80CBC4","notebook.inactiveFocusedCellBorder":"#80CBC450","statusBar.border":"#26323860","statusBar.foreground":"#546E7A","editorBracketMatch.border":"#FFCC0050","editorBracketMatch.background":"#263238","editorOverviewRuler.findMatchForeground":"#80CBC4","editorOverviewRuler.border":"#263238","editorOverviewRuler.errorForeground":"#f0717840","editorOverviewRuler.infoForeground":"#82AAFF40","editorOverviewRuler.warningForeground":"#FFCB6B40","editorInfo.foreground":"#82AAFF70","editorWarning.foreground":"#FFCB6B70","editorError.foreground":"#f0717870","editorHoverWidget.border":"#FFFFFF10","titleBar.activeForeground":"#EEFFFF","titleBar.inactiveBackground":"#263238","titleBar.inactiveForeground":"#607a86","titleBar.border":"#26323860","input.foreground":"#EEFFFF","input.placeholderForeground":"#EEFFFF60","input.border":"#FFFFFF10","inputValidation.errorBorder":"#f07178","inputValidation.infoBorder":"#82AAFF","inputValidation.warningBorder":"#FFCB6B","dropdown.border":"#FFFFFF10","quickInput.background":"#263238","quickInput.foreground":"#607a86","list.hoverForeground":"#FFFFFF","list.inactiveSelectionForeground":"#80CBC4","quickInput.list.focusBackground":"#EEFFFF20","editorSuggestWidget.background":"#263238","editorSuggestWidget.foreground":"#EEFFFF","editorSuggestWidget.highlightForeground":"#80CBC4","editorSuggestWidget.selectedBackground":"#00000050","editorSuggestWidget.border":"#FFFFFF10","diffEditor.insertedTextBackground":"#89DDFF20","diffEditor.removedTextBackground":"#ff9cac20","notifications.background":"#263238","notifications.foreground":"#EEFFFF","notificationLink.foreground":"#80CBC4","extensionButton.prominentBackground":"#C3E88D90","extensionButton.prominentHoverBackground":"#C3E88D","extensionButton.prominentForeground":"#000000","peekViewEditorGutter.background":"#EEFFFF05","peekViewTitleDescription.foreground":"#EEFFFF60","peekViewResult.matchHighlightBackground":"#80CBC420","peekViewEditor.matchHighlightBackground":"#80CBC420","peekViewResult.selectionBackground":"#607a8670","gitDecoration.deletedResourceForeground":"#f0717890","gitDecoration.conflictingResourceForeground":"#FFCB6B90","gitDecoration.modifiedResourceForeground":"#82AAFF90","gitDecoration.untrackedResourceForeground":"#C3E88D90","gitDecoration.ignoredResourceForeground":"#607a8690","breadcrumb.background":"#263238","breadcrumb.foreground":"#607a86","breadcrumb.focusForeground":"#EEFFFF","breadcrumb.activeSelectionForeground":"#80CBC4","breadcrumbPicker.background":"#263238","menu.background":"#263238","menu.foreground":"#EEFFFF","menu.selectionBackground":"#00000050","menu.selectionForeground":"#80CBC4","menu.selectionBorder":"#00000030","menu.separatorBackground":"#EEFFFF","menubar.selectionBackground":"#00000030","menubar.selectionForeground":"#80CBC4","menubar.selectionBorder":"#00000030","settings.dropdownForeground":"#EEFFFF","settings.dropdownBackground":"#263238","settings.numberInputForeground":"#EEFFFF","settings.numberInputBackground":"#263238","settings.textInputForeground":"#EEFFFF","settings.textInputBackground":"#263238","settings.headerForeground":"#80CBC4","settings.modifiedItemIndicator":"#80CBC4","settings.checkboxBackground":"#263238","settings.checkboxForeground":"#EEFFFF","listFilterWidget.background":"#00000030","listFilterWidget.outline":"#00000030","listFilterWidget.noMatchesOutline":"#00000030"}},autoImport:!1,skipLanguages:[],filepath:"/Users/michael/Projects/webs/kiliman-dev/content/_mdx_bundler_entry_point-840b9ab9-89c3-43da-b9fb-ab9939c7ade4.mdx"};function b(o={}){let{wrapper:n}=o.components||{};return n?(0,e.jsx)(n,Object.assign({},o,{children:(0,e.jsx)(s,{})})):s();function s(){let t=Object.assign({h1:"h1",p:"p",h2:"h2",blockquote:"blockquote",em:"em",ul:"ul",li:"li"},o.components),{CH:r}=t;return r||i("CH",!1),r.CodeSlot||i("CH.CodeSlot",!0),r.Scrollycoding||i("CH.Scrollycoding",!0),(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(t.h1,{children:"Scrollycoding with preview"}),`
`,(0,e.jsx)(t.p,{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. At imperdiet dui accumsan sit amet nulla facilities morbi tempus. Praesent elementum facilisis leo vel fringilla. Congue mauris rhoncus aenean vel. Egestas sed tempus urna et pharetra pharetra massa massa ultricies."}),`
`,(0,e.jsx)(t.p,{children:"Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. At imperdiet dui accumsan sit amet nulla facilities morbi tempus. Praesent elementum facilisis leo vel fringilla. Congue mauris rhoncus aenean vel. Egestas sed tempus urna et pharetra pharetra massa massa ultricies."}),`
`,(0,e.jsxs)(r.Scrollycoding,{preset:"https://codesandbox.io/s/w5wfe",codeConfig:F,editorSteps:[{northPanel:{tabs:["src/App.js"],active:"src/App.js",heightRatio:1},files:[{name:"src/App.js",focus:"",code:{lines:[{tokens:[{content:"import",props:{style:{color:"#89DDFF",fontStyle:"italic"}}},{content:" ",props:{style:{color:"#EEFFFF"}}},{content:"{",props:{style:{color:"#89DDFF"}}},{content:" ",props:{style:{color:"#F07178"}}},{content:"motion",props:{style:{color:"#EEFFFF"}}},{content:" ",props:{style:{color:"#F07178"}}},{content:"}",props:{style:{color:"#89DDFF"}}},{content:" ",props:{style:{color:"#EEFFFF"}}},{content:"from",props:{style:{color:"#89DDFF",fontStyle:"italic"}}},{content:" ",props:{style:{color:"#EEFFFF"}}},{content:'"',props:{style:{color:"#89DDFF"}}},{content:"framer-motion",props:{style:{color:"#C3E88D"}}},{content:'"',props:{style:{color:"#89DDFF"}}},{content:";",props:{style:{color:"#89DDFF"}}}]},{tokens:[]},{tokens:[{content:"export",props:{style:{color:"#89DDFF",fontStyle:"italic"}}},{content:" ",props:{style:{color:"#EEFFFF"}}},{content:"default",props:{style:{color:"#89DDFF",fontStyle:"italic"}}},{content:" ",props:{style:{color:"#EEFFFF"}}},{content:"function",props:{style:{color:"#C792EA"}}},{content:" ",props:{style:{color:"#EEFFFF"}}},{content:"App",props:{style:{color:"#82AAFF"}}},{content:"()",props:{style:{color:"#89DDFF"}}},{content:" ",props:{style:{color:"#EEFFFF"}}},{content:"{",props:{style:{color:"#89DDFF"}}}]},{tokens:[{content:"  ",props:{style:{color:"#F07178"}}},{content:"const",props:{style:{color:"#C792EA"}}},{content:" ",props:{style:{color:"#F07178"}}},{content:"bg",props:{style:{color:"#EEFFFF"}}},{content:" ",props:{style:{color:"#F07178"}}},{content:"=",props:{style:{color:"#89DDFF"}}},{content:" ",props:{style:{color:"#F07178"}}},{content:'"',props:{style:{color:"#89DDFF"}}},{content:"hsl(20, 100%, 50%)",props:{style:{color:"#C3E88D"}}},{content:'"',props:{style:{color:"#89DDFF"}}},{content:";",props:{style:{color:"#89DDFF"}}}]},{tokens:[{content:"  ",props:{style:{color:"#F07178"}}},{content:"return",props:{style:{color:"#89DDFF",fontStyle:"italic"}}},{content:" (",props:{style:{color:"#F07178"}}}]},{tokens:[{content:"    ",props:{style:{color:"#F07178"}}},{content:"<",props:{style:{color:"#89DDFF"}}},{content:"motion.div",props:{style:{color:"#FFCB6B"}}}]},{tokens:[{content:"      ",props:{style:{color:"#89DDFF"}}},{content:"className",props:{style:{color:"#C792EA"}}},{content:"=",props:{style:{color:"#89DDFF"}}},{content:'"',props:{style:{color:"#89DDFF"}}},{content:"swatch",props:{style:{color:"#C3E88D"}}},{content:'"',props:{style:{color:"#89DDFF"}}}]},{tokens:[{content:"      ",props:{style:{color:"#89DDFF"}}},{content:"animate",props:{style:{color:"#C792EA"}}},{content:"={{",props:{style:{color:"#89DDFF"}}},{content:" ",props:{style:{color:"#EEFFFF"}}},{content:"backgroundColor",props:{style:{color:"#F07178"}}},{content:":",props:{style:{color:"#89DDFF"}}},{content:" bg ",props:{style:{color:"#EEFFFF"}}},{content:"}}",props:{style:{color:"#89DDFF"}}}]},{tokens:[{content:"      ",props:{style:{color:"#89DDFF"}}},{content:"transition",props:{style:{color:"#C792EA"}}},{content:"={{",props:{style:{color:"#89DDFF"}}},{content:" ",props:{style:{color:"#EEFFFF"}}},{content:"duration",props:{style:{color:"#F07178"}}},{content:":",props:{style:{color:"#89DDFF"}}},{content:" ",props:{style:{color:"#EEFFFF"}}},{content:"1",props:{style:{color:"#F78C6C"}}},{content:" ",props:{style:{color:"#EEFFFF"}}},{content:"}}",props:{style:{color:"#89DDFF"}}}]},{tokens:[{content:"    />",props:{style:{color:"#89DDFF"}}}]},{tokens:[{content:"  )",props:{style:{color:"#F07178"}}},{content:";",props:{style:{color:"#89DDFF"}}}]},{tokens:[{content:"}",props:{style:{color:"#89DDFF"}}}]}],lang:"jsx"},annotations:[]}]},{northPanel:{tabs:["src/App.js"],active:"src/App.js",heightRatio:1},files:[{name:"src/App.js",focus:"1,4,6:10",code:{lines:[{tokens:[{content:"import",props:{style:{color:"#89DDFF",fontStyle:"italic"}}},{content:" ",props:{style:{color:"#EEFFFF"}}},{content:"{",props:{style:{color:"#89DDFF"}}},{content:" ",props:{style:{color:"#F07178"}}},{content:"motion",props:{style:{color:"#EEFFFF"}}},{content:" ",props:{style:{color:"#F07178"}}},{content:"}",props:{style:{color:"#89DDFF"}}},{content:" ",props:{style:{color:"#EEFFFF"}}},{content:"from",props:{style:{color:"#89DDFF",fontStyle:"italic"}}},{content:" ",props:{style:{color:"#EEFFFF"}}},{content:'"',props:{style:{color:"#89DDFF"}}},{content:"framer-motion",props:{style:{color:"#C3E88D"}}},{content:'"',props:{style:{color:"#89DDFF"}}},{content:";",props:{style:{color:"#89DDFF"}}}]},{tokens:[]},{tokens:[{content:"export",props:{style:{color:"#89DDFF",fontStyle:"italic"}}},{content:" ",props:{style:{color:"#EEFFFF"}}},{content:"default",props:{style:{color:"#89DDFF",fontStyle:"italic"}}},{content:" ",props:{style:{color:"#EEFFFF"}}},{content:"function",props:{style:{color:"#C792EA"}}},{content:" ",props:{style:{color:"#EEFFFF"}}},{content:"App",props:{style:{color:"#82AAFF"}}},{content:"()",props:{style:{color:"#89DDFF"}}},{content:" ",props:{style:{color:"#EEFFFF"}}},{content:"{",props:{style:{color:"#89DDFF"}}}]},{tokens:[{content:"  ",props:{style:{color:"#F07178"}}},{content:"const",props:{style:{color:"#C792EA"}}},{content:" ",props:{style:{color:"#F07178"}}},{content:"bg",props:{style:{color:"#EEFFFF"}}},{content:" ",props:{style:{color:"#F07178"}}},{content:"=",props:{style:{color:"#89DDFF"}}},{content:" ",props:{style:{color:"#F07178"}}},{content:'"',props:{style:{color:"#89DDFF"}}},{content:"hsl(110, 100%, 50%)",props:{style:{color:"#C3E88D"}}},{content:'"',props:{style:{color:"#89DDFF"}}},{content:";",props:{style:{color:"#89DDFF"}}}]},{tokens:[{content:"  ",props:{style:{color:"#F07178"}}},{content:"return",props:{style:{color:"#89DDFF",fontStyle:"italic"}}},{content:" (",props:{style:{color:"#F07178"}}}]},{tokens:[{content:"    ",props:{style:{color:"#F07178"}}},{content:"<",props:{style:{color:"#89DDFF"}}},{content:"motion.div",props:{style:{color:"#FFCB6B"}}}]},{tokens:[{content:"      ",props:{style:{color:"#89DDFF"}}},{content:"className",props:{style:{color:"#C792EA"}}},{content:"=",props:{style:{color:"#89DDFF"}}},{content:'"',props:{style:{color:"#89DDFF"}}},{content:"swatch",props:{style:{color:"#C3E88D"}}},{content:'"',props:{style:{color:"#89DDFF"}}}]},{tokens:[{content:"      ",props:{style:{color:"#89DDFF"}}},{content:"animate",props:{style:{color:"#C792EA"}}},{content:"={{",props:{style:{color:"#89DDFF"}}},{content:" ",props:{style:{color:"#EEFFFF"}}},{content:"backgroundColor",props:{style:{color:"#F07178"}}},{content:":",props:{style:{color:"#89DDFF"}}},{content:" bg ",props:{style:{color:"#EEFFFF"}}},{content:"}}",props:{style:{color:"#89DDFF"}}}]},{tokens:[{content:"      ",props:{style:{color:"#89DDFF"}}},{content:"transition",props:{style:{color:"#C792EA"}}},{content:"={{",props:{style:{color:"#89DDFF"}}},{content:" ",props:{style:{color:"#EEFFFF"}}},{content:"duration",props:{style:{color:"#F07178"}}},{content:":",props:{style:{color:"#89DDFF"}}},{content:" ",props:{style:{color:"#EEFFFF"}}},{content:"1",props:{style:{color:"#F78C6C"}}},{content:" ",props:{style:{color:"#EEFFFF"}}},{content:"}}",props:{style:{color:"#89DDFF"}}}]},{tokens:[{content:"    />",props:{style:{color:"#89DDFF"}}}]},{tokens:[{content:"  )",props:{style:{color:"#F07178"}}},{content:";",props:{style:{color:"#89DDFF"}}}]},{tokens:[{content:"}",props:{style:{color:"#89DDFF"}}}]}],lang:"jsx"},annotations:[]}],southPanel:void 0},{northPanel:{tabs:["src/App.js"],active:"src/App.js",heightRatio:1},files:[{name:"src/App.js",focus:"1,4,6:10",code:{lines:[{tokens:[{content:"import",props:{style:{color:"#89DDFF",fontStyle:"italic"}}},{content:" ",props:{style:{color:"#EEFFFF"}}},{content:"{",props:{style:{color:"#89DDFF"}}},{content:" ",props:{style:{color:"#F07178"}}},{content:"motion",props:{style:{color:"#EEFFFF"}}},{content:" ",props:{style:{color:"#F07178"}}},{content:"}",props:{style:{color:"#89DDFF"}}},{content:" ",props:{style:{color:"#EEFFFF"}}},{content:"from",props:{style:{color:"#89DDFF",fontStyle:"italic"}}},{content:" ",props:{style:{color:"#EEFFFF"}}},{content:'"',props:{style:{color:"#89DDFF"}}},{content:"framer-motion",props:{style:{color:"#C3E88D"}}},{content:'"',props:{style:{color:"#89DDFF"}}},{content:";",props:{style:{color:"#89DDFF"}}}]},{tokens:[]},{tokens:[{content:"export",props:{style:{color:"#89DDFF",fontStyle:"italic"}}},{content:" ",props:{style:{color:"#EEFFFF"}}},{content:"default",props:{style:{color:"#89DDFF",fontStyle:"italic"}}},{content:" ",props:{style:{color:"#EEFFFF"}}},{content:"function",props:{style:{color:"#C792EA"}}},{content:" ",props:{style:{color:"#EEFFFF"}}},{content:"App",props:{style:{color:"#82AAFF"}}},{content:"()",props:{style:{color:"#89DDFF"}}},{content:" ",props:{style:{color:"#EEFFFF"}}},{content:"{",props:{style:{color:"#89DDFF"}}}]},{tokens:[{content:"  ",props:{style:{color:"#F07178"}}},{content:"const",props:{style:{color:"#C792EA"}}},{content:" ",props:{style:{color:"#F07178"}}},{content:"bg",props:{style:{color:"#EEFFFF"}}},{content:" ",props:{style:{color:"#F07178"}}},{content:"=",props:{style:{color:"#89DDFF"}}},{content:" ",props:{style:{color:"#F07178"}}},{content:'"',props:{style:{color:"#89DDFF"}}},{content:"hsl(200, 100%, 50%)",props:{style:{color:"#C3E88D"}}},{content:'"',props:{style:{color:"#89DDFF"}}},{content:";",props:{style:{color:"#89DDFF"}}}]},{tokens:[{content:"  ",props:{style:{color:"#F07178"}}},{content:"return",props:{style:{color:"#89DDFF",fontStyle:"italic"}}},{content:" (",props:{style:{color:"#F07178"}}}]},{tokens:[{content:"    ",props:{style:{color:"#F07178"}}},{content:"<",props:{style:{color:"#89DDFF"}}},{content:"motion.div",props:{style:{color:"#FFCB6B"}}}]},{tokens:[{content:"      ",props:{style:{color:"#89DDFF"}}},{content:"className",props:{style:{color:"#C792EA"}}},{content:"=",props:{style:{color:"#89DDFF"}}},{content:'"',props:{style:{color:"#89DDFF"}}},{content:"swatch",props:{style:{color:"#C3E88D"}}},{content:'"',props:{style:{color:"#89DDFF"}}}]},{tokens:[{content:"      ",props:{style:{color:"#89DDFF"}}},{content:"animate",props:{style:{color:"#C792EA"}}},{content:"={{",props:{style:{color:"#89DDFF"}}},{content:" ",props:{style:{color:"#EEFFFF"}}},{content:"backgroundColor",props:{style:{color:"#F07178"}}},{content:":",props:{style:{color:"#89DDFF"}}},{content:" bg ",props:{style:{color:"#EEFFFF"}}},{content:"}}",props:{style:{color:"#89DDFF"}}}]},{tokens:[{content:"      ",props:{style:{color:"#89DDFF"}}},{content:"transition",props:{style:{color:"#C792EA"}}},{content:"={{",props:{style:{color:"#89DDFF"}}},{content:" ",props:{style:{color:"#EEFFFF"}}},{content:"duration",props:{style:{color:"#F07178"}}},{content:":",props:{style:{color:"#89DDFF"}}},{content:" ",props:{style:{color:"#EEFFFF"}}},{content:"1",props:{style:{color:"#F78C6C"}}},{content:" ",props:{style:{color:"#EEFFFF"}}},{content:"}}",props:{style:{color:"#89DDFF"}}}]},{tokens:[{content:"    />",props:{style:{color:"#89DDFF"}}}]},{tokens:[{content:"  )",props:{style:{color:"#F07178"}}},{content:";",props:{style:{color:"#89DDFF"}}}]},{tokens:[{content:"}",props:{style:{color:"#89DDFF"}}}]}],lang:"jsx"},annotations:[]}],southPanel:void 0},{northPanel:{tabs:["src/App.js"],active:"src/App.js",heightRatio:1},files:[{name:"src/App.js",focus:"1,4,6:10",code:{lines:[{tokens:[{content:"import",props:{style:{color:"#89DDFF",fontStyle:"italic"}}},{content:" ",props:{style:{color:"#EEFFFF"}}},{content:"{",props:{style:{color:"#89DDFF"}}},{content:" ",props:{style:{color:"#F07178"}}},{content:"motion",props:{style:{color:"#EEFFFF"}}},{content:" ",props:{style:{color:"#F07178"}}},{content:"}",props:{style:{color:"#89DDFF"}}},{content:" ",props:{style:{color:"#EEFFFF"}}},{content:"from",props:{style:{color:"#89DDFF",fontStyle:"italic"}}},{content:" ",props:{style:{color:"#EEFFFF"}}},{content:'"',props:{style:{color:"#89DDFF"}}},{content:"framer-motion",props:{style:{color:"#C3E88D"}}},{content:'"',props:{style:{color:"#89DDFF"}}},{content:";",props:{style:{color:"#89DDFF"}}}]},{tokens:[]},{tokens:[{content:"export",props:{style:{color:"#89DDFF",fontStyle:"italic"}}},{content:" ",props:{style:{color:"#EEFFFF"}}},{content:"default",props:{style:{color:"#89DDFF",fontStyle:"italic"}}},{content:" ",props:{style:{color:"#EEFFFF"}}},{content:"function",props:{style:{color:"#C792EA"}}},{content:" ",props:{style:{color:"#EEFFFF"}}},{content:"App",props:{style:{color:"#82AAFF"}}},{content:"()",props:{style:{color:"#89DDFF"}}},{content:" ",props:{style:{color:"#EEFFFF"}}},{content:"{",props:{style:{color:"#89DDFF"}}}]},{tokens:[{content:"  ",props:{style:{color:"#F07178"}}},{content:"const",props:{style:{color:"#C792EA"}}},{content:" ",props:{style:{color:"#F07178"}}},{content:"bg",props:{style:{color:"#EEFFFF"}}},{content:" ",props:{style:{color:"#F07178"}}},{content:"=",props:{style:{color:"#89DDFF"}}},{content:" ",props:{style:{color:"#F07178"}}},{content:'"',props:{style:{color:"#89DDFF"}}},{content:"hsl(290, 100%, 50%)",props:{style:{color:"#C3E88D"}}},{content:'"',props:{style:{color:"#89DDFF"}}},{content:";",props:{style:{color:"#89DDFF"}}}]},{tokens:[{content:"  ",props:{style:{color:"#F07178"}}},{content:"return",props:{style:{color:"#89DDFF",fontStyle:"italic"}}},{content:" (",props:{style:{color:"#F07178"}}}]},{tokens:[{content:"    ",props:{style:{color:"#F07178"}}},{content:"<",props:{style:{color:"#89DDFF"}}},{content:"motion.div",props:{style:{color:"#FFCB6B"}}}]},{tokens:[{content:"      ",props:{style:{color:"#89DDFF"}}},{content:"className",props:{style:{color:"#C792EA"}}},{content:"=",props:{style:{color:"#89DDFF"}}},{content:'"',props:{style:{color:"#89DDFF"}}},{content:"swatch",props:{style:{color:"#C3E88D"}}},{content:'"',props:{style:{color:"#89DDFF"}}}]},{tokens:[{content:"      ",props:{style:{color:"#89DDFF"}}},{content:"animate",props:{style:{color:"#C792EA"}}},{content:"={{",props:{style:{color:"#89DDFF"}}},{content:" ",props:{style:{color:"#EEFFFF"}}},{content:"backgroundColor",props:{style:{color:"#F07178"}}},{content:":",props:{style:{color:"#89DDFF"}}},{content:" bg ",props:{style:{color:"#EEFFFF"}}},{content:"}}",props:{style:{color:"#89DDFF"}}}]},{tokens:[{content:"      ",props:{style:{color:"#89DDFF"}}},{content:"transition",props:{style:{color:"#C792EA"}}},{content:"={{",props:{style:{color:"#89DDFF"}}},{content:" ",props:{style:{color:"#EEFFFF"}}},{content:"duration",props:{style:{color:"#F07178"}}},{content:":",props:{style:{color:"#89DDFF"}}},{content:" ",props:{style:{color:"#EEFFFF"}}},{content:"1",props:{style:{color:"#F78C6C"}}},{content:" ",props:{style:{color:"#EEFFFF"}}},{content:"}}",props:{style:{color:"#89DDFF"}}}]},{tokens:[{content:"    />",props:{style:{color:"#89DDFF"}}}]},{tokens:[{content:"  )",props:{style:{color:"#F07178"}}},{content:";",props:{style:{color:"#89DDFF"}}}]},{tokens:[{content:"}",props:{style:{color:"#89DDFF"}}}]}],lang:"jsx"},annotations:[]}],southPanel:void 0},{northPanel:{tabs:["src/App.js"],active:"src/App.js",heightRatio:1},files:[{name:"src/App.js",focus:"1,4,6:10",code:{lines:[{tokens:[{content:"import",props:{style:{color:"#89DDFF",fontStyle:"italic"}}},{content:" ",props:{style:{color:"#EEFFFF"}}},{content:"{",props:{style:{color:"#89DDFF"}}},{content:" ",props:{style:{color:"#F07178"}}},{content:"motion",props:{style:{color:"#EEFFFF"}}},{content:" ",props:{style:{color:"#F07178"}}},{content:"}",props:{style:{color:"#89DDFF"}}},{content:" ",props:{style:{color:"#EEFFFF"}}},{content:"from",props:{style:{color:"#89DDFF",fontStyle:"italic"}}},{content:" ",props:{style:{color:"#EEFFFF"}}},{content:'"',props:{style:{color:"#89DDFF"}}},{content:"framer-motion",props:{style:{color:"#C3E88D"}}},{content:'"',props:{style:{color:"#89DDFF"}}},{content:";",props:{style:{color:"#89DDFF"}}}]},{tokens:[]},{tokens:[{content:"export",props:{style:{color:"#89DDFF",fontStyle:"italic"}}},{content:" ",props:{style:{color:"#EEFFFF"}}},{content:"default",props:{style:{color:"#89DDFF",fontStyle:"italic"}}},{content:" ",props:{style:{color:"#EEFFFF"}}},{content:"function",props:{style:{color:"#C792EA"}}},{content:" ",props:{style:{color:"#EEFFFF"}}},{content:"App",props:{style:{color:"#82AAFF"}}},{content:"()",props:{style:{color:"#89DDFF"}}},{content:" ",props:{style:{color:"#EEFFFF"}}},{content:"{",props:{style:{color:"#89DDFF"}}}]},{tokens:[{content:"  ",props:{style:{color:"#F07178"}}},{content:"const",props:{style:{color:"#C792EA"}}},{content:" ",props:{style:{color:"#F07178"}}},{content:"bg",props:{style:{color:"#EEFFFF"}}},{content:" ",props:{style:{color:"#F07178"}}},{content:"=",props:{style:{color:"#89DDFF"}}},{content:" ",props:{style:{color:"#F07178"}}},{content:'"',props:{style:{color:"#89DDFF"}}},{content:"hsl(10, 100%, 50%)",props:{style:{color:"#C3E88D"}}},{content:'"',props:{style:{color:"#89DDFF"}}},{content:";",props:{style:{color:"#89DDFF"}}}]},{tokens:[{content:"  ",props:{style:{color:"#F07178"}}},{content:"return",props:{style:{color:"#89DDFF",fontStyle:"italic"}}},{content:" (",props:{style:{color:"#F07178"}}}]},{tokens:[{content:"    ",props:{style:{color:"#F07178"}}},{content:"<",props:{style:{color:"#89DDFF"}}},{content:"motion.div",props:{style:{color:"#FFCB6B"}}}]},{tokens:[{content:"      ",props:{style:{color:"#89DDFF"}}},{content:"className",props:{style:{color:"#C792EA"}}},{content:"=",props:{style:{color:"#89DDFF"}}},{content:'"',props:{style:{color:"#89DDFF"}}},{content:"swatch",props:{style:{color:"#C3E88D"}}},{content:'"',props:{style:{color:"#89DDFF"}}}]},{tokens:[{content:"      ",props:{style:{color:"#89DDFF"}}},{content:"animate",props:{style:{color:"#C792EA"}}},{content:"={{",props:{style:{color:"#89DDFF"}}},{content:" ",props:{style:{color:"#EEFFFF"}}},{content:"backgroundColor",props:{style:{color:"#F07178"}}},{content:":",props:{style:{color:"#89DDFF"}}},{content:" bg ",props:{style:{color:"#EEFFFF"}}},{content:"}}",props:{style:{color:"#89DDFF"}}}]},{tokens:[{content:"      ",props:{style:{color:"#89DDFF"}}},{content:"transition",props:{style:{color:"#C792EA"}}},{content:"={{",props:{style:{color:"#89DDFF"}}},{content:" ",props:{style:{color:"#EEFFFF"}}},{content:"duration",props:{style:{color:"#F07178"}}},{content:":",props:{style:{color:"#89DDFF"}}},{content:" ",props:{style:{color:"#EEFFFF"}}},{content:"1",props:{style:{color:"#F78C6C"}}},{content:" ",props:{style:{color:"#EEFFFF"}}},{content:"}}",props:{style:{color:"#89DDFF"}}}]},{tokens:[{content:"    />",props:{style:{color:"#89DDFF"}}}]},{tokens:[{content:"  )",props:{style:{color:"#F07178"}}},{content:";",props:{style:{color:"#89DDFF"}}}]},{tokens:[{content:"}",props:{style:{color:"#89DDFF"}}}]}],lang:"jsx"},annotations:[]}],southPanel:void 0}],presetConfig:{dependencies:{react:"16.0.0","react-dom":"16.0.0"},entry:"/src/index.js",environment:"create-react-app",files:{"/.codesandbox/workspace.json":{code:`{
  "responsive-preview": {
    "Mobile": [
      320,
      675
    ],
    "Tablet": [
      1024,
      765
    ],
    "Desktop": [
      1400,
      800
    ],
    "Desktop  HD": [
      1920,
      1080
    ]
  }
}`},"/package.json":{code:`{
  "name": "framer-motion-52-hsla-interpolation",
  "version": "1.0.0",
  "description": "",
  "keywords": [],
  "main": "src/index.js",
  "dependencies": {
    "framer-motion": "5.2.0",
    "popmotion": "11.0.0",
    "react": "17.0.2",
    "react-dom": "17.0.2",
    "react-scripts": "4.0.0"
  },
  "devDependencies": {
    "@babel/runtime": "7.13.8",
    "typescript": "4.1.3"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  },
  "browserslist": [
    ">0.2%",
    "not dead",
    "not ie <= 11",
    "not op_mini all"
  ]
}`},"/public/index.html":{code:`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <meta name="theme-color" content="#000000" />
    <!--
      manifest.json provides metadata used when your web app is added to the
      homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/
    -->
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico" />
    <!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the \`public\` folder during the build.
      Only files inside the \`public\` folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running \`npm run build\`.
    -->
    <title>Framer Motion 5.2 HSLA interpolation</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap"
      rel="stylesheet"
    />
  </head>

  <body>
    <noscript>
      You need to enable JavaScript to run this app.
    </noscript>
    <div id="root"></div>
    <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run \`npm start\` or \`yarn start\`.
      To create a production bundle, use \`npm run build\` or \`yarn build\`.
    -->
  </body>
</html>
`},"/src/App.js":{code:`import { motion } from "framer-motion";

const transition = { duration: 1 };

export default function App() {
  const bg = "hsl(20 100% 50%)";
  return (
    <motion.div
      className="swatch"
      animate={{
        backgroundColor: bg
      }}
      transition={transition}
    />
  );
}
`},"/src/index.js":{code:`import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./styles.css";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <div className="container">
      <App />
    </div>
  </StrictMode>,
  rootElement
);
`},"/src/styles.css":{code:`body {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  overflow: hidden;
  background: #334;
}

.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 50px;
}

.container > div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 24px;
}

.swatch {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  margin-bottom: 20px;
}
`}},is_sse:!1,main:"/src/index.js"},hasPreviewSteps:{dependencies:{react:"16.0.0","react-dom":"16.0.0"},entry:"/src/index.js",environment:"create-react-app",files:{"/.codesandbox/workspace.json":{code:`{
  "responsive-preview": {
    "Mobile": [
      320,
      675
    ],
    "Tablet": [
      1024,
      765
    ],
    "Desktop": [
      1400,
      800
    ],
    "Desktop  HD": [
      1920,
      1080
    ]
  }
}`},"/package.json":{code:`{
  "name": "framer-motion-52-hsla-interpolation",
  "version": "1.0.0",
  "description": "",
  "keywords": [],
  "main": "src/index.js",
  "dependencies": {
    "framer-motion": "5.2.0",
    "popmotion": "11.0.0",
    "react": "17.0.2",
    "react-dom": "17.0.2",
    "react-scripts": "4.0.0"
  },
  "devDependencies": {
    "@babel/runtime": "7.13.8",
    "typescript": "4.1.3"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  },
  "browserslist": [
    ">0.2%",
    "not dead",
    "not ie <= 11",
    "not op_mini all"
  ]
}`},"/public/index.html":{code:`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <meta name="theme-color" content="#000000" />
    <!--
      manifest.json provides metadata used when your web app is added to the
      homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/
    -->
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico" />
    <!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the \`public\` folder during the build.
      Only files inside the \`public\` folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running \`npm run build\`.
    -->
    <title>Framer Motion 5.2 HSLA interpolation</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap"
      rel="stylesheet"
    />
  </head>

  <body>
    <noscript>
      You need to enable JavaScript to run this app.
    </noscript>
    <div id="root"></div>
    <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run \`npm start\` or \`yarn start\`.
      To create a production bundle, use \`npm run build\` or \`yarn build\`.
    -->
  </body>
</html>
`},"/src/App.js":{code:`import { motion } from "framer-motion";

const transition = { duration: 1 };

export default function App() {
  const bg = "hsl(20 100% 50%)";
  return (
    <motion.div
      className="swatch"
      animate={{
        backgroundColor: bg
      }}
      transition={transition}
    />
  );
}
`},"/src/index.js":{code:`import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./styles.css";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <div className="container">
      <App />
    </div>
  </StrictMode>,
  rootElement
);
`},"/src/styles.css":{code:`body {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  overflow: hidden;
  background: #334;
}

.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 50px;
}

.container > div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 24px;
}

.swatch {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  margin-bottom: 20px;
}
`}},is_sse:!1,main:"/src/index.js"},children:[(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(t.h2,{children:"Step 1"}),(0,e.jsx)(t.p,{children:"Lorem ipsum dolor sit amet, consectetur adipiscing something about points, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}),(0,e.jsxs)(t.blockquote,{children:[`
`,(0,e.jsxs)(t.p,{children:["Nova in illis at dabat legi harundine non, ova miratur? ",(0,e.jsx)(t.em,{children:"Quid in"}),` sole aer
ad diffusa illis voluisti fidensque coniugiale laniata curam. Aras rivus
eripuit, qua fistula haec partus; serpens, negat.`]}),`
`]}),(0,e.jsx)(t.p,{children:"Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget."}),(0,e.jsx)(t.p,{children:"Praesent elementum facilisis leo vel fringilla est ullamcorper eget. At imperdiet dui accumsan sit amet nulla facilities morbi tempus."}),(0,e.jsx)(r.CodeSlot,{})]}),(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(t.h2,{children:"Step 2"}),(0,e.jsx)(t.p,{children:"Velit euismod in pellentesque massa placerat. Mi bibendum neque egestas congue quisque egestas diam in arcu. Nisi lacus sed viverra tellus in."}),(0,e.jsx)(t.p,{children:"Praesent elementum facilisis leo vel fringilla est ullamcorper eget."}),(0,e.jsx)(t.p,{children:"Id aliquet risus feugiat in ante metus dictum at tempor. Sed blandit libero volutpat sed cras. Sed odio morbi quis commodo odio aenean sed adipiscing. Velit euismod in pellentesque massa placerat. Mi bibendum neque egestas congue quisque egestas diam in arcu. Nisi lacus sed viverra tellus in. Nibh cras pulvinar mattis nunc sed. Luctus accumsan tortor posuere ac ut consequat semper viverra. Fringilla ut morbi tincidunt augue interdum velit euismod."}),(0,e.jsx)(t.p,{children:"Morbi quis commodo."}),(0,e.jsx)(r.CodeSlot,{})]}),(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(t.h2,{children:"Step 3"}),(0,e.jsx)(t.p,{children:"Id aliquet risus feugiat in ante metus dictum at tempor. Sed blandit libero volutpat sed cras. Sed odio morbi quis commodo odio aenean sed adipiscing. Velit euismod in pellentesque massa placerat. Mi bibendum neque egestas congue quisque egestas diam in arcu."}),(0,e.jsxs)(t.ul,{children:[`
`,(0,e.jsx)(t.li,{children:"Nisi lacus sed viverra tellus in"}),`
`,(0,e.jsx)(t.li,{children:"Nibh cras pulvinar mattis nunc sed"}),`
`,(0,e.jsx)(t.li,{children:"Luctus accumsan tortor posuere ac"}),`
`]}),(0,e.jsx)(t.p,{children:"Ut consequat semper viverra. Fringilla ut morbi tincidunt augue interdum velit euismod."}),(0,e.jsx)(r.CodeSlot,{})]}),(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(t.h2,{children:"Step 4"}),(0,e.jsx)(t.p,{children:"Velit euismod in pellentesque massa placerat. Mi bibendum neque egestas congue quisque egestas diam in arcu. Nisi lacus sed viverra tellus in. Venenatis cras sed felis eget velit. Consectetur libero id faucibus nisl tincidunt."}),(0,e.jsx)(t.p,{children:"Sed blandit libero volutpat sed cras."}),(0,e.jsxs)(t.ul,{children:[`
`,(0,e.jsx)(t.li,{children:"Nisi lacus sed viverra tellus in"}),`
`,(0,e.jsx)(t.li,{children:"Nibh cras pulvinar mattis nunc sed"}),`
`]}),(0,e.jsx)(t.p,{children:"Gravida in fermentum et sollicitudin ac orci phasellus egestas tellus. Volutpat consequat mauris nunc congue nisi vitae."}),(0,e.jsx)(r.CodeSlot,{})]}),(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(t.h2,{children:"Step 5"}),(0,e.jsx)(t.p,{children:"Velit euismod in pellentesque massa placerat. Mi bibendum neque egestas congue quisque egestas diam in arcu. Nisi lacus sed viverra tellus in."}),(0,e.jsx)(t.p,{children:"Praesent elementum facilisis leo vel fringilla est ullamcorper eget."}),(0,e.jsx)(t.p,{children:"Id aliquet risus feugiat in ante metus dictum at tempor. Sed blandit libero volutpat sed cras. Sed odio morbi quis commodo odio aenean sed adipiscing. Velit euismod in pellentesque massa placerat."}),(0,e.jsx)(t.p,{children:"Mi bibendum neque egestas congue quisque egestas diam in arcu. Nisi lacus sed viverra tellus in. Nibh cras pulvinar mattis nunc sed. Luctus accumsan tortor posuere ac ut consequat semper viverra."}),(0,e.jsxs)(t.ul,{children:[`
`,(0,e.jsx)(t.li,{children:"Fringilla ut morbi tincidunt augue interdum velit euismod."}),`
`,(0,e.jsx)(t.li,{children:"Luctus accumsan tortor posuere ac ut consequat semper viverra."}),`
`]}),(0,e.jsx)(t.p,{children:"Morbi quis commodo."}),(0,e.jsx)(r.CodeSlot,{})]}),(0,e.jsx)(e.Fragment,{}),(0,e.jsx)(e.Fragment,{}),(0,e.jsx)(e.Fragment,{}),(0,e.jsx)(e.Fragment,{}),(0,e.jsx)(e.Fragment,{})]}),`
`,(0,e.jsx)(t.p,{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. At imperdiet dui accumsan sit amet nulla facilities morbi tempus. Praesent elementum facilisis leo vel fringilla. Congue mauris rhoncus aenean vel. Egestas sed tempus urna et pharetra pharetra massa massa ultricies."}),`
`,(0,e.jsx)(t.p,{children:"Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. At imperdiet dui accumsan sit amet nulla facilities morbi tempus. Praesent elementum facilisis leo vel fringilla. Congue mauris rhoncus aenean vel. Egestas sed tempus urna et pharetra pharetra massa massa ultricies."})]})}}var k=b;function i(o,n){throw new Error("Expected "+(n?"component":"object")+" `"+o+"` to be defined: you likely forgot to import, pass, or provide it.")}return E(C);})();
;return Component;