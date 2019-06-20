import { Action as Act, ActionContext, Payload } from 'vuex';
import { createVuexDecorator } from "./utils";

export interface ActionOptions {
    commit?: string;
    useContext?: boolean;
}

function checkOptionsCommit<T>(options: ActionOptions, context: ActionContext<T, any>, value: any) {
    if (options && options.commit) {
        context.commit(options.commit, value);
    }
}

function createActionFunction<T>(key: string, value: Function, options: ActionOptions): Act<T, any> {
    const action: Act<T, any> = function (context: ActionContext<T, any>, payload: Payload) {
        try {
            const arrPayload = Array.isArray(payload) ? payload as any[] : [ payload ];
            const parameters = options.useContext ? [context, ...arrPayload] : arrPayload;
            const callResult = value.call(context, ...parameters);
            if (Promise.resolve(callResult) !== callResult) { // it is not a promise
                checkOptionsCommit<T>(options, context, callResult);
                return callResult;
            }
    
            return new Promise((resolve, reject) => {
                callResult.then(
                    result => {
                        checkOptionsCommit<T>(options, context, result);
                        resolve(result);
                    },
                    error => {
                        reject(error);
                    })
            });
        } catch (ex) {
            console.error('Could not perform action ' + key.toString() + ' - ' + ex );
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
