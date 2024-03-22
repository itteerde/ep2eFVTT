let crew = game.folders.find(f => f.name === "PC").contents;
TREP2eDB.skills





// create the Skill report table string
const skillName = "Athletics";
const skill = TREP2eDB.skills.find(s => s.name === skillName);

console.log({ content: "<table>" + TRTacNet.shortenReportSkill(TRTacNet.reportSkill(skillName)).reduce((acc, e) => { return acc += `<tr><td>${e.name}</td><td>${e.roll}</td></tr>`; }, "") + "</table>" + `<div>Aptitude: ${skill.aptitude}</div><div>Types: ${skill.types.reduce((acc, t) => { return acc += t + ", " }, "")}</div>` });


// create or update the JournalEntryPage for the Skill
journal.createEmbeddedDocuments("JournalEntryPage", [{ name: "Athletics", type: "text", text: { content: "test athletics", format: 1, markdown: undefined } }])


// update the *, Active, Know Pages


// sort JournalEntry
const journalEntry = await fromUuid("JournalEntry.nvPwpZCN3IRuTwq2");
const pages = journalEntry.pages.contents;
const sorted = pages.toSorted((a, b) => a.name.localeCompare(b.name));
const updates = sorted.map((e, i) => ({ _id: e.id, sort: 0 + i * CONST.SORT_INTEGER_DENSITY }));
await journalEntry.updateEmbeddedDocuments("JournalEntryPage", updates);

