import { Getter as Get } from 'vuex';
import { createVuexDecorator } from './utils';

function createGetterFunction<T>(value: Function): Get<any, T> {
    const getter: Get<any, T> = function (state: T) {
        return value.call(state);
    };
    return getter;
}

export function Getter(): MethodDecorator {
  return createVuexDecorator((componentOptions, k, description) => {
      if (typeof componentOptions.getters !== 'object') {
          componentOptions.getters = Object.create(null);
      }

      (componentOptions.getters as any)[k] = createGetterFunction<typeof componentOptions>(description.value);
  });
} 
