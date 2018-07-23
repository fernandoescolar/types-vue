import { createExDecorator } from './utils';

export function Filter(): MethodDecorator {
    return createExDecorator((componentOptions, k, descriptor) => {
        debugger;
        if (typeof componentOptions.filters !== 'object') {
            componentOptions.filters = Object.create(null);
        }
        
        (componentOptions.filters as any)[k] = descriptor.value;
    });
}
