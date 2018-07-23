import Vue, { ComponentOptions } from "vue";
import { createDecorator, VueDecorator }  from 'vue-class-component';

export function createExDecorator (factory: (options: ComponentOptions<Vue>, key: string, descriptor: TypedPropertyDescriptor<any>) => void): VueDecorator {
    return (target: Vue | typeof Vue, key?: any, descriptor?: any) => {
        const c = createDecorator((o: ComponentOptions<Vue>, k: string) => {
            return factory(o, k, descriptor);
        });

        return c(<Vue>target, key);
    }
}
