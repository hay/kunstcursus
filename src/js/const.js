export const AUDIO_FILES = [
    'intro_01',
    'bridge_01',
    'bridge_02',
    'bridge_03',
    'bridge_04',
    'bridge_05',
    'bridge_06',
    'stepin_01',
    'stepin_02',
    'stepin_03',
    'stepin_04',
    'stepin_05',
    'stepin_06',
    'tinder_01',
    'tinder_02',
    'tinder_03',
    'tinder_04'
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

export const ZOOM_BTN_FACTOR = 0.25;