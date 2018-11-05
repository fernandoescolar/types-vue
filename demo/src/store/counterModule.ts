import { Module, VuexModule, Mutation, Getter } from 'types-vue';
import { Action } from '../../../src/vuex/Action';
import { ActionContext } from 'vuex';

@Module({ namespaced: true })
export default class extends VuexModule {
    _counter: number = 0;

    @Getter()
    counter(): number {
        return this._counter;
    }

    @Mutation()
    increment(value: number): void {
        this._counter += value;
    }

    @Mutation()
    decrement(value: number): void {
        this._counter -= value;
    }

    @Action({ commit: 'increment' })
    incr(value: number): number {
        if (value < 0) {
            return 0;
        }

        return value;
    }

    @Action({ commit: 'decrement', useContext: true })
    decr(context: ActionContext<any, any>, value: number): number {
        if (value < 0) {
            return 0;
        }

        return value;
    }
}
