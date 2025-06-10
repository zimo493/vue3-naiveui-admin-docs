<template>
  <DefaultTheme.Layout />
</template>

<script setup lang="ts">
import { useData } from "vitepress";
import { provide } from "vue";
import DefaultTheme from "vitepress/theme";

const { isDark } = useData();

provide("toggle-appearance", async ({ clientX: x, clientY: y }: MouseEvent) => {
  const transition = document.startViewTransition(() => {
    document.documentElement.classList.toggle("dark");
  });

  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${Math.hypot(
        Math.max(x, innerWidth - x),
        Math.max(y, innerHeight - y)
      )}px at ${x}px ${y}px)`,
    ];

    isDark.value = !isDark.value;

    document.documentElement.animate(
      { clipPath: isDark.value ? clipPath.reverse() : clipPath },
      {
        duration: 300,
        easing: "ease-in",
        pseudoElement: `::view-transition-${
          isDark.value ? "old" : "new"
        }(root)`,
      }
    );
  });
});
</script>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
  z-index: 0;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
  z-index: 9999;
}
</style>
