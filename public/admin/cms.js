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

  const viewSiteLink = document.createElement("a");

  viewSiteLink.href = "../";
  viewSiteLink.textContent = "← View Site";
  viewSiteLink.style.cssText = [
    "position: fixed",
    "bottom: 16px",
    "left: 16px",
    "z-index: 1000",
    "padding: 8px 14px",
    "border-radius: 6px",
    "background: #111827",
    "color: #ffffff",
    "font: 13px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    "text-decoration: none",
    "box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2)",
  ].join(";");

  document.body.appendChild(viewSiteLink);
})();
