import {_} from 'meteor/underscore'

export const MAP_QUESTIONS_SHORT_OLD = {
    GD_1: "Achter gezamelijk doel staan",
    GD_2: "Duidelijk doel",
    BvK_1: "Ieder passende uitdagingen",
    BvK_2: "Individuele sterktes benutten",
    BvK_3: "Bijdrage sterktes tot geheel",
    VK_1: "Veilig gevoel",
    VK_2: "Veilige plek om te leren",
    VK_3: "Veilige plek om risico's te nemen",
    VK_4: "Positieve sfeer",
    WC_1: "Aandacht voor ieder zijn werk",
    WC_2: "Weten wie wat doet",
    WC_3: "Vlotte samenwerking is belangrijk",
    GvE_1: "Eenheidsgevoel",
    GvE_2: "Elk een deel van het team.",
    GvE_3: "Samen opdrachten uitvoeren",
    GvE_4: "Band tussen iedereen",
    Ve_1: "Vertrouwen om samen taak te maken",
    Ve_2: "Vertrouwen in elkaar",
    Ve_3: "Vertrouwen in goed einde taak"
};

export const MAP_QUESTIONS_SHORT = {
    "question-1": "Duidelijk doel afgesproken",
    "question-2": "Vertrouwen in elkaar",
    "question-3": "Rekening met ieders sterktes",
    "question-4": "Eenheidsgevoel",
    "question-5": "Duidelijk plan van aanpak",
    "question-6": "Communicatie bij onenigheid",
    "question-7": "Duidelijke takenverdeling",
    "question-8": "Genoeg overleg",
    "question-9": "Ieder staat achter plan van aanpak",
    "question-10": "Op ons gemak voelen",
    "question-11": "Op de hoogte van ieders bezigheid",
    "question-12": "Inzet op vlotte samenwerking",
};

export const MAP_QUESTIONS_LONG_OLD = {
    GD_1: "We staan achter de doelen die we samen gekozen hebben.",
    GD_2: "We spreken met elkaar duidelijke doelen af.",
    BvK_1: "Elk teamlid gaat passende uitdagingen aan.",
    BvK_2: "We maken gebruik van elkaars sterktes.",
    BvK_3: "Ieders sterktes dragen een deel bij tot het geheel.",
    VK_1: "We voelen ons veilig om onze taak uit te voeren.",
    VK_2: "Er was een veilige plek om te leren.",
    VK_3: "We voelen ons veilig om risico’s te nemen of iets uitdagender te doen.",
    VK_4: "Er is een positieve sfeer om de opdrachten goed uit te voeren.",
    WC_1: "We hebben aandacht voor wat elk teamlid doet.",
    WC_2: "We weten van elkaar wie wat doet.",
    WC_3: "We vinden een goede en vlotte samenwerking het belangrijkste.",
    GvE_1: "We voelen ons één team.",
    GvE_2: "We zijn elk een deel van het team.",
    GvE_3: "Het team voert de opdrachten steeds samen uit.",
    GvE_4: "We voelen een band tussen iedereen in het team.",
    Ve_1: "We hebben vertrouwen in elkaar om samen de taak te volbrengen.",
    Ve_2: "We vertrouwen elkaar onderling.",
    Ve_3: "We geloven als team dat we de opdrachten tot een goed einde zullen brengen."
};

export const MAP_QUESTIONS_LONG = {
    "question-1": "In ons team spraken we een duidelijk doel af.",
    "question-2": "In ons team vertrouwden we op elkaar bij het maken van de opdracht.",
    "question-3": "In ons team hielden we rekening met elkaars sterktes en zwaktes bij het verdelen van de taken.",
    "question-4": "In ons team voelden we ons één team.",
    "question-5": "In ons team hadden we een duidelijk plan om ons doel te bereiken.",
    "question-6": "In ons team lieten we elkaar weten wanneer we ergens niet akkoord mee waren.",
    "question-7": "In ons team was het duidelijk wat ieder zijn taak was.",
    "question-8": "In ons team overlegden we genoeg.",
    "question-9": "In ons team stonden we allen achter ons gekozen plan van aanpak.",
    "question-10": "In ons team voelden we ons op ons gemak.",
    "question-11": "In ons team lieten we elkaar regelmatig weten waar we mee bezig waren.",
    "question-12": "In ons team werd er ingezet op een vlotte samenwerking.",
};

export const QUALTRICS_VRAGEN_PLAN = ["question-1", "question-5", "question-9"];
export const QUALTRICS_VRAGEN_VERTROUWEN = ["question-2", "question-6", "question-10"];
export const QUALTRICS_VRAGEN_ROLLEN = ["question-3", "question-7", "question-11"];
export const QUALTRICS_VRAGEN_LIJN = ["question-4", "question-8", "question-12"];
export const QUALTRICS_VRAGEN = _.union(QUALTRICS_VRAGEN_PLAN, QUALTRICS_VRAGEN_VERTROUWEN, QUALTRICS_VRAGEN_ROLLEN, QUALTRICS_VRAGEN_LIJN);

export const CRITERIUM_TO_LONG = {
    plan: "Team met een plan",
    vertrouwen: "Team met vertrouwen",
    rollen: "Team met verschillende rollen",
    lijn: "Team dat op dezelfde lijn zit"
};

// EDUbox Stijl

// Hoofdkleuren
export const green = "#3FA535";
export const red = "#EA5057";
export const blue = "#3462AC";

// Secundaire kleuren
export const nws_blue = "#16284A";
export const nws_green = "#5DFC71";
export const orange = "#F39200";
export const yellow = "#ECE202";


export const grijs = "#C4C4C4"

export const CRITERIUM_TO_COLOR = {
    plan: blue,
    vertrouwen: orange,
    rollen: green,
    lijn: red
};

export const ROLE_TO_AVATAR = {
    pilot: "https://edubox.vrtnws.be/teamwork-platform/teamwork-web-resources/image/piloot.png",
    engineer: "https://edubox.vrtnws.be/teamwork-platform/teamwork-web-resources/image/ingenieur.png",
    coordinator: "https://edubox.vrtnws.be/teamwork-platform/teamwork-web-resources/image/coordinator.png",
    scientist: "https://edubox.vrtnws.be/teamwork-platform/teamwork-web-resources/image/wetenschapper.png",
    spacecraft: "https://tools.vrtinnovatie.be/steams/road-to-mars/static/rakket-378c649b80d86f83fc559c8a92ddf06d.png"
};

export const QUESTION_TO_CRITERIUM = (question) => {
    if (QUALTRICS_VRAGEN_PLAN.includes(question)) {
        return "plan";
    }
    if (QUALTRICS_VRAGEN_VERTROUWEN.includes(question)) {
        return "vertrouwen";
    }
    if (QUALTRICS_VRAGEN_ROLLEN.includes(question)) {
        return "rollen";
    }
    if (QUALTRICS_VRAGEN_LIJN.includes(question)) {
        return "lijn";
    }
}

export const CATEGORY_TO_SHORT = {
    plan: "Training - plan",
    vertrouwen: "Training - vertrouwen",
    rollen: "Training - rollen",
    lijn: "Training - zelfde lijn",
    situational: "Situaties inschatten",
    rtm: "Missie naar Mars",
}

export const SLIDE_TO_TIME_CATEGORY = (number) => {
    let slideNumber = parseInt(number);
    if (22 < slideNumber && slideNumber < 28) {
        return "plan"
    }
    if (27 < slideNumber && slideNumber < 33) {
        return "vertrouwen"
    }
    if (32 < slideNumber && slideNumber < 38) {
        return "rollen"
    }
    if (37 < slideNumber && slideNumber < 43) {
        return "lijn"
    }
    if (45 === slideNumber) {
        return "situational"
    }
    if (54 === slideNumber) {
        return "rtm"
    }
    return "other"

};
export const maxEDUboxSlideNumber = 60;

export const OPACITY = 0.5;
export const OPACITY_BACKGROUND = 0.2;