
const partyIds = [
    "FTcEjiRQ0DU6Wwpe", // EGR_2.71828
    "GWpcf0ilVIRkl17D", // Kumo Noire
    "KetJuJd3Ufj4klCF" // SysRig.ExE
];

const macroLabel = "Report Dialog GM";
const width = 1000;

const party = partyIds.map(i => game.actors.get(i));
//console.log(party);

/**
         ${party.reduce(function(html,actor){
            return html+"<div class='chat-message message' style='display: flex; flex-direction: row; justify-content: space-evenly; align-items:left; align-content:center;'>"
        })}

 */

let dialogContent = `<div width=${width}px><h1>Summary</h1>`;
dialogContent += party.reduce(function(html,actor){
    return html+`
        <div class="chat-message message" style="display: flex; flex-direction: row; justify-content: space-evenly; align-items:left; align-content:center;">
            <div>${actor.name}</div>
            <div>
                <i class="fa-solid fa-heart-pulse awesomeIcon" style="font-size: 18px;"></i> ${actor.system.health.physical.value}/${actor.system.health.physical.max}/${actor.system.physical.dr}
            </div>
            <div>
                <i class="fa-regular fa-bandage awesomeIcon" style="font-size: 18px;"></i> ${actor.system.physical.wounds === null ? 0 : actor.system.physical.wounds} (${actor.system.physical.wt})
            </div>
            <div>
                <i class="fa-solid fa-brain awesomeIcon" style="font-size: 18px;"></i> ${actor.system.health.mental.value}/${actor.system.health.mental.max}/${actor.system.mental.ir}
            </div>
            <div>
                <i class="fa-regular fa-burst awesomeIcon" style="font-size: 18px;"></i> ${actor.system.mental.trauma === null ? 0 : actor.system.mental.trauma} (${actor.system.mental.tt})
            </div>
            <div>
                A(E) ${actor.system.physical.energyArmorTotal}
            </div>
            <div>
                A(K) ${actor.system.physical.kineticArmorTotal}
            </div>
        </div>
    `;
},``);
dialogContent += "</div>"


/**
 let dialogContent = `
    <div width=${width}px>
        <h1>Summary</h1>
        <div class="chat-message message" style="display: flex; flex-direction: row; justify-content: space-evenly; align-items:left; align-content:center;">
            <div>EGR_2.71828</div><div><i class="fa-solid fa-heart-pulse awesomeIcon" style="font-size: 18px;"></i>0/40/80</div><div><i class="fa-regular fa-bandage awesomeIcon" style="font-size: 18px;"></i>0 (8)</div><div><i class="fa-solid fa-brain awesomeIcon" style="font-size: 18px;"></i>0/30/60</div><div><i class="fa-regular fa-burst awesomeIcon" style="font-size: 18px;"></i>0 (6)</div><div>AE 0</div><div>AK 0</div>
        </div>
        <div class="chat-message message" style="display: flex; flex-direction: row; justify-content: space-evenly; align-items:left; align-content:center;">
            <div>EGR_2.71828</div><div><i class="fa-solid fa-heart-pulse awesomeIcon" style="font-size: 18px;"></i>0/40/80</div><div><i class="fa-regular fa-bandage awesomeIcon" style="font-size: 18px;"></i>0 (8)</div><div><i class="fa-solid fa-brain awesomeIcon" style="font-size: 18px;"></i>0/30/60</div><div><i class="fa-regular fa-burst awesomeIcon" style="font-size: 18px;"></i>0 (6)</div><div>AE 0</div><div>AK 0</div>
        </div>
        <div class="chat-message message" style="display: flex; flex-direction: row; justify-content: space-evenly; align-items:left; align-content:center;">
            <div>EGR_2.71828</div><div><i class="fa-solid fa-heart-pulse awesomeIcon" style="font-size: 18px;"></i>0/40/80</div><div><i class="fa-regular fa-bandage awesomeIcon" style="font-size: 18px;"></i>0 (8)</div><div><i class="fa-solid fa-brain awesomeIcon" style="font-size: 18px;"></i>0/30/60</div><div><i class="fa-regular fa-burst awesomeIcon" style="font-size: 18px;"></i>0 (6)</div><div>AE 0</div><div>AK 0</div>
        </div>
    </div>`;


 */

let d = new Dialog({
    title: macroLabel,
    content: dialogContent,
    buttons: {
        one: {
            icon: '<i class="fas fa-check"></i>',
            label: "",
        },
    },
    default: "one",
    render: html => console.log("Register interactivity in the rendered dialog"),
    close: html => console.log("This always is logged no matter which option is chosen")
});
d.render(true, { width: width });

