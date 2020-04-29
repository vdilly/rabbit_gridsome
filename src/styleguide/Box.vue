<template lang="pug">
  .sg-box
    .box-header
      h2.box-title(v-if="title" v-html="title")
      .box-code
        Popin.sg-code-popin(
          panelType="center"
        )
          svg.icon(slot="trigger")
            use(xlink:href="#code")
          div(slot="close") Close
          pre
            slot(name="code")
    .box-view
      slot
    
</template>

<script>
export default {
  props: ['title']
}
</script>

<style lang="scss">
.sg-box{
  // border: solid 1px red;
  width: 100%;

  &.small{
    width: 33.33%;
    padding-left: 1rem;
    padding-right: 1rem;
    border-left: solid .2rem $color__core;
  }
}
.box-header{
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
}
.box-title{
  margin-right: 2rem;
}
.box-code{
  // padding-top: 2rem;
  // border: solid 1px green;
}
.box-view{
  // border: solid 1px blue;
}

// Popin
.sg-code-popin{
  .popin__trigger{
    height: 3rem;
    width: 3rem;
    border-radius: 50%;
    background-color: #1D1D1D;
    display: flex;
    align-items: center;
    justify-content: center;
    
    .icon{
      fill: white;
      height: 50%;
      width: 50%;
    }
  }
  &.center{
    justify-content: flex-start;
    .popin__panel{
      width: auto;
      height: auto;
      padding: 2rem 4rem;
      background-color: #2D2D2D;
    }
  }
}

// Code
.popin{
  code{
    display: block;
    background-color: #1D1D1D;
    padding: 1rem;
    border-left: solid 1px grey;
  }
}
</style>