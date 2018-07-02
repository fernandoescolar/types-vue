import { Module, VuexModule, Mutation, Action, Getter } from 'types-vue';

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

    @Action({ commit: 'decrement' })
    decr(value: number): number {
        if (value < 0) {
            return 0;
        }

        return value;
    }
}
