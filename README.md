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
$ yarn add types-vue
```

## Usage

There are these decorators for a component:

- Component (from 'vue-class-component')
- Prop
- Watch
- MapGetter
- MapAction

And these decorators for a vuex module:

- Module
- Getter
- Mutation
- Action

### Component

#### @Prop

This decorator adds the field to "props" component collection. It can be invoked in different ways:

1. Without parameters
2. With the type constructor (ex. Number, String, Boolean...)
3. With PropOptions:
   - type: type constructor (ex. Number, String, Boolean...)
   - required: boolean
   - default: defaul value of the prop
   - validator: a validator function

```js
import { Vue, Component, Prop } from 'types-vue';

@Component
export default class MyComponent extends Vue {
    @Prop()
    title!: string;

    @Prop(Number)
    count!: number;

    @Prop({
        type: String,
        required: false,
        default: 'someone@mail.com',
        validator(value: string): boolean {
            return true;
        }
    })
    email!: string;
}
```

This is like:

```js
export default {
  props: {
    title: { },
    count: Number,
    email: {
        type: String,
        required: false,
        default: 'someone@mail.com',
        validator(value: string): boolean {
            return true;
        }
    },
  }
}
```

#### @Watch

This decorator adds the method to "watch" component collection. It can be invoked in different ways:

1. With the name of the property to watch.
2. With the name of the property to watch and WatchOptions:
   - deep: boolean
   - inmediate: boolean

```js
import { Vue, Component, Watch } from 'types-vue';

@Component
export default class MyComponent extends Vue {
    title: string = 'hello';
    counter: number = 0;

    @Watch('title')
    onTitleChanged(value: string): void {
        console.log('title is ' + value);
    }

    @Watch('counter', { deep: true, immediate: true })
    onCounterChanged(value: number, oldValue: number): void {
        console.log('counter is ' + value.toString());
    }
}
```

This is like:

```js
export default {
  props: {
    data() {
        return {
            title: 'hello',
            counter: 0
        };
    }
    watch: {
        'title': {
            handler: 'onTitleChanged',
            immediate: false,
            deep: false
        },
        'counter': {
            handler: 'onCounterChanged',
            immediate: true,
            deep: true
        }
    },
    methods: {
        onTitleChanged(value) {  
            console.log('title is ' + value);
        },
        onCounterChanged(value, oldValue) {
            console.log('counter is ' + value.toString());
        }
    }
  }
}
```

#### @MapGetter

When you are using Vuex, this decorator adds the field to "computed" as a vuex mapGetter in the component. It can be invoked in different ways:

1. Without parameters
2. With MapGetterOptions:
   - namespace: the name of the module namespace

```js
import { Vue, Component, MapGetter } from 'types-vue';

@Component
export default class MyComponent extends Vue {
    @MapGetter()
    title: string;

    @MapGetter({ namespace: 'counter' })
    count: number;
}
```

This is like:

```js
export default {
  computed: {
    ...mapGetters(['title']),
    ...mapGetters('counter', ['count'])
  }
}
```

#### @MapAction

When you are using Vuex, this decorator adds the field to "methods" as a vuex mapAction in the component. It can be invoked in different ways:

1. Without parameters
2. With MapActionOptions:
   - namespace: the name of the module namespace

```js
import { Vue, Component, MapAction } from 'types-vue';

@Component
export default class MyComponent extends Vue {
    @MapAction()
    changeTitle: any;

    @MapAction({ namespace: 'counter' })
    increment: (val: number) => void;
}
```

This is like:

```js
export default {
  methods: {
    ...mapActtions(['changeTitle']),
    ...mapActtions('counter', ['increment'])
  }
}
```

### Vuex Module

#### @Module

If you are using Vuex, and you want to create a new module, you can use the Module decorator and extends the VuexModule class. You can call the Module decorator:

1. Without parameters
2. With ModuleOptions:
   - name: the namespace name of the module;
   - namespaced: a boolean value to set if you are going to use namespacing in this vuex module;

```js
import { Module, VuexModule } from 'types-vue';

@Module({ namespaced: true })
export default class extends VuexModule {
    counter: number = 0;
}
```

This is like:

```js
export default {
  namespaced: true,
  state: {
      counter: 0
  }
}
```

#### @Getter

This decorator adds the method to "getters" vuex module collection.

```js
import { Module, VuexModule, Getter } from 'types-vue';

@Module({ namespaced: true })
export default class extends VuexModule {
    _counter: number = 0;

    @Getter()
    counter(): number {
        return this._counter;
    }
}
```

This is like:

```js
export default {
  namespaced: true,
  state: {
      _counter: 0
  },
  getters: {
      counter: function(state) {
          return state._counter;
      }
  }
}
```

#### @Mutation

This decorator adds the method to "mutations" vuex module collection.

```js
import { Module, VuexModule, Mutation } from 'types-vue';

@Module({ namespaced: true })
export default class extends VuexModule {
    _counter: number = 0;

    @Mutation()
    increment(value: number): void {
        this._counter += value;
    }
}
```

This is like:

```js
export default {
  namespaced: true,
  state: {
      _counter: 0
  },
  mutations: {
      increment: function(state, value) {
          state._counter += value;
      }
  }
}
```

#### @Action

This decorator adds the method to "actions" vuex module collection.

```js
import { Module, VuexModule, Mutation, Action } from 'types-vue';

@Module({ namespaced: true })
export default class extends VuexModule {
    _counter: number = 0;

    @Mutation()
    increment(value: number): void {
        this._counter += value;
    }

    @Action({ commit: 'increment' })
    incr(value: number): number {
        if (value < 0) {
            return 0;
        }

        return value;
    }
}
```

This is like:

```js
export default {
  namespaced: true,
  state: {
      _counter: 0
  },
  mutations: {
      increment: function(state, value) {
          state._counter += value;
      }
  },
  actions: {
      incr: function(context, value) {
          let result = (value) => {
                if (value < 0) {
                    return 0;
                }

                return value;
          }();
          context.commit('increment', result);
      }
  }
}
```

## Examples

You can see a complete demo project in the demo folder of this project. The code is like the following:

### Component

```js
// header-panel.ts
import { Vue, Component, Prop, Watch } from 'types-vue';

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

```html
<!-- header-panel.vue -->
<template>
    <div>
        <h1>{{ title }}</h1>
    </div>
</template>
<script src="./header-panel.ts"></script>
```

```js
// demo.ts
import { Vue, Component, Watch } from 'types-vue';
import HeaderPanel from './header-panel.vue';

@Component({
    components: {
        'header-panel': HeaderPanel
    }
})
export default class NotificationPanelComponent extends Vue {
    title: string = 'Hello Vue from typescript';

    @Watch('title')
    onTitleChanged(value: string) {
        console.log('in demo the title is ' + value);
    }
}
```

```html
<!-- demo.vue -->
<template>
    <div>
        <header-panel :title="title" :kk="title" />
        <p>
            <span>Change the title:</span>
            <input type="text" v-model="title" />
        </p>
    </div>
</template>
<script src="./demo.ts"></script>
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
import { Vue, Component, MapGetter, MapAction } from 'types-vue';

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
    <div>
        <p>The counter is {{ counter }}</p>
        <button v-on:click="incr(1)">Add 1</button>
    </div>
</template>
<script src="./counter-panel.ts"></script>
```

## License

MIT