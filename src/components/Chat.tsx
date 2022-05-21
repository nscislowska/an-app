import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";
import { ChatMessage, User } from "../utils/dbTypes";
import { db } from "../utils/firebase";
import { Form, FormField } from "./form";
import Input from "./Input";
import { stringValidation } from "./validation";

const addZeroToNumber = (number: number | string) : string => {
    if (typeof number === 'string') {
        number = number.includes('.') ? parseFloat(number) : parseInt(number);
    }
    return number < 10 ? "0" + number.toString() : number.toString();
}

const formatDate = (date: Date) => {
    let day = `${addZeroToNumber(date.getDay())}.${addZeroToNumber(date.getMonth())}.${date.getFullYear().toString().slice(-2)}`;
    let time = `${addZeroToNumber(date.getHours())}:${addZeroToNumber(date.getMinutes())}`
    return `${day} ${time}`
}

const Chat = () => {
    let messages = useSelector((state : RootState) => state.chatReducer.messages as ChatMessage[]);
    const isLoggedIn = useSelector((state : RootState) => state.sessionReducer.isLoggedIn);
    const user = useSelector((state : RootState) => state.sessionReducer.user as User);

    const initFields : FormField[] = [
        {
            name:'input',
            type:'text',
            value: '',
            label: '' ,
            validation: {func: stringValidation, params:{min: 1}}
        }
    ];
    const [fields, setFields] = useState(initFields);

    useEffect(() => {
        for (let elem of document.getElementsByClassName('js-scroll-to-bottom')){
            elem.scrollTop = elem.scrollHeight;
        }
    }, [messages]);

    const scrollToBottom = (event: React.UIEvent<HTMLDivElement>) => {
        let elem = event.currentTarget;
        let scrollMargin = 20;
        let maxScrollTop = elem.scrollHeight - elem.clientHeight - scrollMargin;
        if(elem.scrollTop){
            if (elem.scrollTop >= maxScrollTop){
                elem.classList.add('js-scroll-to-bottom');
            } 
            else {
                elem.classList.remove('js-scroll-to-bottom');
            }
        }
    }

    const nickname = isLoggedIn ? `${user.firstname} ${user.lastname}` : user.username;
    // let audio = new Audio();
    // let source = document.createElement('source');
    // source.type= 'audio/wav';
    // source.src = "../sounds/bell-counter.wav";
    // audio.append(source);

    const passDataFromFieldToForm = Form.passDataFromFieldToForm(setFields);

    const send = (event : React.FormEvent<HTMLFormElement>) => {
        Form.submitHandler(event, fields, setFields, (fields) => {
            const message : ChatMessage = {
                author : nickname,
                content: fields[0].value,
                timestamp: Date.now()
            }
            db.chat.add(message).then(() => {
                // audio.play();
            });
        });
    }

    

    return(
        <div className="chat col-sm-12 col-md-8 col-lg-7">
            <h4 className="chat__header">Chat as {nickname}</h4>
            <div className="chat__messages js-scroll-to-bottom" onScroll={scrollToBottom}>
                {messages.map((message) => {
                    const  {author, timestamp, content} = message;
                    return <div key={timestamp} className={"chat-message" + (author === nickname ? ' me' : '')}>
                                <ul>
                                    <li className={'chat-message__author'}>
                                        {author}:
                                    </li>
                                    <li className="chat-message__date">
                                        {formatDate(new Date(timestamp))}
                                    </li>
                                </ul>
                                <p className="chat-message__content"> {content}</p>
                            </div>
                })}
            </div>
            <form className="" onSubmit={send}>
                <Input className=""
                name = {fields[0].name}
                type = {fields[0].type}
                value = {fields[0].value}
                label = {fields[0].label} 
                passData = {passDataFromFieldToForm}
                error = {fields[0].error}
                validation = {fields[0].validation} />
                <button type='submit' className="button button--primary chat__send-button">Send</button>
            </form>
        </div>
    );
}

export default Chat;