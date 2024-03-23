<script setup lang="ts">
const htmlString = ref(`
<h1>Example Heading</h1>
<p>Example Paragraph</p>
<a href="/example-1">Example 1</a>
<a href="/example-2">Example 2</a>
<a href="/example-3">Example 3</a>`);

onMounted(() => {
    setTimeout(() => {
        htmlString.value = `
            <h1>Example Heading</h1>
            <p>Example Paragraph</p>
            <a href="/example-1">Example 1</a>
            <a href="/example-2">Example 2</a>
            <a href="/example-3">Example 3</a>
            <a href="/example-4">Example 4</a>`;
    }, 4000);
});
</script>

<template>
    <div>
        <div v-nuxt-html="htmlString"></div>
    </div>
</template>
