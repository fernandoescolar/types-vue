import Vue from 'vue';
import { Component, Prop, Watch } from 'types-vue';

@Component
export default class Header extends Vue {
    @Prop(String)
    title!: string;

    @Watch('title')
    onTitleChanged(value: string) {
        console.log('in header the title is ' + value);
    }
}
