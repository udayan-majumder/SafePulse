

import {Flex,Box,Link} from "@chakra-ui/react"
import { House,MessageSquareText,MapPinned,Bot } from "lucide-react";
export const NavbarFooterComponent = ()=>{

   const NavItems = [House,MapPinned,MessageSquareText,Bot]

    return (
      <Flex
        height={["80px"]}
        width={["100%"]}
        justify={["center"]}
        align={["center"]}
        position={"fixed"}
        left={["0"]}
        top={["","0"]}
        bottom={["0",""]}

      >
        <Flex
          height={["80%"]}
          width={["100%","20%"]}
          bgColor={["#F8B4E3"]}
          justify={["space-around"]}
          align={["center"]}
          borderRadius={["10px"]}
          boxShadow={["3px 3px 2px 2px rgba(0, 0, 0, 0.1)"]}
        >
          {NavItems.map((Icon, index) => (
            <Link key={index} color={["#fff"]} _hover={{ color: "#F8B4E3",bgColor:"white",transition:"1s ease-in-out"}} transition="1s ease-in-out" height={["50px"]} width={["50px"]} display={["flex"]} justifyContent={["center"]} alignContent={["center"]} borderRadius={["10px"]}>
              <Icon size={30} />
            </Link>
          ))}
        </Flex>
      </Flex>
    );
}