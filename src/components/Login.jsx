import { useState, useEffect} from "react";
import {
    Form,
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Button,
    Box,
    Heading,
    Text,
    Image
  } from '@chakra-ui/react'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Components.css";

const Login = () => {
    const [passwrd, setPasswrd] = useState('')
    const [usrname, setUsrname] = useState('')
    const [isError, setIsError] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {
        if (passwrd.length > 0 && usrname.length > 0) {
            setIsError(false)
        } else {
            setIsError(true)
        }
    }, [passwrd, usrname])

    const onSubmit = () => {
        if (isError === false) {
            navigate('/chatbox')
            localStorage.setItem('username', usrname)
            localStorage.setItem('password', passwrd)
        }
        else{
            alert("Please enter a valid username, password, and email")
        }
    }

    return (
        <div className={"LoginBackground"}>
            <Image height={"300px"} marginBottom={"-100px"} src="https://cdn.discordapp.com/attachments/1085319038189711470/1086838874749292564/Screenshot_2023-03-18_at_10.09.39_PM-removebg-preview.png" />
            <Heading fontSize={"54px"} color={"white"} textAlign='center' pt="20px">
                Hi, I'm PsychAI!
            </Heading>

            <Text fontSize={"35px"} color={"white"} marginBottom={"40px"} textAlign='center'>
                Rant to me! I'm here for you. 
            </Text>
            
            <Box className="LoginContents">
                <FormControl isRequired id={"LoginItems"}>
                    <FormLabel fontWeight={"medium"}   >Username</FormLabel>
                    <Input placeholder='Username' type='username' value={usrname} onChange={(e)=>{setUsrname(e.target.value)}}/> 


                </FormControl>

                <FormControl isRequired id={"LoginItems"}>
                    <FormLabel fontWeight={"medium"} >Password</FormLabel>
                    <Input placeholder="Password" type='password' value={passwrd} onChange={(e)=>{setPasswrd(e.target.value)}} />

                </FormControl>

                <Button
                    mt={4}
                    colorScheme='teal'
                    type='submit' 
                    onClick={()=> onSubmit()}
                    >
                        Submit
                </Button>
            </Box>
            <Text color={"white"} display="flex" justifyContent={"center"} mt='20px'>
                Talk about your problems and issues to this AI CHATBOT! 
            </Text>
        </div>
        );
    };

export default Login;
