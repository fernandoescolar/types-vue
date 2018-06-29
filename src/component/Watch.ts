import { WatchOptions } from 'vue';
import { createDecorator } from 'vue-class-component';

export function Watch(path: string, options: WatchOptions = {}): MethodDecorator {
    const { deep = false, immediate = false } = options;

    return createDecorator((componentOptions, handler) => {
        if (typeof componentOptions.watch !== 'object') {
            componentOptions.watch = Object.create(null);
        }
        
        (componentOptions.watch as any)[path] = { handler, deep, immediate };
    });
}
