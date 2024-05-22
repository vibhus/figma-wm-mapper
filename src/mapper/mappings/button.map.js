export class ButtonMapper {
    constructor(comp) {
        this.comp = comp;
        this.config = {
            template: `<wm-button 
                    name="${this.comp.name}" 
                    iconclass="${this.comp.componentProperties['Show Icon'].value === 'True' ? 'BTN-CLS' : ''}" 
                    disabled="${this.comp.componentProperties['State'].value === 'disabled' ? 'true' : 'false'}"
                    caption="${this.comp.children[0].children[1].characters}"></wm-button>`
        };
        console.log('translating the button', this.comp);
    }
    map() {
        return this.config.template;
    }
}
