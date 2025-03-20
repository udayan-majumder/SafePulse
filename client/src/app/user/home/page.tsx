'use client'

import { Link,Button,Box } from "@chakra-ui/react"



export default function HomePage(){



    return (
      <Box>
        <Link href="/user/map">
          <Button bgColor={["#F8B4E3"]} color={["#fff"]}>Go to Maps</Button>
        </Link>
      </Box>
    );
}