"use client";

import React from 'react';
import { BubbleChat } from 'flowise-embed-react'
import '../styles/Chatbot.css'

function Chatbot() {
    return (
        <div className="chatbot-wrapper">
            <BubbleChat
                chatflowid="DE PUS FLOW ID-UL VOSTRU"
                apiHost="http://localhost:3200"
                theme=
                {
                    {
                        button:
                        {
                            backgroundColor: '#6b4eff',
                        },
                        chatWindow: {
                            userMessage:
                            {
                                backgroundColor: "#6b4eff"
                            },
                            textInput:
                            {
                                sendButtonColor: '#6b4eff'
                            }
                        }
                    }
                }
            />
            <div className="chatbot-hover-zone">
                <span className="chatbot-tooltip-text">At the moment, I’m only able to help with the document that have the chatbot tag.</span>
            </div>
            
        </div>
    );
}

export default Chatbot