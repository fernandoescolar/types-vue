import { Getter as Get } from 'vuex';
import { createVuexDecorator } from './utils';

export interface GetterOptions {
    mode?: 'reference' | 'value';
}

function createGetterFunction<T>(value: Function, options: GetterOptions): Get<any, T> {
    const getter: Get<any, T> = function (state: T) {
        let referenceResult = value.call(state);
        if(options.mode === 'reference' && typeof referenceResult !== 'object'){
            throw Error('The property is not an object so it cannot be passed as a reference.');
        }
        else if (options.mode === 'value' && typeof referenceResult === 'object') {
            let valueResult = Object.assign({}, referenceResult);
            return valueResult;
        }
        
        return referenceResult;
    };
    return getter;
}

export function Getter(options: GetterOptions = {}): MethodDecorator {
  return createVuexDecorator((componentOptions, k, description) => {
      if (typeof componentOptions.getters !== 'object') {
          componentOptions.getters = Object.create(null);
      }

      (componentOptions.getters as any)[k] = createGetterFunction<typeof componentOptions>(description.value, options);
  });
} 
