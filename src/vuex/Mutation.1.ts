import { Mutation as Mut, Payload } from 'vuex';
import { createVuexDecorator } from './utils';

function createMutationFunction<T>(value: Function): Mut<T> {
    const mutation: Mut<T> = (state: T, payload: Payload) => {
        value.call(state, payload);
    };
    return mutation;
}

export function Mutation(): MethodDecorator {
  return createVuexDecorator((componentOptions, k, description) => {
        if (typeof componentOptions.mutations !== 'object') {
            componentOptions.mutations = Object.create(null);
        }

        (componentOptions.mutations as any)[k] = createMutationFunction<typeof componentOptions>(description.value);
    });
} 
