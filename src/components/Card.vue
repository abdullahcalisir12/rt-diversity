<template functional>
  <div class="card">
    <slot></slot>
  </div>
</template>

<style>
  .card {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;
    box-shadow: 0px 0px 8px 8px lightgray;
    border-radius: 24px;
  }
</style>
