import { mapActions } from 'vuex';
import { createDecorator } from 'vue-class-component';
import { Constructor } from 'vue/types/options';

export interface MapActionOptions {
    namespace?: string;
}

export function MapAction(options: (MapActionOptions | Constructor[] | Constructor) = {}): PropertyDecorator {
    const { namespace = undefined } = <MapActionOptions>options;

    return createDecorator((componentOptions, k) => {
        if (typeof componentOptions.methods !== 'object') {
            componentOptions.methods = Object.create(null);
        }

        const mapArray = [ k ];
        (componentOptions.methods as any)[k] = namespace !== undefined
                                          ? mapActions(namespace, mapArray)[k]
                                          : mapActions(mapArray)[k];
    });
}
