export class TextMapper {
    constructor(private comp: InstanceNode) {}
    extraProps: any = {};

    template() {
        return `\
<wm-container name="composite2" class="form-group app-composite-widget clearfix caption-floating" conditionalclass="bind:Widgets.${this.comp.name}.isFocused || Widgets.${this.comp.name}.datavalue ? 'active float-active' : ''">
    <wm-label class="control-label" name="label2" caption="${this.extraProps['Label_text']}"></wm-label>
    <wm-container class="col-md-12" name="container1">
        <wm-text name="${this.comp.name}" disabled="${this.comp.componentProperties['State'].value === 'disabled'}" datavalue="${(this.comp.componentProperties['Text configurations'].value === 'input-text' && this.extraProps['Input_text']) || ''}" placeholder="bind:Widgets.${this.comp.name}.isFocused ? '${this.extraProps['Placeholder_text']}' : ''" on-focus="widget.isFocused = true" on-blur="widget.isFocused = false"></wm-text>
        <wm-button show="${this.comp.componentProperties['Trailing icon'].value === 'True'}" class="btn-default" caption="" type="button" margin="unset" name="button1" iconclass="wi wi-clear" padding="0px" backgroundcolor="transparent" on-click="Widgets.${this.comp.name}.datavalue = ''"></wm-button>
        <wm-label show="${this.extraProps['Show_supporting_text']}" caption="Supporting text" class="help-block" name="label2_2"></wm-label>
    </wm-container>
</wm-container>`;
    }

    config = {template: this.template};

    map() {
        const compProps = this.comp.componentProperties;
        const regex = /#[\d]*:[\d]*/
        let newKey;
        for (const k in compProps) {
            if (k.match(regex)) {
                newKey = k.replace(regex, '').replace(/\s+/g, '_');
                this.extraProps[newKey] = compProps[k].value;
            }
        }
        console.log(this.extraProps);
        return this.template();
    }
}
