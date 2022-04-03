import { NavigationItem } from "./components/Navigation";

export const NAV_LINKS : {top: NavigationItem[], side: NavigationItem[]}  = {
    top : [
        {
            name: "Account",
            path: "/account",
        },
        {
            name: "Log Out",
            path: "/logout",
            loggedIn: true
        }
    ],
    side : [
        {
            name: "Option 1",
            path: '/',
        },
        {
            name: "Option 2",
            path: '/',
        },
        {
            name: "Option 3",
            path: '/',
        },
        {
            name: "More options 1",
            sub: [
                {
                    name: "Link to nowewhere",
                    path: '/'
                },
                {
                    name: "Another link to nowewhere",
                    path: '/'
                }
            ]
        },
        {
            name: "More options 2",
            sub: [
                {
                    name: "Link to elsewhere",
                    path: '/'
                },
                {
                    name: "Another link to elsewhere",
                    path: '/'
                }
            ]
        }
    ]
}

export const enum ERROR_MESSAGE {
    TEXT_EMPTY = 'Text length is 0',
    TEXT_LENGTH_BAD = 'Text is too long or too short',
    TEXT_PATTERN_MISMATCH = 'Text does not match its pattern',
    INVALID = 'Value is invalid'
}