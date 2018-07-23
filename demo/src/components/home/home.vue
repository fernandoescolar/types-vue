<template>
    <div>
        <header-panel :title="title" :kk="title" />
        <br />
        <counter-panel />
        <p>
            <span>{{ 'Change the title:' | changeIt }}</span>
            <input type="text" v-model="title" />
        </p>
    </div>
</template>
<script src="./home.ts"></script>
