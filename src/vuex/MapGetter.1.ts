import { mapGetters } from 'vuex';
import { createDecorator } from 'vue-class-component';

export interface MapGetterOptions {
    namespace?: string;
}

export function MapGetter(options: MapGetterOptions = {}): PropertyDecorator {
    const { namespace = undefined } = <MapGetterOptions>options;

    return createDecorator((componentOptions, k) => {
        if (typeof componentOptions.computed !== 'object') {
            componentOptions.computed = Object.create(null);
        }

        const mapArray = [ k ];
        (componentOptions.computed as any)[k] = namespace !== undefined
                                          ? mapGetters(namespace, mapArray)[k]
                                          : mapGetters(mapArray)[k];
    });
}
