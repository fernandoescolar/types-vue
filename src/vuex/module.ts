import { ActionTree, GetterTree, Module as Mod, ModuleTree, MutationTree } from 'vuex';

function isVuexModuleKey(key: string): boolean {
  return ['namespaced', 'state', 'getters', 'actions', 'mutations', 'modules'].indexOf(key) >= 0;
}

function moduleDecoratorFactory<S> (modOrOpt: ModuleOptions | Function & Mod<S, any>) {
  return function <TFunction extends Function>(constructor: TFunction): TFunction | void  {
      const module: Function & Mod<S, any> = constructor;
      const state = new (module.prototype.constructor)({});
      if (!module.state) {
          module.state = <S>{};
      }
      module.namespaced = modOrOpt && modOrOpt.namespaced;
      Object.keys(state).forEach((key: string) => {
          if (state.hasOwnProperty(key) && typeof state[key] !== 'function' && !isVuexModuleKey(key)) {
              (module.state as any)[key] = state[key];
          }
      });
  };
}

export class VuexModule<S = ThisType<S>, R = any> implements Mod<S, R> {
    static namespaced?: boolean;
    static state?: any | (() => any);
    static getters?: GetterTree<any, any>;
    static actions?: ActionTree<any, any>;
    static mutations?: MutationTree<any>;
    static modules?: ModuleTree<any>;

    namespaced?: boolean;
    state?: S | (() => S);
    getters?: GetterTree<S, R>;
    actions?: ActionTree<S, R>;
    mutations?: MutationTree<S>;
    modules?: ModuleTree<any>;

    constructor(module: Mod<S, any>) {
        this.actions = module.actions;
        this.mutations = module.mutations;
        this.state = module.state;
        this.getters = module.getters;
        this.namespaced = module.namespaced;
        this.modules = module.modules;
    }
}

export interface ModuleOptions {
    name?: string;
    namespaced?: boolean;
}

export function Module<S> (module: Function & Mod<S, any>): void;
export function Module<S> (options: ModuleOptions): ClassDecorator;
export function Module<S> (modOrOpt: ModuleOptions | Function & Mod<S, any>) {
    if (typeof modOrOpt === 'function') {
        return moduleDecoratorFactory({})(modOrOpt);
    } else {
        return moduleDecoratorFactory(modOrOpt);
    }
}
