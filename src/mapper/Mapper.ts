import {ButtonMapper} from "./mappings/button.map";
import {TextMapper} from "./mappings/text.map";

export enum COMPONENT {
    BUTTON,
    TEXT
}
export class Mapper {
    constructor() {
    }

    map(comp: InstanceNode, type: COMPONENT) {
        let mapper;
        switch (type) {
        case COMPONENT.BUTTON:
            // get mapping
            // get this component translated to WM button through the mapping
            // mapping engine will be used
            mapper = new ButtonMapper(comp);
            return mapper.map();
        case COMPONENT.TEXT:
            // get mapping
            // get this component translated to WM button through the mapping
            // mapping engine will be used
            mapper = new TextMapper(comp);
            return mapper.map();
        }
    }
}