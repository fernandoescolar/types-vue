import Vue from 'vue';
import { Component, Watch, Filter } from 'types-vue';
import CounterPanel from './components/counter-panel/counter-panel.vue';
import HeaderPanel from './components/header-panel/header-panel.vue';

@Component({
    components: {
        'counter-panel': CounterPanel,
        'header-panel': HeaderPanel
    }
})
export default class NotificationPanelComponent extends Vue {
    title: string = 'Hello Vue from typescript';

    @Watch('title')
    onTitleChanged(value: string) {
        console.log('in demo the title is ' + value);
    }

    @Filter()
    static changeIt(text: string): string {
        return '!' + text;
    }
}
