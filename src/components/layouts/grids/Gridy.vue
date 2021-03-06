<template lang="pug">
ul.unstyle.gridy
  slot
</template>
<style lang="scss">
/**
    Classes pour la construction des distribution des grids (indépendant du mixin grid distribution, qui devient plus ou moins obsolète)

    Prérequis:
    ul.gridy-[viewport]-[number]-[margin]
        li.gridy__item

    Options:
        * viewport : d, t, m (desktop tablet mobile)
        * number: 2, 3, 4 par défaut. Configurable via la variable $gridy-numbers (chaque nombre rajouté dans cette liste augmente drastiquement le poids de la librairie, à utiliser avec parcimonie). Limite: 8
        * margin: 0, 15 ,20 30 , 40 par défaut. Configurable via $gridy-margins, même remarque que pour $gridy-numbers, exception faite qu'il n'y a pas de limite.

*/

.gridy {
  display: flex;
  flex-wrap: wrap;

  &-m {
    @include RWD(mobile) {
      // Classe permettant de gérer automatiquement les margin entre itms 1 par 1 les uns en dessous des autres
      .gridy__item + .gridy__item {
        margin-top: $m4;
      }
    }
  }
}

$gridy-margins: (0, 15, 25, 40, 50, 100);
$gridy-viewports: (
  d: desktop,
  t: tablet_only,
  m: mobile,
);
$gridy-numbers: (2, 3, 4);

@each $viewport, $media_query in $gridy-viewports {
  @for $number from 2 through 8 {
    @each $margin in $gridy-margins {
      .gridy-#{$viewport}-#{$number}-#{$margin} {
        @include RWD(#{$media_query}) {
          .gridy__item {
            @if index($gridy-numbers, $number) {
              $purcentage: 1 / $number * 100;
              $round: decimal-round($purcentage, 1);
              width: calc(
                #{$round}% - (((#{$number}px - 1px) * #{$margin}) / #{$number})
              );
              @if $number==1 {
                margin-left: 0 !important;
                margin-right: 0 !important;
              } @else if $number==2 {
                &:nth-child(2n + 1) {
                  margin-right: #{($number - 1) * $margin / $number}px;
                  margin-left: 0;
                }
                &:nth-child(2n) {
                  margin-left: #{($number - 1) * $margin / $number}px;
                  margin-right: 0;
                }
              } @else if $number==3 {
                &:nth-child(3n + 1) {
                  margin-right: #{($number - 1) * $margin / $number}px;
                  margin-left: 0;
                }
                &:nth-child(3n + 2) {
                  margin-left: #{$margin / $number}px;
                  margin-right: #{$margin / $number}px;
                }
                &:nth-child(3n) {
                  margin-left: #{($number - 1) * $margin / $number}px;
                  margin-right: 0;
                }
              } @else if $number==4 {
                &:nth-child(4n + 1) {
                  margin-right: #{($number - 1) * $margin / $number}px;
                  margin-left: 0;
                }
                &:nth-child(4n + 2) {
                  margin-left: #{$margin / $number}px;
                  margin-right: #{($number - 2) * $margin / $number}px;
                }
                &:nth-child(4n + 3) {
                  margin-left: #{($number - 2) * $margin / $number}px;
                  margin-right: #{$margin / $number}px;
                }
                &:nth-child(4n) {
                  margin-left: #{($number - 1) * $margin / $number}px;
                  margin-right: 0;
                }
              } @else if $number==5 {
                &:nth-child(5n + 1) {
                  margin-right: #{($number - 1) * $margin / $number}px;
                  margin-left: 0;
                }
                &:nth-child(5n + 2) {
                  margin-left: #{$margin / $number}px;
                  margin-right: #{($number - 2) * $margin / $number}px;
                }
                &:nth-child(5n + 3) {
                  margin-left: #{($number - 3) * $margin / $number}px;
                  margin-right: #{($number - 3) * $margin / $number}px;
                }
                &:nth-child(5n + 4) {
                  margin-left: #{($number - 2) * $margin / $number}px;
                  margin-right: #{$margin / $number}px;
                }
                &:nth-child(5n) {
                  margin-left: #{($number - 1) * $margin / $number}px;
                  margin-right: 0;
                }
              } @else if $number==6 {
                &:nth-child(6n + 1) {
                  margin-right: #{($number - 1) * $margin / $number}px;
                  margin-left: 0;
                }
                &:nth-child(6n + 2) {
                  margin-left: #{$margin / $number}px;
                  margin-right: #{($number - 2) * $margin / $number}px;
                }
                &:nth-child(6n + 3) {
                  margin-left: #{($number - 4) * $margin / $number}px;
                  margin-right: #{($number - 3) * $margin / $number}px;
                }
                &:nth-child(6n + 4) {
                  margin-left: #{($number - 3) * $margin / $number}px;
                  margin-right: #{($number - 4) * $margin / $number}px;
                }
                &:nth-child(6n + 5) {
                  margin-left: #{($number - 2) * $margin / $number}px;
                  margin-right: #{$margin / $number}px;
                }
                &:nth-child(6n) {
                  margin-left: #{($number - 1) * $margin / $number}px;
                  margin-right: 0;
                }
              } @else if $number==7 {
                &:nth-child(7n + 1) {
                  margin-right: #{($number - 1) * $margin / $number}px;
                  margin-left: 0;
                }
                &:nth-child(7n + 2) {
                  margin-left: #{$margin / $number}px;
                  margin-right: #{($number - 2) * $margin / $number}px;
                }
                &:nth-child(7n + 3) {
                  margin-left: #{($number - 5) * $margin / $number}px;
                  margin-right: #{($number - 3) * $margin / $number}px;
                }
                &:nth-child(7n + 4) {
                  margin-left: #{($number - 4) * $margin / $number}px;
                  margin-right: #{($number - 4) * $margin / $number}px;
                }
                &:nth-child(7n + 5) {
                  margin-left: #{($number - 3) * $margin / $number}px;
                  margin-right: #{($number - 5) * $margin / $number}px;
                }
                &:nth-child(7n + 6) {
                  margin-left: #{($number - 2) * $margin / $number}px;
                  margin-right: #{$margin / $number}px;
                }
                &:nth-child(7n) {
                  margin-right: #{($number - 1) * $margin / $number}px;
                  margin-left: 0;
                }
              } @else if $number==8 {
                &:nth-child(8n + 1) {
                  margin-right: #{($number - 1) * $margin / $number}px;
                  margin-left: 0;
                }
                &:nth-child(8n + 2) {
                  margin-left: #{$margin / $number}px;
                  margin-right: #{($number - 2) * $margin / $number}px;
                }
                &:nth-child(8n + 3) {
                  margin-left: #{($number - 6) * $margin / $number}px;
                  margin-right: #{($number - 3) * $margin / $number}px;
                }
                &:nth-child(8n + 4) {
                  margin-left: #{($number - 5) * $margin / $number}px;
                  margin-right: #{($number - 4) * $margin / $number}px;
                }
                &:nth-child(8n + 5) {
                  margin-left: #{($number - 4) * $margin / $number}px;
                  margin-right: #{($number - 5) * $margin / $number}px;
                }
                &:nth-child(8n + 6) {
                  margin-left: #{($number - 3) * $margin / $number}px;
                  margin-right: #{($number - 6) * $margin / $number}px;
                }
                &:nth-child(8n + 7) {
                  margin-left: #{($number - 2) * $margin / $number}px;
                  margin-right: #{$margin / $number}px;
                }
                &:nth-child(8n) {
                  margin-left: #{($number - 1) * $margin / $number}px;
                  margin-right: 0;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>