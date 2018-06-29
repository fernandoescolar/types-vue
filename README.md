# types-vue

Binding helpers for Vuex and vue-class-component

## Dependencies

- [Vue](https://github.com/vuejs/vue)
- [Vuex](https://github.com/vuejs/vuex)
- [vue-class-component](https://github.com/vuejs/vue-class-component)

## Based on

- [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)
- [vuex-class](https://github.com/ktsn/vuex-class)
- [vuex-module-decorators](https://github.com/championswimmer/vuex-module-decorators)

## Installation

```bash
$ npm install --save types-vue
# or
$ yarn add vuex-typescript
```

## Example

### Component

```js
import Vue from 'vue';
import { Component, Prop, Watch } from 'types-vue';

@Component
export default class Header extends Vue {
    @Prop()
    title!: string;

    @Watch('title')
    onTitleChanged(value: string) {
        console.log('title is ' + value);
    }
}
```

### Vuex

```js
// counterModule.ts
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
```

```js
// store.ts
import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import counter from './counterModule';

Vue.use(Vuex);

const store = new Store({
    state: {},
    modules: {
        counter
    }
});

export default store;
```

```js
// counter-panel.ts
import Vue from 'vue';
import { Component, MapGetter, MapAction } from 'types-vue';

@Component
export default class NotificationPanelComponent extends Vue {
    @MapGetter({ namespace: 'counter' })
    counter;

    @MapAction({ namespace: 'counter' })
    incr;
}
```

```html
<!-- counter-panel.ts -->
<template>
    <p>The counter is {{ counter }}</p>
    <button v-on:click="incr(1)">Add 1</button>
</template>
<script src="./counter-panel.ts"></script>
```

## License

MIT