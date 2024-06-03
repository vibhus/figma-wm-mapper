export class AdobeTextMapper {
    props: ComponentProperties;
    extraProps: any = {};
    compName: string;
    constructor(private comp: InstanceNode) {
        this.props = this.comp.componentProperties;
        this.compName = this.comp.name.replace(/\s+/g, '_');
    }

    template() {
        switch (this.props['Label Position'].value){
            case 'Side':
                return `\
<wm-container name="composite2" class="form-group app-composite-widget clearfix">
    <wm-label class="col-md-2 ${this.extraProps['Asterisk_?'] ? 'required' : ''}" name="fieldLabel" caption="${this.extraProps['Label']}"></wm-label>
    <wm-container class="col-md-9" name="container1">
        <wm-text name="${this.compName}" disabled="${this.props['State'].value === 'Disabled'}" datavalue="${(this.extraProps['Value_?'] && this.extraProps['Value']) || ''}" updateon="default"></wm-text>
        <wm-button show="${this.extraProps['Validation_Checkmark_?'].value}" class="btn-default" caption="" type="button" margin="unset" name="button1" iconclass="wi wi-check" padding="0px" backgroundcolor="transparent"></wm-button>
        <wm-label show="${this.extraProps['Help_Text_?']}" caption="${this.extraProps['Help_Text']}" class="help-block" name="label2_2"></wm-label>
    </wm-container>
    <wm-label show="${this.extraProps['Character_Count_?']}" class="col-md-1" name="fieldCount" caption="bind:Widgets.${this.compName}.datavalue.length"></wm-label>
</wm-container>`;
                break;
            case 'Top':
                return `\
<wm-container name="composite2" class="form-group app-composite-widget clearfix ${this.props['Label Position'].value === 'Top' ? 'caption-top' : ''}">
    <wm-label class="${this.extraProps['Asterisk_?'] ? 'required' : ''}" name="fieldLabel" caption="${this.extraProps['Label']}"></wm-label>
    <wm-label show="${this.extraProps['Character_Count_?']}" class="pull-right" name="fieldCount" caption="bind:Widgets.${this.compName}.datavalue.length"></wm-label>
    <wm-container class="col-md-12" name="container1">
        <wm-text name="${this.compName}" disabled="${this.props['State'].value === 'Disabled'}" datavalue="${(this.extraProps['Value_?'] && this.extraProps['Value']) || ''}" updateon="default"></wm-text>
        <wm-button show="${this.extraProps['Validation_Checkmark_?'].value}" class="btn-default" caption="" type="button" margin="unset" name="button1" iconclass="wi wi-check" padding="0px" backgroundcolor="transparent"></wm-button>
        <wm-label show="${this.extraProps['Help_Text_?']}" caption="${this.extraProps['Help_Text']}" class="help-block" name="label2_2"></wm-label>
    </wm-container>
</wm-container>`;
        }
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
