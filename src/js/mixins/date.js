const months = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre"
];

const monthsOffset = [
  "Décembre",
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre"
]

function formatDate(string) {
  let date = new Date(string);
  let d, m, y;
  d = date.getDate();
  m = months[date.getMonth()];
  y = date.getFullYear();
  date = d + " " + m + " " + y;
  return date;
}

function getDuration(string) {
  let date = new Date(string);
  let now = new Date();

  let duration = now.getTime() - date.getTime();
  duration = Math.floor(duration / 1000 / 60 / 60 / 24);
  duration = "Il y a " + duration + " jours";

  return duration;
}

export default {
  methods: {
    formatDate(string) {
      return formatDate(string);
    },
    getDuration(string) {
      return getDuration(string);
    }
  }
};
