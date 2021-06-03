

function formatDate(string, override) {
  let date = new Date(string);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  
  return date.toLocaleDateString(process.env.GRIDSOME_BUILD_LANG, options);
}

function formatDateFromFr(date) { // utilisé que pour les offres d'emploi so far
  if (!date) return null;
  let from = date.split('-')
  return [from[2], from[1], from[0]].join('-');
}

function getDuration(string) {
  let date = new Date(string);
  let now = new Date();

  let duration = now.getTime() - date.getTime();
  duration = Math.floor(duration / 1000 / 60 / 60 / 24);
  const langs = {
    fr : `Il y a ${duration} jours`,
    en : `${duration} days ago`,
    ca : `${duration} days ago`,
    de : `Vor ${duration} Tagen`,
    it : `${duration} giorni fa`,
    es : `Hace ${duration} días`
  }

  return langs[process.env.GRIDSOME_BUILD_LANG] ? langs[process.env.GRIDSOME_BUILD_LANG] : langs.fr;
}

export default {
  methods: {
    formatDate(string, override) {
      if (!override) override = null;
      return formatDate(string, override);
    },
    formatDateFromFr(string) {
      return formatDateFromFr(string);
    },
    getDuration(string) {
      return getDuration(string);
    },
  },
};
