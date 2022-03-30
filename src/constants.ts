export const HOME_PATH = '';

export const topLinks = {
    // "Shop" : "/shop",
    "Account" : HOME_PATH+"/account",
};

export const sideLinks = {
    "Option 1" : HOME_PATH,
    "Option 2" : HOME_PATH,
    "Option 3" : HOME_PATH,
};

export const sideCategories ={
    "More options 1" : {
        "Link to nowewhere" : HOME_PATH,
        "Another link to nowewhere" : HOME_PATH
    },
    "More options 2" : {
        "Link to elsewhere" : HOME_PATH,
        "Another link to elsewhere" : HOME_PATH
    },
}

export const enum ERROR_MESSAGE {
    TEXT_EMPTY = 'Text length is 0',
    TEXT_LENGTH_BAD = 'Text is too long or too short',
    TEXT_PATTERN_MISMATCH = 'Text does not match its pattern',
    INVALID = 'Value is invalid'
}