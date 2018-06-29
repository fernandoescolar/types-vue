import { PropOptions } from 'vue';
import { createDecorator } from 'vue-class-component';
import { Constructor } from 'vue/types/options';

export function Prop(options: (PropOptions | Constructor[] | Constructor) = {}): PropertyDecorator {
    return createDecorator((componentOptions, k) => {
        if (typeof componentOptions.props !== 'object') {
            componentOptions.props = Object.create(null);
        }

        (componentOptions.props as any)[k] = options;
    });
}
