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
    "spotted",
    "study",
    "timefeedback"
];
export const DEFAULT_SCREEN = 'splash';
export const LOG_API = 'https://projects.haykranen.nl/kunstcursus/api/log.php';
export const MIN_QUESTION_LENGTH = 5;
export const MIN_ZOOM_RATIO = 0.25;
export const MAX_ZOOM_RATIO = 1.5;
export const PAINTING_VIEW_TIME = 60;

// FIXME
export const PROTO_SPOTS = [
    ["Een perzik", 0.2640, 0.5867],
    ["Citroenschil", 0.5120, 0.7444],
    ["Geschilde citroen", 0.5573, 0.5282],
    ["Een kelk of zoiets?", 0.4373, 0.4403],
    ["Fraai tapij", 0.9253, 0.7061],
    ["Delftsblauw keramiek", 0.8267, 0.4606],
    ["Een tomaat? Of een paprika?", 0.5600, 0.4583],
    ["Een mes, denk ik", 0.690, 0.7106],
    ["Zilveren schaal??", 0.0773, 0.6408],
    ["Een kleine pompoen??", 0.7280, 0.4899]
].map((s) => {
    return {label : s[0], x : s[1], y : s[2] }
});

export const STATEMENTS = [
    'book', 'size', 'moment', 'pets', 'visit'
];

export const ZOOM_BTN_FACTOR = 0.25;