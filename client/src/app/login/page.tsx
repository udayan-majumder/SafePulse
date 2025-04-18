"use client";

import { Button, Box, Stack, Flex, Image,Text,Input,Link,InputGroup } from "@chakra-ui/react";
import {PasswordInput,PasswordStrengthMeter} from "@/components/ui/password-input"
import axios from "axios";
import { UserLogged } from "@/userStore/user/userLoggIn";
import {Mail,KeyRound} from "lucide-react"
import { useState } from "react";
import toast,{Toaster} from 'react-hot-toast'
export default function LoginPage() {
  const [UserEmail,setEmail] = useState<string|null>(null)
  const [UserPassword, setPassword] = useState<string | null>(null);

  const Islogged = UserLogged((state) => state.isLoggedIn);
  const SetLogged = UserLogged((state) => state.setLoggedIn);

  async function triggerlogin() {
    const dataresponse = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL!}/user/login`,
      { 
        Email: UserEmail,
        Password: UserPassword,
      },
      {
        withCredentials: true,
      }
    );
  
    if (dataresponse.data.message === "UserLoggedIn") {
      toast.success("Logged in Successfull");
      setTimeout(() => {
        SetLogged(true);
      }, 500);

    } 
   else if (dataresponse.data.message === "Wrong Username or Password") {
        toast.error("Wrong username or password");
  
   } 

    
  }

  return (
    <Box height={["100%"]} width={["100%"]}>
      <Toaster/>
      <Stack
        direction={["column","row"]}
        bgColor={["#F8B4E3", "#fff"]}
        height={["100%"]}
        width={["100%"]}
        gap={0}
      >
        <Flex
          height={["40%", "100%"]}
          width={["100%", "40%"]}
          direction={["column"]}
          justify={["center"]}
          align={["center"]}
          zIndex={[0]}
        >
          <Flex
            direction={["row", "column"]}
            justify={["center"]}
            align={["center"]}
            height={["100%", "95%"]}
            width={["100%", "95%"]}
            bgColor={["#F8B4E3"]}
            borderRadius={["0px", "10px"]}
          >
            <Flex direction="column" justify={["center"]} align={["center"]} gap={1}>
              <Image
                src="/logo-desktop.png"
                width={["auto"]}
                alt="err"
                height={["220px", "300px", "400px", "450px"]}
              />
              <Text fontFamily={["Rubik"]} fontSize={["30px","40px"]} letterSpacing={1} fontWeight={700} color={"#fff"}>SafePulse</Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex
          height={["60%", "100%"]}
          width={["100%", "60%"]}
          justify={["center"]}
          align={["center"]}
          borderTopRadius={"80px"}
          boxShadow={["0px 0px 0px 1px rgba(0, 0, 0, 0.1)", "none"]}
          bgColor={["#fff"]}
        >
          <Flex
            // bgColor={["pink"]}
            height={["80%", "60%"]}
            width={["90%", "80%"]}
            direction={["column"]}
            justify={["center"]}
            align={["center"]}
            gap={5}
            fontFamily={["Poppins"]}
          >
            <Flex
              direction={["column"]}
              gap={1}
              justify={["center"]}
              align={["center"]}
              color={"#000"}
            >
              <Text fontSize={["30px", "40px", "50px"]} fontWeight={600}>
                Welcome Back!
              </Text>
              <Link href="/register">
                <Text
                  fontSize={["10px", "14px"]}
                  color={"gray.600"}
                  _hover={{ color: "gray.700", borderBottom: "1px solid #000" }}
                  fontStyle={["italic"]}
                  fontWeight={500}
                  borderBottom="1px solid #EDEDED"
                >
                  Don't have account? signup!
                </Text>
              </Link>
            </Flex>
            <Flex
              direction={["column"]}
              gap={[2,4]}
              justify={["center"]}
              align={["center"]}
              color={"gray.500"}
              width={["80%", "60%"]}
            >
              <InputGroup startElement={<Mail />} letterSpacing={0.5}>
                <Input
                  placeholder="Enter Email"
                  color={"#000"}
                  boxShadow={"2px 2px 2px 2px rgba(0,0,0,0.1)"}
                  border={["1px solid #BCCCDC"]}
                  onChange={(e) => {
                    setEmail(e.currentTarget.value);
                  }}
                ></Input>
              </InputGroup>
              <InputGroup startElement={<KeyRound />} letterSpacing={0.5}>
                <PasswordInput
                  boxShadow={"2px 2px 2px 2px rgba(0,0,0,0.1)"}
                  placeholder="Enter your Password"
                  color={"#000"}
                  border={["1px solid #BCCCDC"]}
                  onChange={(e) => {
                    setPassword(e.currentTarget.value);
                    console.log(e.currentTarget.value)
                  }}
                />
              </InputGroup>
            </Flex>
            <Text
              width={"100%"}
              textAlign={["center"]}
              color={"gray.700"}
              fontStyle={["italic"]}
              fontSize={["12px", "14px"]}
            >
              Forget Password?
            </Text>
            <Flex
              direction={["column"]}
              gap={[1,3]}
              justify={["center"]}
              align={["center"]}
            >
              <Button
                bgColor={"gray.900"}
                _hover={{ bgColor: "gray.700" }}
                color={"#fff"}
                width={["100px", "150px"]}
                fontSize={["14px", "16px"]}
                boxShadow={["3px 3px 2px 2px rgba(0, 0, 0, 0.1)"]}
                onClick={() => {
                  triggerlogin();
                }}
              >
                Login
              </Button>
              <Button
                bgColor={"red.600"}
                _hover={{ bgColor: "red.500" }}
                color={"#fff"}
                width={["100px", "150px"]}
                fontSize={["14px", "16px"]}
                boxShadow={["3px 3px 2px 2px rgba(0, 0, 0, 0.1)"]}
              >
                SOS
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Stack>
    </Box>
  );
}
