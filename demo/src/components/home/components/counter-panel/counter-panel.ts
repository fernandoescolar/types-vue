import Vue from 'vue';
import { Component, MapGetter, MapAction } from 'types-vue';

@Component
export default class NotificationPanelComponent extends Vue {
    @MapGetter({ namespace: 'counter' })
    counter;

    @MapGetter({ namespace: 'counter' })
    listValue;

    @MapGetter({ namespace: 'counter' })
    listReference;

    @MapAction({ namespace: 'counter' })
    incr;

    @MapAction({ namespace: 'counter' })
    decr;

    addItemListValue(): void {
        // it should not modify the store object
        this.listValue.push('hello');
    }

    addItemListReference(): void {
        // it should do modify the store object
        this.listReference.push('hello');
    }
}
