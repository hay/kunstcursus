export const AUDIO_FILES = [
    "2x10_01",
    "2x10_02",
    "2x10_03",
    "2x10_04",
    "321_01",
    "321_02",
    "321_03",
    "321_04",
    "321_05",
    "321_06",
    "details_01",
    "details_02",
    "details_03",
    "details_04",
    "details_05",
    "intro_01",
    "oma_01",
    "oma_02",
    "oma_03",
    "oma_04",
    "outro_01",
    "overview_01",
    "profile_01",
    "profile_02",
    "stepinside_01",
    "stepinside_02",
    "stepinside_03",
    "stepinside_04",
    "stepinside_05",
    "stepinside_06",
    "stepinside_07",
    "stepinside_08",
    "thumbsup_01",
    "thumbsup_02"
];
export const COURSE_ACTIONS = [
    "comments",
    "disablezoom",
    "hidesteps",
    "imagespotter",
    "judge",
    "notice",
    "question",
    "resetcenter",
    "showsteps",
    "showviewer",
    "singleimageoff",
    "singleimageon",
    "spotted",
    "study",
    "timefeedback"
];
export const DEFAULT_SCREEN = 'splash';
export const MIN_QUESTION_LENGTH = 3;
export const MIN_ZOOM_RATIO = 0.25;
export const MAX_ZOOM_RATIO = 1.5;
export const PAINTING_VIEW_TIME = 60;

// FIXME
export const PROTO_SPOTS = [
    ["Citroenschil", 0.5251, 0.7359],
    ["Een mes", 0.6508, 0.7048],
    ["Een vaas", 0.4849, 0.1398],
    ["Weerspiegeling van de pompoen", 0.5184, 0.4025],
    ["Een keramieken schaal", 0.7764, 0.5452],
    ["Fraai tapijt", 0.7898, 0.8093],
    ["Is dit een sinaasappel?", 0.6943, 0.4859],
    ["Er zit schimmel op deze perzik", 0.2454, 0.6285],
    ["Een geschilde citroen", 0.5637, 0.5381],
    ["Blaadjes", 0.7596, 0.3305]
].map((s) => {
    return {label : s[0], x : s[1], y : s[2] }
});

export const STATEMENTS = [
    'book', 'size', 'moment', 'pets', 'visit'
];

export const TRACK_TIME_INTERVAL = 1000 * 10; // Every ten seconds

export const ZOOM_BTN_FACTOR = 0.25;