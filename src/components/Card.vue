<template functional>
  <div class="card">
    <h3 class="title">{{props.title}}</h3>
    <slot></slot>
    <p class="info-box" v-if="props.infoBox">{{props.infoBox}}</p>
  </div>
</template>

<style lang="scss">
.card {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: white;
  box-shadow: 0px 0px 8px 8px lightgray;
  border-radius: 24px;

  .title {
    padding: 1rem 2rem;
    align-self: flex-start;
    color: #1f1f1f;
  }

  .info-box{
    color: #7f7f7f;
  }
}
</style>
