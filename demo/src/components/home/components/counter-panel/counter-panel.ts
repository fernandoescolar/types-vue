import Vue from 'vue';
import { Component, MapGetter, MapAction } from 'types-vue';

@Component
export default class NotificationPanelComponent extends Vue {
    @MapGetter({ namespace: 'counter' })
    counter;

    @MapAction({ namespace: 'counter' })
    incr;
}
