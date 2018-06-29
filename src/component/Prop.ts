import { PropOptions } from 'vue';
import { createDecorator } from 'vue-class-component';
import { Constructor } from 'vue/types/options';


export function Prop(options: (PropOptions | Constructor[] | Constructor) = {}): PropertyDecorator {
    return createDecorator((componentOptions, k) => {
        (componentOptions.props || (componentOptions.props = {}) as any)[k] = options;
    });
}
