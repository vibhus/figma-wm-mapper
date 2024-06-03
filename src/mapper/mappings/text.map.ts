export class TextMapper {
    constructor(private comp: InstanceNode) {}
    extraProps: any = {};

    template() {
        return `\
<wm-container name="composite2" class="form-group app-composite-widget clearfix caption-floating" conditionalclass="bind:Widgets.${this.compName()}.isFocused || Widgets.${this.compName()}.datavalue ? 'active float-active' : ''">
    <wm-linearlayout direction="row" spacing="4" padding="4px" class="filled-text-box text-box M3-sys-light-surface-container-highest-bg items-start self-stretch flex flex-col gap-1 rounded-1" name="linearlayout3">
        <wm-linearlayoutitem flexgrow="0" class="icon-position" show="${this.comp.componentProperties['Leading icon'].value === 'true'}" name="linearlayoutitem3">
            <wm-button iconclass="fa ${this.leadingIconClass()}" caption="" type="button" margin="unset" name="button1" padding="0px" backgroundcolor="transparent"></wm-button>
        </wm-linearlayoutitem>
        <wm-linearlayoutitem flexgrow="1" name="linearlayoutitem2">
            <wm-label class="control-label ${this.labelClass()}" name="label2" caption="${this.extraProps['Label_text']}"></wm-label>
            <wm-container class="col-md-12" name="container1">
                <wm-text name="${this.compName()}" disabled="${this.comp.componentProperties['State'].value === 'disabled'}" datavalue="${(this.comp.componentProperties['Text configurations'].value === 'input-text' && this.extraProps['Input_text']) || ''}" placeholder="bind:Widgets.${this.compName()}.isFocused ? '${this.extraProps['Placeholder_text']}' : ''" on-focus="widget.isFocused = true" on-blur="widget.isFocused = false"></wm-text>
            </wm-container>
        </wm-linearlayoutitem>
        <wm-linearlayoutitem flexgrow="0" class="icon-position" show="true" name="linearlayoutitem3">
            <wm-button iconclass="fa ${this.trailingIconClass()}" show="${this.comp.componentProperties['Trailing icon'].value === 'True'}" caption="" type="button" margin="unset" name="button1" padding="0px" backgroundcolor="transparent" on-click="Widgets.${this.compName()}.datavalue = ''"></wm-button>
        </wm-linearlayoutitem>
    </wm-linearlayout>
    <wm-label paddingleft="15px" show="${this.extraProps['Show_supporting_text']}" caption="${this.extraProps['Supporting_text']}" class="help-block ${this.labelClass()}" name="label2_2"></wm-label>
</wm-container>`;
    }

    labelClass(): string {
        switch (this.comp.componentProperties['State'].value) {
            case 'error':
                return 'M3-sys-light-error';
            case 'disabled':
                return 'M3-sys-light-on-surface';
            default:
                return 'M3-sys-light-on-surface-variant';
        }
    }

    trailingIconClass(): string {
        switch (this.comp.componentProperties['State'].value) {
            case 'error':
                return 'fa-exclamation-circle M3-sys-light-error';
            default:
                return 'fa-times-circle-o';
        }
    }

    leadingIconClass(): string{
        return 'fa-search';
    }

    compName() {
        return this.comp.name.replace(/\s+/g, '_');
    }

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
