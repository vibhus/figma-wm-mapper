import {ButtonMapper} from "./mappings/button.map";
import {TextMapper} from "./mappings/text.map";
import {AdobeTextMapper} from "./mappings/adobe/text.map";
import {AdobeButtonMapper} from "./mappings/adobe/button.map";

export enum COMPONENT {
    BUTTON,
    TEXT
}
export class Mapper {
    constructor() {
    }

    map(comp: InstanceNode, type: COMPONENT, ds: string) {
        let mapper;
        switch (type) {
        case COMPONENT.BUTTON:
            // get mapping
            // get this component translated to WM button through the mapping
            // mapping engine will be used
            mapper = ds === 'Adobe Spectrum' ? new AdobeButtonMapper(comp) : new ButtonMapper(comp);
            return mapper.map();
        case COMPONENT.TEXT:
            // get mapping
            // get this component translated to WM button through the mapping
            // mapping engine will be used
            mapper = ds === 'Adobe Spectrum' ? new AdobeTextMapper(comp) : new TextMapper(comp);
            return mapper.map();
        }
    }
}