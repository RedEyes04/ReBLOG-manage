<template>
  <yk-space dir="vertical" class="menu-bar" size="m">
    <router-link :to="item.path" v-for="item in navLinks" :key="item.path" class="menu-bar__nav">
      <yk-space align="center" size="m">
        <component :is="item.icon" />
        <yk-text>{{ item.name }}</yk-text>
      </yk-space>
    </router-link>
  </yk-space>
</template>

<script lang="ts" setup>
import { navLinks } from '../../utils/menu'

</script>

<style lang="less" scoped>
.menu-bar {
  // width: 160px;
  padding: @space-l;
  position: fixed;
  top: 72px;
  left: 8px;

  &__nav {
    width: 160px;
    height: 40px;
    border-radius: @radius-m;
    padding: 0 @space-l;
    display: flex;
    align-items: center;
    text-decoration: none;

    .yk-icon {
      color: @font-color-ss;
      width: 16px;
      height: 16px;
    }

    &:hover {
      background: @bg-color-l;

      .yk-text {
        font-weight: 600;
      }
    }
  }

  .router-link-active {
    background: linear-gradient(180deg, #2b5aedde 0%, #2B5AED 100%);

    .yk-icon {
      color: @white;
    }

    .yk-text {
      color: @white;
      font-weight: 600;
    }
  }
}
</style>