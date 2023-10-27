var start_time = performance.now();
console.log("tablerules is loading.");

const MODULE_SCOPE = "tablerules";

class TRUtils {

    static isDebugEnabled() {
        return (game.settings.get(MODULE_SCOPE, "logLevel") >= 3);
    }

    static registerSettings() {
        game.settings.register(MODULE_SCOPE, 'isEnabled', {
            name: "Enable Tablerules",
            hint: "Enables Tablerules Module changes. If we ever implement this disabling this setting will make all other Tablerules settings be ignored and return the stuff that has settings configured return to what it is without the Module. This has no effect as of now, and might just get removed instead of being implemented in the future.",
            scope: 'world',
            config: true,
            default: true,
            type: Boolean,
            requiresReload: true
        });

        game.settings.register(MODULE_SCOPE, "whispersIncludeGM", {
            name: "Whispers, add GM",
            hint: "adds the GM to all whispered chat messages",
            scope: "world",
            config: true,
            default: true,
            type: Boolean,
            requiresReload: true
        });

        game.settings.register(MODULE_SCOPE, "modifyDefaultVolumes", {
            name: "Modify Default Volumes",
            hint: "modified the core default volumes, if enabled the Module checks the current settings and adjusts them to the configured below values if they are at assumed core default values.",
            scope: "world",
            config: true,
            default: true,
            type: Boolean,
            requiresReload: true
        });

        game.settings.register(MODULE_SCOPE, "globalPlaylistVolume", {
            name: "globalPlaylistVolume default overwrite value",
            hint: "if Modify Default Volumes is enabled this overwrites the core default",
            scope: "world",
            config: true,
            default: 0.1,
            type: Number,
            requiresReload: true
        });

        game.settings.register(MODULE_SCOPE, "globalAmbientVolume", {
            name: "globalAmbientVolume default overwrite value",
            hint: "if Modify Default Volumes is enabled this overwrites the core default",
            scope: "world",
            config: true,
            default: 0.1,
            type: Number,
            requiresReload: true
        });

        game.settings.register(MODULE_SCOPE, "globalInterfaceVolume", {
            name: "globalInterfaceVolume default overwrite value",
            hint: "if Modify Default Volumes is enabled this overwrites the core default",
            scope: "world",
            config: true,
            default: 0.1,
            type: Number,
            requiresReload: true
        });

        game.settings.register(MODULE_SCOPE, "modifyChatBubbles", {
            name: "modify the default for Chat Bubbles",
            hint: "modifies the default for Chat Bubbles. Users can still overwrite this changed default.",
            scope: "world",
            config: true,
            default: true,
            type: Boolean,
            requiresReload: true
        });

        game.settings.register(MODULE_SCOPE, "chatBubbles", {
            name: "chatBubbles default overwrite",
            hint: "if Modify Chat Bubbles is enabled, overwrite the default setting for displaying chat Bubbles",
            scope: "world",
            config: true,
            default: true,
            type: Boolean,
            requiresReload: true
        });

        game.settings.register(MODULE_SCOPE, "chatBubblesPan", {
            name: "chatBubbles Pan default overwrite",
            hint: "if Modify Chat Bubbles is enabled, overwrite the default setting for displaying chat Bubbles",
            scope: "world",
            config: true,
            default: false,
            type: Boolean,
            requiresReload: true
        });

        game.settings.register(MODULE_SCOPE, "logLevel", {
            name: "Log Level",
            hint: "The Module's own log level. By default FVTT and the module don't log debug and info. Set to error for normal operation and debug for development.",
            scope: 'world',
            config: true,
            default: "error",
            type: Number,
            choices: {
                0: "error",
                1: "warning",
                2: "info",
                3: "debug"
            },
            requiresReload: true
        });

        game.settings.register(MODULE_SCOPE, 'logOwn', {
            name: "Use own logging function.",
            hint: "Enable to log using own logging method. Disable for play and enable for development if debugging (with Log Level set to debug above).",
            scope: 'world',
            config: true,
            default: false,
            type: Boolean,
            requiresReload: true
        });
    }
}

class Tablerules {

    static config = {
        loglevel: 0,
        logOwn: false
    }

    static log(level, message) {
        let levelstring;

        switch (level) {
            case 0:
                levelstring = "ERROR";
                break;
            case 1:
                levelstring = "WARNING";
                break;
            case 2:
                levelstring = "INFO";
                break;
            case 3:
                levelstring = "DEBUG";
                break;
            default:
                console.error("No logging level set.");
                console.error(message);
        }

        if (typeof message === "object") {
            console.log(message);
        } else {
            console.log({ message: "Tablerules | " + levelstring + ":" + message, obj: typeof message === "object" ? message : null });
        }
    }

    static debug(message) {
        if (Tablerules.config.loglevel < 3)
            return;
        if (Tablerules.config.logOwn) {
            Tablerules.log(3, message);
        } else {
            console.debug(message);
        }
    }

    static error(message) {
        if (Tablerules.config.logOwn) {
            Tablerules.log(0, message);
        } else {
            console.error(message);
        }
    }

    static warn(message) {
        if (Tablerules.config.loglevel < 1)
            return;
        if (Tablerules.config.logOwn) {
            Tablerules.log(1, message);
        } else {
            console.warn(message);
        }
    }

    static info(message) {
        if (Tablerules.config.loglevel < 2)
            return;
        if (Tablerules.config.logOwn) {
            Tablerules.log(2, message);
        } else {
            console.info(message);
        }
    }
}

class TREP2eDB {
    static skills = [
        { name: "Accounting", types: ["Know", "Field", "Professional Training"], value: 0, aptitude: "Cognition" },
        { name: "Administration", types: ["Know", "Fielde", "Professional Training"], value: 0, aptitude: "Cognition" },
        { name: "AR Design", types: ["Know", "Field", "Arts"], value: 0, aptitude: "Intuition" },
        { name: "Archeology", types: ["Know", "Field", "Academics"], value: 0, aptitude: "Cognition" },
        { name: "Architecture", types: ["Know", "Field", "Arts"], value: 0, aptitude: "Intuition" },
        { name: "Armorer (armor and weapons)", types: ["Active", "Field", "Technical"], value: 0, aptitude: "Cognition" },
        { name: "Asteroid Mining", types: ["Know", "Field", "Professional Training"], value: 0, aptitude: "Cognition" },
        { name: "Astrobiology", types: ["Know", "Field", "Academics"], value: 0, aptitude: "Cognition" },
        { name: "Astronomy", types: ["Know", "Field", "Academics"], value: 0, aptitude: "Cognition" },
        { name: "Astrophysics", types: ["Know", "Field", "Academics"], value: 0, aptitude: "Cognition" },
        { name: "Astrosociology", types: ["Know", "Field", "Academics"], value: 0, aptitude: "Cognition" },
        { name: "Athletics", types: ["Active", "Physical"], value: 0, aptitude: "Somatics" },
        { name: "Animal Handling", types: ["Active", "Field", "Exotic"], value: 0, aptitude: "Savvy" },
        { name: "Biology", types: ["Know", "Field", "Academics"], value: 0, aptitude: "Cognition" },
        { name: "Biotech", types: ["Active", "Field", "Technical", "Medicine"], value: 0, aptitude: "Cognition" },
        { name: "Body Bank Ops", types: ["Know", "Field", "Professional Training"], value: 0, aptitude: "Cognition" },
        { name: "Bodyguarding", types: ["Know", "Field", "Professional Training"], value: 0, aptitude: "Cognition" },
        { name: "Bow", types: ["Active", "Field", "Exotic"], value: 0, aptitude: "Reflexes" },
        { name: "Celebrities", types: ["Know", "Field", "Interests"], value: 0, aptitude: "Cognition" },
        { name: "Chemistry", types: ["Know", "Field", "Academics"], value: 0, aptitude: "Cognition" },
        { name: "Computer Science", types: ["Know", "Field", "Academics"], value: 0, aptitude: "Cognition" },
        { name: "Con Artistry", types: ["Know", "Field", "Professional Training"], value: 0, aptitude: "Cognition" },
        { name: "Conspiracies", types: ["Know", "Field", "Interests"], value: 0, aptitude: "Cognition" },
        { name: "Cool Hunting", types: ["Know", "Field", "Professional Training"], value: 0, aptitude: "Cognition" },
        { name: "Criticism", types: ["Know", "Field", "Arts"], value: 0, aptitude: "Intuition" },
        { name: "Cryptography", types: ["Know", "Field", "Academics"], value: 0, aptitude: "Cognition" },
        { name: "Dance", types: ["Know", "Field", "Arts"], value: 0, aptitude: "Intuition" },
        { name: "Data Processing", types: ["Know", "Field", "Professional Training"], value: 0, aptitude: "Cognition" },
        { name: "Deceive", types: ["Active", "Social"], value: 0, aptitude: "Savvy" },
        { name: "Demolitions (explosives)", types: ["Active", "Field", "Technical"], value: 0, aptitude: "Cognition" },
        { name: "Disguise", types: ["Active", "Field", "Exotic"], value: 0, aptitude: "Intuition" },
        { name: "Drama", types: ["Know", "Field", "Arts"], value: 0, aptitude: "Intuition" },
        { name: "Drawing", types: ["Know", "Field", "Arts"], value: 0, aptitude: "Intuition" },
        { name: "Economics", types: ["Know", "Field", "Academics"], value: 0, aptitude: "Cognition" },
        { name: "Ego Hunting", types: ["Know", "Field", "Professional Training"], value: 0, aptitude: "Cognition" },
        { name: "Emergency Services", types: ["Know", "Field", "Professional Training"], value: 0, aptitude: "Cognition" },
        { name: "Engineering", types: ["Know", "Field", "Academics"], value: 0, aptitude: "Cognition" },
        { name: "Entertainment", types: ["Know", "Field", "Professional Training"], value: 0, aptitude: "Cognition" },
        { name: "Escape Artist", types: ["Active", "Field", "Exotic"], value: 0, aptitude: "Reflexes" },
        { name: "Exhumans", types: ["Know", "Field", "Interests"], value: 0, aptitude: "Cognition" },
        { name: "Exoplanet Colonies", types: ["Know", "Field", "Interests"], value: 0, aptitude: "Cognition" },
        { name: "Factors", types: ["Know", "Field", "Interests"], value: 0, aptitude: "Cognition" },
        { name: "Fencing", types: ["Know", "Field", "Professional Training"], value: 0, aptitude: "Cognition" },
        { name: "Field Science", types: ["Know", "Field", "Professional Training"], value: 0, aptitude: "Cognition" },
        { name: "First-Contact Ops", types: ["Know", "Field", "Professional Training"], value: 0, aptitude: "Cognition" },
        { name: "Flight Crew Ops", types: ["Know", "Field", "Professional Training"], value: 0, aptitude: "Cognition" },
        { name: "Forensics", types: ["Active", "Field", "Technical", "Medicine"], value: 0, aptitude: "Cognition" },
        { name: "Fray", types: ["Active", "Combat"], value: 0, aptitude: "Reflexes" },
        { name: "Free Fall", types: ["Active", "Physical"], value: 0, aptitude: "Somatics" },
        { name: "Freelancing", types: ["Know", "Field", "Professional Training"], value: 0, aptitude: "Cognition" },
        { name: "Gambling", types: ["Know", "Field", "Interests"], value: 0, aptitude: "Cognition" },
        { name: "Gas Mining", types: ["Know", "Field", "Professional Training"], value: 0, aptitude: "Cognition" },
        { name: "Gatecrashing", types: ["Know", "Field", "Professional Training"], value: 0, aptitude: "Cognition" },
        { name: "Genetics", types: ["Know", "Field", "Academics"], value: 0, aptitude: "Cognition" },
        { name: "Geology", types: ["Know", "Field", "Academics"], value: 0, aptitude: "Cognition" },
        { name: "Groundcraft", types: ["Active", "Field", "Technical"], value: 0, aptitude: "Cognition" },
        { name: "Guns", types: ["Active", "Combat"], value: 0, aptitude: "Reflexes" },
        { name: "Habitat Ops", types: ["Know", "Field", "Professional Training"], value: 0, aptitude: "Cognition" },
        { name: "Hardware: Aerospace", types: ["Active", "Field", "Technical"], value: 0, aptitude: "Cognition", bookName: "Aerospace (aircraft and spacecraft)", source: { source: "ep2e", page: 49 } },
        { name: "Hardware: Electronics", types: ["Active", "Field", "Technical"], value: 0, aptitude: "Cognition", bookName: "Electronics", source: { source: "ep2e", page: 49 } },
        { name: "Hardware: Robotics", types: ["Active", "Field", "Technical"], value: 0, aptitude: "Cognition", bookName: "Robotics (bots and synthmorphs)", source: { source: "ep2e", page: 49 } },
        { name: "History", types: ["Know", "Field", "Academics"], value: 0, aptitude: "Cognition" },
        { name: "Hypercorp Politics", types: ["Know", "Field", "Interests"], value: 0, aptitude: "Cognition" },
        { name: "Industrial (factory, habitat, and life support systems)", types: ["Active", "Field", "Technical"], value: 0, aptitude: "Cognition" },
        { name: "Infiltrate", types: ["Active", "Physical"], value: 0, aptitude: "Reflexes" },
        { name: "Infosec", types: ["Active", "Technical"], value: 0, aptitude: "Cognition" },
        { name: "Instruction", types: ["Know", "Field", "Professional Training"], value: 0, aptitude: "Cognition" },
        { name: "Interface", types: ["Active", "Technical"], value: 0, aptitude: "Cognition" },
        { name: "Investigation", types: ["Know", "Field", "Professional Training"], value: 0, aptitude: "Cognition" },
        { name: "Journalism", types: ["Know", "Field", "Professional Training"], value: 0, aptitude: "Cognition" },
        { name: "Kinesics", types: ["Active", "Social"], value: 0, aptitude: "Savvy" },
        { name: "Lab Ops", types: ["Know", "Field", "Professional Training"], value: 0, aptitude: "Cognition" },
        { name: "Law", types: ["Know", "Field", "Academics"], value: 0, aptitude: "Cognition" },
        { name: "Linguistics", types: ["Know", "Field", "Academics"], value: 0, aptitude: "Cognition" },
        { name: "Lunar Habitats", types: ["Know", "Field", "Interests"], value: 0, aptitude: "Cognition" },
        { name: "Martian Beers", types: ["Know", "Field", "Interests"], value: 0, aptitude: "Cognition" },
        { name: "Mathematics", types: ["Know", "Field", "Academics"], value: 0, aptitude: "Cognition" },
        { name: "Medical Services", types: ["Know", "Field", "Professional Training"], value: 0, aptitude: "Cognition" },
        { name: "Melee", types: ["Active", "Combat"], value: 0, aptitude: "Somatics" },
        { name: "Memetics", types: ["Know", "Field", "Academics"], value: 0, aptitude: "Cognition" },
        { name: "Military Ops", types: ["Know", "Field", "Professional Training"], value: 0, aptitude: "Cognition" },
        { name: "Morph Design", types: ["Know", "Field", "Professional Training"], value: 0, aptitude: "Cognition" },
        { name: "Morphs", types: ["Know", "Field", "Interests"], value: 0, aptitude: "Cognition" },
        { name: "Music", types: ["Know", "Field", "Arts"], value: 0, aptitude: "Intuition" },
        { name: "Nanofacturing", types: ["Know", "Field", "Professional Training"], value: 0, aptitude: "Cognition" },
        { name: "Nanotechnology", types: ["Know", "Field", "Academics"], value: 0, aptitude: "Cognition" },
        { name: "Nautical (watercraft and submarines)", types: ["Active", "Field", "Technical"], value: 0, aptitude: "Cognition" },
        { name: "Network Engineering", types: ["Know", "Field", "Professional Training"], value: 0, aptitude: "Cognition" },
        { name: "Painting", types: ["Know", "Field", "Arts"], value: 0, aptitude: "Intuition" },
        { name: "Paramedic", types: ["Active", "Field", "Technical", "Medicine"], value: 0, aptitude: "Cognition" },
        { name: "Perceive", types: ["Active", "Combat"], value: 0, aptitude: "Intuition" },
        { name: "Performance", types: ["Know", "Field", "Arts"], value: 0, aptitude: "Intuition" },
        { name: "Persuade", types: ["Active", "Social"], value: 0, aptitude: "Savvy" },
        { name: "Pharmacology", types: ["Active", "Field", "Technical", "Medicine"], value: 0, aptitude: "Cognition" },
        { name: "Physics", types: ["Know", "Field", "Academics"], value: 0, aptitude: "Cognition" },
        { name: "Pilot: Air", types: ["Active", "Field", "Vehicle", "Pilot"], value: 0, aptitude: "Reflexes" },
        { name: "Pilot: Ground", types: ["Active", "Field", "Vehicle", "Pilot"], value: 0, aptitude: "Reflexes" },
        { name: "Pilot: Nautical", types: ["Active", "Field", "Vehicle", "Pilot"], value: 0, aptitude: "Reflexes" },
        { name: "Pilot: Space", types: ["Active", "Field", "Vehicle", "Pilot"], value: 0, aptitude: "Reflexes" },
        { name: "Plasma Cutter", types: ["Active", "Field", "Exotic"], value: 0, aptitude: "Reflexes" },
        { name: "Police Ops", types: ["Know", "Field", "Professional Training"], value: 0, aptitude: "Cognition" },
        { name: "Political Science", types: ["Know", "Field", "Academics"], value: 0, aptitude: "Cognition" },
        { name: "Program", types: ["Active", "Technical"], value: 0, aptitude: "Cognition" },
        { name: "Provoke", types: ["Active", "Social"], value: 0, aptitude: "Savvy" },
        { name: "PSI", types: ["Active", "Mental", "Psi"], value: 0, aptitude: "Willpower" },
        { name: "Psychology", types: ["Know", "Field", "Academics"], value: 0, aptitude: "Cognition" },
        { name: "Psychosurgery", types: ["Active", "Field", "Technical", "Medicine"], value: 0, aptitude: "Cognition" },
        { name: "Racketeering", types: ["Know", "Field", "Professional Training"], value: 0, aptitude: "Cognition" },
        { name: "Reclaimer Blogs", types: ["Know", "Field", "Interests"], value: 0, aptitude: "Cognition" },
        { name: "Research", types: ["Active", "Technical"], value: 0, aptitude: "Cognition" },
        { name: "Spaceship Models", types: ["Know", "Field", "Interests"], value: 0, aptitude: "Cognition" },
        { name: "Scavenging", types: ["Know", "Field", "Professional Training"], value: 0, aptitude: "Cognition" },
        { name: "Sculpture", types: ["Know", "Field", "Arts"], value: 0, aptitude: "Intuition" },
        { name: "Scum Drug Dealers", types: ["Know", "Field", "Interests"], value: 0, aptitude: "Cognition" },
        { name: "Security Ops", types: ["Know", "Field", "Professional Training"], value: 0, aptitude: "Cognition" },
        { name: "Service Work", types: ["Know", "Field", "Professional Training"], value: 0, aptitude: "Cognition" },
        { name: "Singing", types: ["Know", "Field", "Arts"], value: 0, aptitude: "Intuition" },
        { name: "Sleight of Hand", types: ["Active", "Field", "Exotic"], value: 0, aptitude: "Reflexes" },
        { name: "Smuggling", types: ["Know", "Field", "Professional Training"], value: 0, aptitude: "Cognition" },
        { name: "Social Engineering", types: ["Know", "Field", "Professional Training"], value: 0, aptitude: "Cognition" },
        { name: "Social Services", types: ["Know", "Field", "Professional Training"], value: 0, aptitude: "Cognition" },
        { name: "Sociology", types: ["Know", "Field", "Academics"], value: 0, aptitude: "Cognition" },
        { name: "Speech", types: ["Know", "Field", "Arts"], value: 0, aptitude: "Intuition" },
        { name: "Spycraft", types: ["Know", "Field", "Professional Training"], value: 0, aptitude: "Cognition" },
        { name: "Strategy Games", types: ["Know", "Field", "Interests"], value: 0, aptitude: "Cognition" },
        { name: "Surveying", types: ["Know", "Field", "Professional Training"], value: 0, aptitude: "Cognition" },
        { name: "Survival", types: ["Active", "Physical"], value: 0, aptitude: "Intuition" },
        { name: "System Administration", types: ["Know", "Field", "Professional Training"], value: 0, aptitude: "Cognition" },
        { name: "Terraforming", types: ["Know", "Field", "Professional Training"], value: 0, aptitude: "Cognition" },
        { name: "Throwing Knieves", types: ["Active", "Field", "Exotic"], value: 0, aptitude: "Reflexes" },
        { name: "TITAN Tech", types: ["Know", "Field", "Interests"], value: 0, aptitude: "Cognition" },
        { name: "Transhuman Factions", types: ["Know", "Field", "Interests"], value: 0, aptitude: "Cognition" },
        { name: "Triad Economics", types: ["Know", "Field", "Interests"], value: 0, aptitude: "Cognition" },
        { name: "Underground XP", types: ["Know", "Field", "Interests"], value: 0, aptitude: "Cognition" },
        { name: "Veterinary", types: ["Active", "Field", "Technical", "Medicine"], value: 0, aptitude: "Cognition" },
        { name: "VR Design", types: ["Know", "Field", "Arts"], value: 0, aptitude: "Intuition" },
        { name: "VR Games", types: ["Know", "Field", "Interests"], value: 0, aptitude: "Cognition" },
        { name: "Whips", types: ["Active", "Field", "Exotic"], value: 0, aptitude: "Reflexes" },
        { name: "Writing", types: ["Know", "Field", "Arts"], value: 0, aptitude: "Intuition" },
        { name: "Xeno-archeology", types: ["Know", "Field", "Academics"], value: 0, aptitude: "Cognition" },
        { name: "Xenolinguistics", types: ["Know", "Field", "Academics"], value: 0, aptitude: "Cognition" },
        { name: "Zoology", types: ["Know", "Field", "Academics"], value: 0, aptitude: "Cognition" },
    ];

    static factions = [
        { name: "Anarchist", description: "You believe power is corrupt and favor voluntary, non-hierarchical organizations based on direct democracy." },
        { name: "Argonaut", description: "You seek technoprogressive solutions to transhumanity's injustices and inequalities." },
        { name: "Barsoomian", description: "You wish to see Mars liberated from hypercorp control." },
        { name: "Brinker", description: "You belong to a cult, commune, or other group that seeks isolation from the rest of transhumanity." },
        { name: "Criminal", description: "You are associated with the underworld, either part of a large cartel, smaller gang, or as an independent operator." },
        { name: "Extropian", description: "You believe in unrestricted free markets and that taking proactive risks with technology is better than playing it safe." },
        { name: "Hypercorp", description: "You support hypercapitalist expansion and competitive-economics-driven social order. You accept that certain liberties must be restricted for security and freedom." },
        { name: "Jovian", description: "You are a bioconservative concerned about out-of-contol transhuman technologies." },
        { name: "Lunar/Orbital", description: "You support the conservative economics, Earth-tied nationalism, and traditionalism of the Lunar-Lagrange Alliance." },
        { name: "Mercurial", description: "You oppose the assimilation and oppression of AGIs and uplifts, supporting self-determination for your kind." },
        { name: "Reclaimer", description: "You believe transhumanity should be focused on reclaiming, terraforming, and repopulating Earth." },
        { name: "Scum", description: "You push the boundaries of the experimental, fully testing what it means to be transhuman." },
        { name: "Socialite", description: "You are a part of the glitterati, defining and defined by inner-system media culture." },
        { name: "Titanian", description: "You are a technosocialist, believing that science and technology can provide for the well-being of all." },
        { name: "Venusian", description: "You adhere to the Morningstar Constellation's vision for a more socialized, friendlier hypercapitalism." },
        { name: "Regional", description: "You are a Solarian, Sifter, Belter, Europan, Ringer, or Skimmer invested in the culture, prosperity, and security of your area of the Solar System." },
    ];

    static modelSkills = ["Infosec", "Interface", "Perceive", "Program", "Research", "Survival", "Deceive", "Kinesics", "Persuade", "Provoke", "PSI", "Athletics", "Fray", "Free Fall", "Guns", "Infiltrate", "Melee"];
}

TREP2eDB.factions.forEach(f => {
    TREP2eDB.skills.push({ name: f.name, types: ["Know", "Faction"], value: 0, aptitude: "Cognition" });
});

TREP2eDB.skills.sort((a, b) => {
    return a.name.localeCompare(b.name);
});

class TREP2Encyclopedia {
    static r = { label: "root" };
}

function loadEncyclopedia() {
    TREP2Encyclopedia.r["Factions"] = { description: "" };
    TREP2eDB.factions.forEach(f => {
        TREP2Encyclopedia.r.Factions[f.name] = { description: f.description };
    });

    TREP2Encyclopedia.r.Factions["Lunar/Orbital"].cName = "The Lunar-Lagrange Alliance";
    TREP2Encyclopedia.r.Factions["Lunar/Orbital"].abbreviation = "LLA";
    TREP2Encyclopedia.r.Factions["Lunar/Orbital"].article = `
        <div style="text-align: left;">
            <h3 style="margin-bottom: 15px;">${TREP2Encyclopedia.r.Factions["Lunar/Orbital"].cName} (${TREP2Encyclopedia.r.Factions["Lunar/Orbital"].abbreviation})</h3>
            <div style="margin-bottom: 5px;"><b>Memes:</b> Biochauvinism, Capitalism, Reclaiming Earth</div>
            <div style="margin-bottom: 5px;"><b>Mein Habitats:</b> Erato (Luna), Remembrance (Earth Orbit), Shackle (Luna)</div>
            <div style="margin-bottom: 5px;">The LLA: your grumpy Indian dad who is also a Swiss banker. Decried as obsolete by the Planetary Consortium, derided as stodgy and out of touch by the outer system, transhumanity’s first great off-world alliance plods on like a teflon baluchitherium. A number of settlements, including the largest Lunar city, Nectar, have defected to the Consortium, but Earth orbit and the two other big Lunar cities remain staunch Alliance members. Even though Luna might be the old and Mars the new, Luna’s advantage from being settled first hasn’t totally eroded.</div>
        </div>`;
}

loadEncyclopedia();


class TRTacNet {
    static reportSkill(name, folderName = "PC") {
        let skill = TREP2eDB.skills.find(s => s.name === name);
        if (skill === undefined) {
            Tablerules.info({ message: `TRTacNet.reportSkill(${name}), not found.`, name: name });
            return null;
        }

        const crew = game.folders.find(f => f.name === folderName).contents;
        const report = { skill: skill, experts: [] };
        crew.forEach(a => {

            if (TREP2eDB.modelSkills.includes(name)) { // one could work with a lookup and a.system.skillsIns["infosec"].value and such, but it would still only remove the leaf, still requiring the model vs. Item branch and three branches in model. The model design just sucks.
                const modSkill = { name: name, system: { aptitude: null, roll: 0, value: 0 } };
                if (name === "Infosec") {
                    modSkill.system.aptitude = "cog";
                    modSkill.system.value = a.system.skillsIns.infosec.value;
                    modSkill.system.roll = a.system.skillsIns.infosec.roll; // is this always there?
                }

                if (name === "Interface") {
                    modSkill.system.aptitude = "cog";
                    modSkill.system.value = a.system.skillsIns.interface.value;
                    modSkill.system.roll = a.system.skillsIns.interface.roll;
                }

                if (name === "Perceive") {
                    modSkill.system.aptitude = "int";
                    modSkill.system.value = a.system.skillsIns.perceive.value;
                    modSkill.system.roll = a.system.skillsIns.perceive.roll;
                }

                if (name === "Program") {
                    modSkill.system.aptitude = "cog";
                    modSkill.system.value = a.system.skillsIns.program.value;
                    modSkill.system.roll = a.system.skillsIns.program.roll;
                }

                if (name === "Research") {
                    modSkill.system.aptitude = "int";
                    modSkill.system.value = a.system.skillsIns.research.value;
                    modSkill.system.roll = a.system.skillsIns.research.roll;
                }

                if (name === "Survival") {
                    modSkill.system.aptitude = "int";
                    modSkill.system.value = a.system.skillsIns.survival.value;
                    modSkill.system.roll = a.system.skillsIns.survival.roll;
                }

                if (name === "Deceive") {
                    modSkill.system.aptitude = "sav";
                    modSkill.system.value = a.system.skillsMox.deceive.value;
                    modSkill.system.roll = a.system.skillsMox.deceive.roll;
                }

                if (name === "Kinesics") {
                    modSkill.system.aptitude = "sav";
                    modSkill.system.value = a.system.skillsMox.kinesics.value;
                    modSkill.system.roll = a.system.skillsMox.kinesics.roll;
                }

                if (name === "Persuade") {
                    modSkill.system.aptitude = "sav";
                    modSkill.system.value = a.system.skillsMox.persuade.value;
                    modSkill.system.roll = a.system.skillsMox.persuade.roll;
                }

                if (name === "Provoke") {
                    modSkill.system.aptitude = "sav";
                    modSkill.system.value = a.system.skillsMox.provoke.value;
                    modSkill.system.roll = a.system.skillsMox.provoke.roll;
                }

                if (name === "PSI") {
                    modSkill.system.aptitude = "wil";
                    modSkill.system.value = a.system.skillsMox.psi.value;
                    modSkill.system.roll = a.system.skillsMox.psi.roll;
                }

                if (name === "Athletics") {
                    modSkill.system.aptitude = "som";
                    modSkill.system.value = a.system.skillsVig.athletics.value;
                    modSkill.system.roll = a.system.skillsVig.athletics.roll;
                }

                if (name === "Fray") {
                    modSkill.system.aptitude = "ref";
                    modSkill.system.value = a.system.skillsVig.fray.value;
                    modSkill.system.roll = a.system.skillsVig.fray.roll;
                }

                if (name === "Free Fall") {
                    modSkill.system.aptitude = "som";
                    modSkill.system.value = a.system.skillsVig["free fall"].value;
                    modSkill.system.roll = a.system.skillsVig["free fall"].roll;
                }

                if (name === "Guns") {
                    modSkill.system.aptitude = "ref";
                    modSkill.system.value = a.system.skillsVig.guns.value;
                    modSkill.system.roll = a.system.skillsVig.guns.roll;
                }

                if (name === "Infiltrate") {
                    modSkill.system.aptitude = "ref";
                    modSkill.system.value = a.system.skillsVig.infiltrate.value;
                    modSkill.system.roll = a.system.skillsVig.infiltrate.roll;
                }

                if (name === "Melee") {
                    modSkill.system.aptitude = "som";
                    modSkill.system.value = a.system.skillsVig.melee.value;
                    modSkill.system.roll = a.system.skillsVig.melee.roll;
                }

                report.experts.push({ actor: a, item: modSkill });
                return;
            }

            const item = a.items.find(i => i.name === name && (i.type === "knowSkill" || i.type === "specialSkill"));
            if (item !== undefined) {
                if (item.system.roll === 0) {
                    item.system.roll = Number(item.system.value);
                    if (item.system.aptitude === "cog") {
                        item.system.roll += a.system.aptitudes.cog.value;
                    }
                    if (item.system.aptitude === "int") {
                        item.system.roll += a.system.aptitudes.int.value;
                    }
                    if (item.system.aptitude === "ref") {
                        item.system.roll += a.system.aptitudes.ref.value;
                    }
                    if (item.system.aptitude === "sav") {
                        item.system.roll += a.system.aptitudes.sav.value;
                    }
                    if (item.system.aptitude === "som") {
                        item.system.roll += a.system.aptitudes.som.value;
                    }
                    if (item.system.aptitude === "wil") {
                        item.system.roll += a.system.aptitudes.wil.value;
                    }
                }

                report.experts.push({ actor: a, item: item });
                return;
            }
        });

        report.experts.sort((a, b) => {
            if (b.item.system.roll - a.item.system.roll != 0) {
                return b.item.system.roll - a.item.system.roll;
            } else {
                return a.actor.name.localeCompare(b.actor.name);
            }
        });

        return report;
    }

    static shortenReportSkill(report) {
        if (report == null) {
            return report;
        }
        const shortForm = [];
        report.experts.forEach(e => {
            shortForm.push({ name: e.actor.name, value: e.item.system.value, roll: e.item.system.roll });
        });
        return shortForm;
    }

    static reportUnknownSkills(folderName = "PC") {
        const crew = game.folders.find(f => f.name === folderName).contents;
        const unknownSkills = [];
        crew.forEach(a => {
            a.items.contents.forEach(i => {
                if (i.type === "knowSkill" || i.type === "specialSkill") {
                    if (TREP2eDB.skills.find(s => s.name === i.name) === undefined) {
                        unknownSkills.push({ actor: a, item: i });
                    }
                }
            });
        });
        unknownSkills.sort((a, b) => {
            if (a.actor.name.localeCompare(b.actor.name) != 0) {
                return a.actor.name.localeCompare(b.actor.name);
            } else {
                return a.item.name.localeCompare(b.item.name);
            }
        })
        return unknownSkills;
    }
}


Hooks.on('init', () => {
    TRUtils.registerSettings();
});


Hooks.on("preCreateChatMessage", (messageDoc, rawMessageData, context, userId) => {

    if (!game.settings.get(MODULE_SCOPE, "whispersIncludeGM") || !game.settings.get(MODULE_SCOPE, "isEnabled")) {
        return;
    }

    const gmWhisperIds = ChatMessage.getWhisperRecipients("gm").map(i => i.id) // get all gm ids in the world
    let whisperArray = duplicate(messageDoc.whisper) // Copy our array out
    if (whisperArray.length === 0) return // Not a whisper if there's no whisper ids


    for (let gmId of gmWhisperIds) {// Push each gm id into the array of whisper ids
        if (gmId === game.user.id) continue // You never include yourself in the whisper so this would erronously add yourself causing the "we changed the array! trigger later on"
        if (!whisperArray.includes(gmId)) {
            whisperArray.push(gmId)
        }
    }

    if (whisperArray.length !== messageDoc.whisper.length) { //only modify if needed
        let userListString = ""
        for (let userId of messageDoc.whisper) {
            userListString = userListString + game.users.get(userId).name + ", "
        }
        userListString = userListString.slice(0, -2)

        messageDoc.updateSource({
            content: `${messageDoc.content}`,//<br>Original Whisper Recipients: ${userListString}`,
            whisper: whisperArray
        })
    }
});

Hooks.on("ready", function () {
    console.log("Tablerules hooked onto ready.");

    Tablerules.config.loglevel = game.settings.get(MODULE_SCOPE, "logLevel");
    Tablerules.config.logOwn = game.settings.get(MODULE_SCOPE, "logOwn");

    if (game.settings.get(MODULE_SCOPE, "modifyDefaultVolumes")) {
        if (Array.from(game.settings.settings, ([key, value]) => ({ key, value })).find(e => e.key === "core.globalPlaylistVolume").value.default === game.settings.get("core", "globalPlaylistVolume")) {
            game.settings.set("core", "globalPlaylistVolume", game.user.flags?.world?.globalPlaylistVolume ?? game.settings.get(MODULE_SCOPE, "globalPlaylistVolume"));
        }

        if (Array.from(game.settings.settings, ([key, value]) => ({ key, value })).find(e => e.key === "core.globalAmbientVolume").value.default === game.settings.get("core", "globalAmbientVolume")) {
            game.settings.set("core", "globalAmbientVolume", game.user.flags?.world?.globalAmbientVolume ?? game.settings.get(MODULE_SCOPE, "globalAmbientVolume"));
        }

        if (Array.from(game.settings.settings, ([key, value]) => ({ key, value })).find(e => e.key === "core.globalInterfaceVolume").value.default === game.settings.get("core", "globalInterfaceVolume")) {
            game.settings.set("core", "globalInterfaceVolume", game.user.flags?.world?.globalInterfaceVolume ?? game.settings.get(MODULE_SCOPE, "globalInterfaceVolume"));
        }

        ui.sidebar.tabs.playlists.render();
    }

    if (game.settings.get(MODULE_SCOPE, "modifyChatBubbles")) {
        if (Array.from(game.settings.settings, ([key, value]) => ({ key, value })).find(e => e.key === "core.chatBubbles").value.default === game.settings.get("core", "chatBubbles")) {
            game.settings.set("core", "chatBubbles", game.user.flags?.world?.globalInterfaceVolume ?? game.settings.get(MODULE_SCOPE, "chatBubbles"));
        }

        if (Array.from(game.settings.settings, ([key, value]) => ({ key, value })).find(e => e.key === "core.chatBubblesPan").value.default === game.settings.get("core", "chatBubblesPan")) {
            game.settings.set("core", "chatBubblesPan", game.user.flags?.world?.globalInterfaceVolume ?? game.settings.get(MODULE_SCOPE, "chatBubblesPan"));
        }
    }

});

console.log(`Tablerules has been loaded (${performance.now() - start_time}ms).`);
