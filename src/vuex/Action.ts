import { Constructor } from 'vue/types/options';
import { Action as Act, ActionContext, Payload } from 'vuex';
import { createVuexDecorator } from "./utils";

export interface ActionOptions {
    commit?: string;
}

function createActionFunction<T>(key: string, value: Function, options: ActionOptions): Act<T, any> {
    const action: Act<T, any> = async function (context: ActionContext<T, any>, payload: Payload) {
        try {
            const actionPayload = await value.call(context, payload);
            if (options && options.commit) {
                context.commit(options.commit, actionPayload);
            }

            return actionPayload;
        }
        catch (e) {
            console.error('Could not perform action ' + key.toString());
            console.error(e);
        }
    };

    return action;
}

export function Action(options: ActionOptions = {}): MethodDecorator {
    return createVuexDecorator((componentOptions, k, description) => {
        if (typeof componentOptions.actions !== 'object') {
            componentOptions.actions = Object.create(null);
        }

        (componentOptions.actions as any)[k] = createActionFunction<typeof componentOptions>(k, description.value, <ActionOptions>options);
    });
} 
