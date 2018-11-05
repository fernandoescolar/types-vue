<template>
    <div>
        <p>The counter is {{ counter }}</p>
        <button v-on:click="incr(1)">Add 1</button>
        <button v-on:click="decr(1)">Delete 1</button>
    </div>
</template>
<script src="./counter-panel.ts"></script>
