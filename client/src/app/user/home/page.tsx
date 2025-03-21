'use client'

import { Link,Button,Box } from "@chakra-ui/react"
import {NavbarFooterComponent} from '@/components/navbar/navbarFooter'


export default function HomePage(){



    return (
      <Box>
        <NavbarFooterComponent/>
        <Link href="/user/map">
          <Button bgColor={["#F8B4E3"]} color={["#fff"]}>Go to Maps</Button>
        </Link>
      </Box>
    );
}