(async function () {
  let team = [];

  try {
    const res = await fetch("team.json");
    team = await res.json();
  } catch {
    team = [];
  }

  const findPerson = (username) => team.find((person) => person.username === username);

  CMS.registerEditorComponent({
    id: "mention",
    label: "Mention Someone",
    fields: [
      {
        name: "username",
        label: "Person",
        widget: "select",
        options: team.map((person) => ({
          label: person.name,
          value: person.username,
        })),
      },
    ],
    pattern: /^\[@([^\]]+)\]\(https:\/\/github\.com\/([^)]+)\)$/,
    fromBlock: function (match) {
      return { username: match[2] };
    },
    toBlock: function (data) {
      const person = findPerson(data.username);
      const name = person ? person.name : data.username;

      return `[@${name}](https://github.com/${data.username})`;
    },
    toPreview: function (data) {
      const person = findPerson(data.username);
      const name = person ? person.name : data.username;

      return `@${name}`;
    },
  });

  CMS.init();
})();
