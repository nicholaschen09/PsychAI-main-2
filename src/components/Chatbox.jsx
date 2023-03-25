import { useState, useRef } from "react"
import { Input, Box, Avatar, Text, Flex } from '@chakra-ui/react'


const Chatbot = () => {

    const [input, setInput] = useState("");
    const [disabled, setDisabled] = useState(false);
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
    
    const [chatbotOutput, setChatbotOutput] = useState([{ user: "AI", message: `Hello ${localStorage.getItem("username")}, what's been on your mind? Tell me about your problems, I may be able to help you.` }]);

    async function handleSubmit(e) {
        e.preventDefault();
        if (input === "") return;

        let chatLogNew = [...chatbotOutput, { user: "User", message: `${input}`}];
        setChatbotOutput(chatLogNew);
        setDisabled(true);
        setInput("");

        const messages = chatLogNew.map((data) => `${data.user}: ${data.message}`).join("\n");
        const response = await fetch("http://localhost:8080", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: messages
            })
        });
        const data = await response.json();
        console.log(data.message)
        setChatbotOutput([...chatLogNew, { user: "AI", message: data.message }]);
        scrollToBottom()
        setDisabled(false);
    }

    return (
        <Flex flexDirection='column' height='100%'>
            <Box flexGrow='1' p='20px' bgImage='linear-gradient(135deg, #E0F2FF 0%, #FFF0F2 100%)' overflowY='auto'>
                <Flex flexDirection='column'>
                    {chatbotOutput.map((data, index) => 
                        <Flex m='20px 10px' key={index} className={"MessageLogs"} alignItems='center'>
                            <Avatar bgColor='#404E4D' color='white' name={data.user === 'User' ? localStorage.getItem("username") : 'chatgpt'} src={data.user === "User" ? '' : 
                            'https://play-lh.googleusercontent.com/E_4rn_ziIOE0pYO-Y57IGK_Fm_QrjvmJnOG0wp0_-WJHwW_PMnfil4_pq5QcLgTvX9Y=w300'} />
                            <Text ml='20px' flexGrow='1' fontSize='18px' fontFamily="'Nunito', sans-serif">{data.message}</Text>
                        </Flex>
                    )}
                    <Box mt='7%' ref={messagesEndRef} />
                </Flex>
            </Box>
            <Box bgColor='#e0e0e8' p='20px' opacity='0.7'>
                <form onSubmit={handleSubmit}>
                    <Input type="text" size='lg' value={input} bgColor='white' onChange={disabled ? () => {} : (e) => setInput(e.target.value)} placeholder="Enter a prompt"/>
                </form>
            </Box>
        </Flex>
    )
}

export default Chatbot;