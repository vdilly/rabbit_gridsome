<template>
  <Layout :pageTitle="pageTitle">
    <Container class="container--small">
      <a href="/samples">Revenir au sommaire</a>
      <RTE v-html="content"> </RTE>
    </Container>
  </Layout>
</template>

<script>
export default {
  computed: {
    pageTitle() {
      return "Page de contenu type";
    },
    content() {
      return `
        <h2>Textes inlines</h2>
        <p>
          Voyez ce jeu exquis wallon, de <strong>gras</strong> en kit mais bref.
        </p>

        <p>
          Portez ce vieux whisky <em><strong>gras italique</strong></em> au juge
          blond qui <em>italique</em> fume sur son île intérieure, à côté de
          l'alcôve ovoïde, où les bûches se consument dans l'âtre, ce qui lui
          permet de penser à la cænogenèse de l'être dont il est question dans
          la cause ambiguë entendue à Moÿ, dans un capharnaüm qui, pense-t-il,
          diminue çà et là la qualité de son œuvre.
          <a href="#">Voir la suite</a>
        </p>

        <h2>Listes</h2>
        <h3>Liste à puce</h3>
        <ul>
          <li>Premier élément</li>
          <li>2ème</li>
          <li>Un troisième élément de liste à puce.</li>
        </ul>
        <h3>Liste ordonnée</h3>
        <ol>
          <li>Premier élément</li>
          <li>2ème</li>
          <li>Un troisième élément de liste ordonnée.</li>
          <li>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores et quas molestias excepturi sint occaecati cupiditate non
            provident, similique sunt in culpa qui officia deserunt mollitia
            animi, id est laborum et dolorum fuga.
          </li>
        </ol>`;
    }
  }
};
</script>

<style lang="scss"></style>
