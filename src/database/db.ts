import { Book, User } from "./dbTypes";

export let users : User[] = [
    {
        id : 1,
        username : 'mylogin',
        password : 'mypassword',
        firstname : 'John',
        lastname : 'Doe',
        email : 'j.doe@gmail.com'
    }
]

export const products : {
    books : Book[]} = {
    books : [
        {
            id : 1,
            name : 'Alice and the Seven Dwarfes',
            description : 'When Alice falls into the other side of the mirror, the Wonderland is being taken by a powerful witch Morgana Pendragon. The Seven Dwafres gather at the Round Table to find a mighty warrior capable of carrying the Excalibur. Will Alice lead the Dwarfes to vicory? Is her love for Gwain a dangerous? Does is even matter as it all may be only a drug induced hallucination?',
            author : 'Louis Christmas-Carol',
            pages : 707,
            price : 101.95,
            image : null
        },
        {
            id : 2,
            name : 'Blueberry Muffin Theory',
            description : 'Research conducted for Mars collonization program brought unexpected information on the nature of blueberries. This seemingly innocent squishy friut turns out to be planted by the ancient aliens with an unknow intention.\n\n"DO NOT EAT THE BLUEBERRIES!" - Elon Musk',
            author : 'Elon Musk',
            pages : 345,
            price : 38.99,
            image : null
        },
        {
            id : 3,
            name : 'This message was meant to find you',
            description : 'I\'ve been looking for you. Got something I\'m supposed to deliver - your hands only.',
            author : 'Courier',
            pages : 444,
            price : 44.44,
            image : null
        },
    ]
}