import { ButtonMapper } from "./mappings/button.map";
export var COMPONENT;
(function (COMPONENT) {
    COMPONENT[COMPONENT["BUTTON"] = 0] = "BUTTON";
})(COMPONENT || (COMPONENT = {}));
export class Mapper {
    constructor() {
    }
    map(comp, type) {
        let mapper;
        switch (type) {
            case COMPONENT.BUTTON:
                // get mapping
                // get this component translated to WM button through the mapping
                // mapping engine will be used
                mapper = new ButtonMapper(comp);
                return mapper.map();
        }
    }
}
