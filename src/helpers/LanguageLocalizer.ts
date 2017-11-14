import {LangKey, Localizable} from "../types";

export class LanguageLocalizer {
    static localize(model: Localizable, langKey: LangKey) {
        const result = {};
        const rawModel = model.get();

        model.getStaticPropertyNames().forEach(key => {
            result[key] = rawModel[key];
        });

        model.getLocalePropertyNames().forEach(key => {
            result[key] = rawModel[`${key}_${langKey}`.toString()];
        });

        return result;
    }
}
