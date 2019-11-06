<template>
    <div>
        <p>The counter is {{ counter }}</p>
        <button v-on:click="incr(1)">Add 1</button>
        <button v-on:click="decr(1)">Delete 1</button>
        <p>List reference [ <span v-for="item in listReference">{{ item }} </span> ]</p>
        <p>List value [ <span v-for="item in listValue">{{ item }} </span> ]</p>
        <button v-on:click="addItemListValue">Add Item to List Value</button>
        <button v-on:click="addItemListReference">Add Item to List Reference</button>
    </div>
</template>
<script src="./counter-panel.ts"></script>
