export class AdobeButtonMapper {
    constructor(private comp: InstanceNode) {}

    template: string = `<wm-button name="${this.comp.name}" \
iconclass="${this.comp.componentProperties['Show Icon'].value === 'True' ? 'BTN-CLS' : ''}" \
disabled="${this.comp.componentProperties['State'].value === 'disabled' ? 'true' : 'false'}" \
caption="${(this.comp.componentProperties['Show Icon'].value === 'True' ? ((this.comp.children[0] as FrameNode).children[1] as TextNode) : ((this.comp.children[0] as FrameNode).children[0] as TextNode)).characters}"></wm-button>`;

    config = {template: this.template};

    map() {
        return this.config.template;
    }
}
