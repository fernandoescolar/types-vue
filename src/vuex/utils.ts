import Vue from 'vue';
import { Module } from 'vuex';

export function createVuexDecorator<T>(factory: (options: Module<T, any>, key: string, descriptor: TypedPropertyDescriptor<any>) => void): any {
    return (target: Vue | typeof Vue, key: any, descriptor: TypedPropertyDescriptor<any>) => {
        const options = typeof target === 'function'
                        ? target as Module<T, any>
                        : target.constructor as Module<T, any>;
        factory(options, key, descriptor);
  };
}
