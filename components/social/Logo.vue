<template>
    <div>
        <a href="">
            <i :class="`bi bi-${props.name}`"></i>
        </a>
    </div>
</template>
c
<script setup>
const props = defineProps({
    name: String
});
</script>

<style lang="scss" scoped>

</style>