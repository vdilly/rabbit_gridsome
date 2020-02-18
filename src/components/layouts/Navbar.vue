<template lang="pug">
  div.navbar(ref="navbar")
    slot
</template>

<script>
export default {};
</script>

<style lang="scss">
// Position
$navbar-position: fixed; // Si on passe en absolute, mettre false aux autres options
$navbar-height: 8rem;
$navbar-height-m: 6rem;
$navbar-apply-ptop: false; // applique un padding top sur le main
$navbar-disappear-onscroll: true;
$navbar-appear-onscrolltop: true; // $navbar-disappear-onscroll must be true

// Shadow
$navbar-bshadow: none;
$navbar-scrolled-bshadow: $bshadow;

.navbar {
  z-index: $z-header;
  position: $navbar-position;
  width: 100%;
  height: $navbar-height;
  box-shadow: $navbar-bshadow;

  @if ($navbar-disappear-onscroll) {
    transition: all $transition-m, box-shadow 0s;
  } @else {
    transition: box-shadow $transition-m;
  }

  @include RWD(mobile) {
    height: $navbar-height-m;
  }
}

// Etat scroll
#app.js-scrolled .navbar {
  box-shadow: $navbar-scrolled-bshadow;
}
@if $navbar-disappear-onscroll {
  @if $navbar-appear-onscrolltop {
    #app.js-scrolled.downward .navbar {
      transform: translateY(-100%);
    }
  } @else {
    #app.js-scrolled .navbar {
      transform: translateY(-100%);
    }
  }
}
// Padding sur le main
@if $navbar-apply-ptop {
  #app main {
    padding-top: $navbar-height;
    transition: padding-top $transition-m;
    @include RWD(mobile) {
      padding-top: $navbar-height-m;
    }
  }
  #app.js-scrolled main {
    padding-top: 0;
  }
}
</style>