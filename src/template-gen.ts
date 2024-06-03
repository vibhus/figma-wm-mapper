
export const generate = async (node: SceneNode) => {
    const nodeMeta = await parseNodeRecursive(node);
    console.log(nodeMeta);
    return nodeMeta;
}
const parseNodeRecursive = async (node: SceneNode) => {
    let wmNode,
        nodeCSSStr = '',
        nodeMetaObj = {},
        childNodeMarkup,
        labelText;
    const nodeType = node.type;
    const nodeCSSClass = getCSSClassName(node);

    switch (nodeType) {
        case 'FRAME':
        case 'INSTANCE':
            nodeCSSStr = await getCSSStr(node);
            if(node.children && node.children.length) {
                childNodeMarkup = '';
                for (const child of node.children) {
                    const childNodeMeta: any = await parseNodeRecursive(child);
                    childNodeMarkup += childNodeMeta.markup;
                    nodeCSSStr += ` /*class*/ ${childNodeMeta.css}`;
                }
            }
            wmNode = `<wm-container class="${nodeCSSClass}">${childNodeMarkup}</wm-container>`;

            nodeMetaObj = {
                markup: wmNode,
                css: nodeCSSStr
            }
            break;
        case 'TEXT':
            nodeCSSStr = await getCSSStr(node);
            labelText = node.characters;
            wmNode = `<wm-label class="${nodeCSSClass}" caption="${labelText}"></wm-label>`;
            nodeMetaObj = {
                markup: wmNode,
                css: nodeCSSStr
            }
            break;
        default:
            nodeMetaObj = {markup: `<wm-else name="${node.name}"></wm-else>`, css: ''};
            break;
    }
    return nodeMetaObj;
}

async function getCSSStr(node: SceneNode) {
    let nodeCSSStr = '';
    const nodeCSSObj = await node.getCSSAsync();
    const nodeCSSClass = getCSSClassName(node);
    for (const k in nodeCSSObj) {
        nodeCSSStr += `${k}:${nodeCSSObj[k]}; `;
    }
    nodeCSSStr = `.${nodeCSSClass} {${nodeCSSStr}}`

    return nodeCSSStr;
}

function getCSSClassName(node: SceneNode): string {
    const cssRegex = /[\s~!@$%^&*()+=,./\\';:"?><[\]{}|`#]/g;
    return node.name.replace(cssRegex, '_').replace(/^[0-9]*/g, '_') + '_' + node.id.replace(/[:;&]/g, '_');
}