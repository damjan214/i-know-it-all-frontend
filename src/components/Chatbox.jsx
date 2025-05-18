"use client";

import React from 'react';
import { BubbleChat } from 'flowise-embed-react'

function Chatbot() {
return (
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
    );
}

export default Chatbot