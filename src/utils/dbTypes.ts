interface ChatMessage {
    author: string,
    content: string,
    timestamp: number
}

interface User{
    username : string
    password : string,
    firstname : string,
    lastname : string,
    email: string
}

interface Product {
    id : number,
    name : string,
    description : string,
    price : number,
    image : string | null
}

interface Book extends Product {
    pages : number,
    author : string
}

export type {
    ChatMessage,
    User, 
    Product,
    Book
};

