const macroLabel = "EGR_2.71828 Crew Assessment";
const width = 1000;

const party = game.folders.find(f => f.name === "PC").contents;

let dialogContent = ``;

dialogContent += `
        <div style="disply: grid; grid-template-columns: repeat(7, 1fr); gap: 2px; grid-auto-rows: minmax(50px, auto);">
            <div style="grid-column: 1; grid-row: 1;">11</div>
            <div style="grid-column: 2; grid-row: 1;">12</div>
            <div style="grid-column: 3; grid-row: 1;">13</div>
            <div style="grid-column: 4; grid-row: 1;">14</div>
            <div style="grid-column: 5; grid-row: 1;">15</div>
            <div style="grid-column: 6; grid-row: 1;">16</div>
            <div style="grid-column: 7; grid-row: 1;">17</div>
        </div>
`;

let d = new Dialog({
    title: macroLabel,
    content: dialogContent,
    buttons: {
        one: {
            icon: '<i class="fas fa-check"></i>',
            label: "",
        },
    },
    default: "one"//,
});
d.render(true, { width: width });



game.folders.find(f => f.name === "PC").contents.reduce((acc, actor) => {
    acc.skillsIns.infosec += actor.system.skillsIns.infosec.roll;
    acc.skillsIns.interface += actor.system.skillsIns.interface.roll;
    acc.skillsIns.perceive += actor.system.skillsIns.perceive.roll;
    acc.skillsIns.program += actor.system.skillsIns.program.roll;
    acc.skillsIns.research += actor.system.skillsIns.research.roll;
    acc.skillsIns.survival += actor.system.skillsIns.survival.roll;
    acc.skillsMox.deceive += actor.system.skillsMox.deceive.roll;
    acc.skillsMox.kinesics += actor.system.skillsMox.kinesics.roll;
    acc.skillsMox.persuade += actor.system.skillsMox.persuade.roll;
    acc.skillsMox.provoke += actor.system.skillsMox.provoke.roll;
    acc.skillsMox.psi += actor.system.skillsMox.psi.roll;
    acc.skillsVig.athletics += actor.system.skillsVig.athletics.roll;
    acc.skillsVig.fray += actor.system.skillsVig.fray.roll;
    acc.skillsVig["free fall"] += actor.system.skillsVig["free fall"].roll;
    acc.skillsVig.guns += actor.system.skillsVig.guns.roll;
    acc.skillsVig.infiltrate += actor.system.skillsVig.infiltrate.roll;
    acc.skillsVig.melee += actor.system.skillsVig.melee.roll;
    return acc;
}, {
    skillsIns: { infosec: 0, interface: 0, perceive: 0, program: 0, research: 0, survival: 0 }, skillsMox: { deceive: 0, kinesics: 0, persuade: 0, provoke: 0, psi: 0 }, skillsVig: { athletics: 0, fray: 0, "free fall": 0, guns: 0, infiltrate: 0, melee: 0 }
})


game.folders.find(f => f.name === "PC").contents.reduce((acc, actor) => {
    acc.skillsIns.infosec = Math.max(actor.system.skillsIns.infosec.roll, acc.skillsIns.infosec);
    acc.skillsIns.interface = Math.max(actor.system.skillsIns.interface.roll, acc.skillsIns.interface);
    acc.skillsIns.perceive = Math.max(actor.system.skillsIns.perceive.roll, acc.skillsIns.perceive);
    acc.skillsIns.program = Math.max(actor.system.skillsIns.program.roll, acc.skillsIns.program);
    acc.skillsIns.research = Math.max(actor.system.skillsIns.research.roll, acc.skillsIns.research);
    acc.skillsIns.survival = Math.max(actor.system.skillsIns.survival.roll, acc.skillsIns.survival);
    acc.skillsMox.deceive = Math.max(actor.system.skillsMox.deceive.roll, acc.skillsMox.deceive);
    acc.skillsMox.kinesics = Math.max(actor.system.skillsMox.kinesics.roll, acc.skillsMox.kinesics);
    acc.skillsMox.persuade = Math.max(actor.system.skillsMox.persuade.roll, acc.skillsMox.persuade);
    acc.skillsMox.provoke = Math.max(actor.system.skillsMox.provoke.roll, acc.skillsMox.provoke);
    acc.skillsMox.psi = Math.max(actor.system.skillsMox.psi.roll, acc.skillsMox.psi);
    acc.skillsVig.athletics = Math.max(actor.system.skillsVig.athletics.roll, acc.skillsVig.athletics);
    acc.skillsVig.athletics = Math.max(actor.system.skillsVig.fray.roll, acc.skillsVig.athletics);
    acc.skillsVig.fray = Math.max(actor.system.skillsVig.fray.roll, acc.skillsVig.fray);
    acc.skillsVig["free fall"] = Math.max(actor.system.skillsVig["free fall"].roll, acc.skillsVig["free fall"]);
    acc.skillsVig.guns = Math.max(actor.system.skillsVig.guns.roll, acc.skillsVig.guns);
    acc.skillsVig.infiltrate = Math.max(actor.system.skillsVig.infiltrate.roll, acc.skillsVig.infiltrate);
    acc.skillsVig.melee = Math.max(actor.system.skillsVig.melee.roll, acc.skillsVig.melee);
    return acc;
}, {
    skillsIns: { infosec: 0, interface: 0, perceive: 0, program: 0, research: 0, survival: 0 }, skillsMox: { deceive: 0, kinesics: 0, persuade: 0, provoke: 0, psi: 0 }, skillsVig: { athletics: 0, fray: 0, "free fall": 0, guns: 0, infiltrate: 0, melee: 0 }
})


game.folders.find(f => f.name === "PC").contents.reduce((acc, actor) => {
    acc.skillsIns.infosec = Math.min(actor.system.skillsIns.infosec.roll, acc.skillsIns.infosec);
    acc.skillsIns.interface = Math.min(actor.system.skillsIns.interface.roll, acc.skillsIns.interface);
    acc.skillsIns.perceive = Math.min(actor.system.skillsIns.perceive.roll, acc.skillsIns.perceive);
    acc.skillsIns.program = Math.min(actor.system.skillsIns.program.roll, acc.skillsIns.program);
    acc.skillsIns.research = Math.min(actor.system.skillsIns.research.roll, acc.skillsIns.research);
    acc.skillsIns.survival = Math.min(actor.system.skillsIns.survival.roll, acc.skillsIns.survival);
    acc.skillsMox.deceive = Math.min(actor.system.skillsMox.deceive.roll, acc.skillsMox.deceive);
    acc.skillsMox.kinesics = Math.min(actor.system.skillsMox.kinesics.roll, acc.skillsMox.kinesics);
    acc.skillsMox.persuade = Math.min(actor.system.skillsMox.persuade.roll, acc.skillsMox.persuade);
    acc.skillsMox.provoke = Math.min(actor.system.skillsMox.provoke.roll, acc.skillsMox.provoke);
    acc.skillsMox.psi = Math.min(actor.system.skillsMox.psi.roll, acc.skillsMox.psi);
    acc.skillsVig.athletics = Math.min(actor.system.skillsVig.athletics.roll, acc.skillsVig.athletics);
    acc.skillsVig.athletics = Math.min(actor.system.skillsVig.fray.roll, acc.skillsVig.athletics);
    acc.skillsVig.fray = Math.min(actor.system.skillsVig.fray.roll, acc.skillsVig.fray);
    acc.skillsVig["free fall"] = Math.min(actor.system.skillsVig["free fall"].roll, acc.skillsVig["free fall"]);
    acc.skillsVig.guns = Math.min(actor.system.skillsVig.guns.roll, acc.skillsVig.guns);
    acc.skillsVig.infiltrate = Math.min(actor.system.skillsVig.infiltrate.roll, acc.skillsVig.infiltrate);
    acc.skillsVig.melee = Math.min(actor.system.skillsVig.melee.roll, acc.skillsVig.melee);
    return acc;
}, {
    skillsIns: { infosec: 990, interface: 990, perceive: 990, program: 990, research: 990, survival: 990 }, skillsMox: { deceive: 990, kinesics: 990, persuade: 990, provoke: 990, psi: 990 }, skillsVig: { athletics: 990, fray: 990, "free fall": 990, guns: 990, infiltrate: 990, melee: 990 }
})


game.folders.find(f => f.name === "PC").contents.reduce((acc, actor) => {
    acc["System Administration"] = Math.max(
        acc["System Administration"],
        actor.knowSkill?.find(s => s.name.startsWith("System Administration")).roll === undefined ? 0 : actor.knowSkill?.find(s => s.name.startsWith("System Administration")).roll);
    return acc;
}, {
    "System Administration": 0
})


game.folders.find(f => f.name === "PC").contents.reduce((acc, actor) => {
    let skillName = "Archeology";
    acc[skillName] = Math.max(
        acc[skillName],
        actor.knowSkill?.find(s => s.name.startsWith(skillName))?.roll === undefined ? 0 : actor.knowSkill?.find(s => s.name.startsWith(skillName)).roll);
    acc["Cryptography"] = Math.max(
        acc["Cryptography"],
        actor.knowSkill?.find(s => s.name.startsWith("Cryptography")).roll === undefined ? 0 : actor.knowSkill?.find(s => s.name.startsWith("Cryptography")).roll);
    acc["System Administration"] = Math.max(
        acc["System Administration"],
        actor.knowSkill?.find(s => s.name.startsWith("System Administration")).roll === undefined ? 0 : actor.knowSkill?.find(s => s.name.startsWith("System Administration")).roll);
    return acc;
}, {
    "Archeology": 0,
    "Cryptography": 0,
    "System Administration": 0
})


game.folders.find(f => f.name === "PC").contents.reduce((acc, actor) => {
    let skillName = "Archeology";
    acc[skillName] = Math.max(
        acc[skillName],
        actor.knowSkill?.find(s => s.name.startsWith(skillName))?.roll === undefined ? 0 : actor.knowSkill?.find(s => s.name.startsWith(skillName)).roll);
    skillName = "Cryptography";
    acc[skillName] = Math.max(
        acc[skillName],
        actor.knowSkill?.find(s => s.name.startsWith(skillName))?.roll === undefined ? 0 : actor.knowSkill?.find(s => s.name.startsWith(skillName)).roll);

    skillName = "System Administration";
    acc[skillName] = Math.max(
        acc[skillName],
        actor.knowSkill?.find(s => s.name.startsWith(skillName))?.roll === undefined ? 0 : actor.knowSkill?.find(s => s.name.startsWith(skillName)).roll);

    return acc;
}, {
    "Archeology": 0,
    "Astrobiology": 0,
    "Astronomy": 0,
    "Astrophysics": 0,
    "Astrosociology": 0,
    "Biology": 0,
    "Botany": 0,
    "Chemistry": 0,
    "Computer Science": 0,
    "Cryptography": 0,
    "Economics": 0,
    "Engineering": 0,
    "Genetics": 0,
    "Geology": 0,
    "History": 0,
    "Law": 0,
    "Linguistics": 0,
    "Mathematics": 0,
    "Memetics": 0,
    "Nanotechnology": 0,
    "Physics": 0,
    "Political Science": 0,
    "Psychology": 0,
    "Sociology": 0,
    "System Administration": 0,
    "Xeno-archeology": 0,
    "Xenolinguistics": 0,
    "Zoology": 0
})


game.folders.find(f => f.name === "PC").contents.reduce((acc, actor) => {
    let skillName = "Archeology";
    let skillValue = 0;
    skillValue = actor.knowSkill?.find(s => s.name.startsWith(skillName))?.roll === undefined ? 0 : actor.knowSkill?.find(s => s.name.startsWith(skillName)).roll;
    if (skillValue >= acc[skillName].value && skillValue > 0) {
        acc[skillName].specialists.push(actor.name);
    }
    if (skillValue > acc[skillName].value) {
        acc[skillName].value = skillValue;
    }
    skillName = "Cryptography";
    skillValue = actor.knowSkill?.find(s => s.name.startsWith(skillName))?.roll === undefined ? 0 : actor.knowSkill?.find(s => s.name.startsWith(skillName)).roll;
    if (skillValue >= acc[skillName].value && skillValue > 0) {
        acc[skillName].specialists.push(actor.name);
    }
    if (skillValue > acc[skillName].value) {
        acc[skillName].value = skillValue;
    }

    skillName = "System Administration";
    skillValue = actor.knowSkill?.find(s => s.name.startsWith(skillName))?.roll === undefined ? 0 : actor.knowSkill?.find(s => s.name.startsWith(skillName)).roll;
    if (skillValue >= acc[skillName].value && skillValue > 0) {
        acc[skillName].specialists.push(actor.name);
    }
    if (skillValue > acc[skillName].value) {
        acc[skillName].value = skillValue;
    }

    return acc;
}, {
    "Archeology": { value: 0, specialists: [] },
    "Astrobiology": { value: 0, specialists: [] },
    "Astronomy": { value: 0, specialists: [] },
    "Astrophysics": { value: 0, specialists: [] },
    "Astrosociology": { value: 0, specialists: [] },
    "Biology": { value: 0, specialists: [] },
    "Botany": { value: 0, specialists: [] },
    "Chemistry": { value: 0, specialists: [] },
    "Computer Science": { value: 0, specialists: [] },
    "Cryptography": { value: 0, specialists: [] },
    "Economics": { value: 0, specialists: [] },
    "Engineering": { value: 0, specialists: [] },
    "Genetics": { value: 0, specialists: [] },
    "Geology": { value: 0, specialists: [] },
    "History": { value: 0, specialists: [] },
    "Law": { value: 0, specialists: [] },
    "Linguistics": { value: 0, specialists: [] },
    "Mathematics": { value: 0, specialists: [] },
    "Memetics": { value: 0, specialists: [] },
    "Nanotechnology": { value: 0, specialists: [] },
    "Physics": { value: 0, specialists: [] },
    "Political Science": { value: 0, specialists: [] },
    "Psychology": { value: 0, specialists: [] },
    "Sociology": { value: 0, specialists: [] },
    "System Administration": { value: 0, specialists: [] },
    "Xeno-archeology": { value: 0, specialists: [] },
    "Xenolinguistics": { value: 0, specialists: [] },
    "Zoology": { value: 0, specialists: [] }
})


let know = {
    "Archeology": { value: 0, specialists: [] },
    "Astrobiology": { value: 0, specialists: [] },
    "Astronomy": { value: 0, specialists: [] },
    "Astrophysics": { value: 0, specialists: [] },
    "Astrosociology": { value: 0, specialists: [] },
    "Biology": { value: 0, specialists: [] },
    "Botany": { value: 0, specialists: [] },
    "Chemistry": { value: 0, specialists: [] },
    "Computer Science": { value: 0, specialists: [] },
    "Cryptography": { value: 0, specialists: [] },
    "Economics": { value: 0, specialists: [] },
    "Engineering": { value: 0, specialists: [] },
    "Genetics": { value: 0, specialists: [] },
    "Geology": { value: 0, specialists: [] },
    "History": { value: 0, specialists: [] },
    "Law": { value: 0, specialists: [] },
    "Linguistics": { value: 0, specialists: [] },
    "Mathematics": { value: 0, specialists: [] },
    "Memetics": { value: 0, specialists: [] },
    "Nanotechnology": { value: 0, specialists: [] },
    "Physics": { value: 0, specialists: [] },
    "Political Science": { value: 0, specialists: [] },
    "Psychology": { value: 0, specialists: [] },
    "Sociology": { value: 0, specialists: [] },
    "System Administration": { value: 0, specialists: [] },
    "Xeno-archeology": { value: 0, specialists: [] },
    "Xenolinguistics": { value: 0, specialists: [] },
    "Zoology": { value: 0, specialists: [] }
};
game.folders.find(f => f.name === "PC").contents.forEach(a => {
    let skillValue = a.knowSkill?.find(s => s.name.startsWith("Cryptography")).roll;
    if (skillValue > 0 && skillValue >= know.Archeology) {
        know.Archeology.value = skillValue;
        know.Archeology.specialists.push(a.name);
    }
});
know


crew = [];
game.folders.find(f => f.name === "PC").contents.forEach(a => {
    crew.push(game.actors.get(a._id))
});
crew

function getCrewSkills(name) {

}


ChatMessage.create({ speaker: { alias: "TacNet" }, content: TRTacNet.shortenReportSkill(TRTacNet.reportSkill("Perceive")).reduce((acc, e) => acc + `<tr><td style="text-align: right; padding-right: 20px;">${e.name}</td><td style="text-align: left;">${e.value} => ${e.roll}</td></tr>`, `<h3 style="margin-bottom: 10px;">Perceive</h3><table>`) + "</table>" })