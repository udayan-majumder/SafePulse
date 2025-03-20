"use client";

import { Geist, Geist_Mono,Poppins,Tektur,Rubik,Roboto,Open_Sans } from "next/font/google";
import "./globals.css";
import { Provider } from "@/components/ui/provider";
import { UserLogged } from "@/userStore/user/userLoggIn";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"], // Specify the font weights you need
  subsets: ["latin"], // Specify the subset(s) you need
  variable: "--font-poppins", // Define a CSS variable for the font
});
const tektur = Tektur({
  weight: ["400", "500", "600", "700"], // Specify the font weights you need
  subsets: ["latin"], // Specify the subset(s) you need
  variable: "--font-tektur", // Define a CSS variable for the font
});
const opensans = Open_Sans({
  weight: ["400", "500", "600", "700"], // Specify the font weights you need
  subsets: ["latin"], // Specify the subset(s) you need
  variable: "--font-Open_Sans", // Define a CSS variable for the font
});

const roboto = Roboto({
  weight: ["400", "500", "600", "700"], // Specify the font weights you need
  subsets: ["latin"], // Specify the subset(s) you need
  variable: "--font-Roboto", // Define a CSS variable for the font
});
const rubik = Rubik({
  weight: ["400", "500", "600", "700"], // Specify the font weights you need
  subsets: ["latin"], // Specify the subset(s) you need
  variable: "--font-Rubik", // Define a CSS variable for the font
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const path = usePathname();
  const Islogged = UserLogged((state) => state.isLoggedIn);
  const SetLogged = UserLogged((state) => state.setLoggedIn);
  const [isloading, setLoading] = useState(false);

  async function UserState() {
    try {
      const UserDetails = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_PORT!}/user/getlogindetails`,
        {
          withCredentials: true,
        }
      );

      if (UserDetails.data.message === "Authorized") {
        console.log("log");
        SetLogged(true);
      } else if (UserDetails.data.message === "NotAuthorized") {
        console.log("notlog");
        SetLogged(false);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setLoading(true);
    }
  }

  useEffect(() => {
    UserState();
    if (isloading) {
      if (Islogged) {
        if (!path.startsWith("/user")) {
          return router.push("/user/home");
        } 
      
        if(path.startsWith("/user")){
          return;
        }
        
      }
      if (!Islogged) {
        if (path.startsWith("/user")) {
          router.push("/login");
        }
         if (path.startsWith("/register")) {
           router.push("/register");
         }

      }
    }
  }, [Islogged,isloading,router]);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src="https://www.unpkg.com/olamaps-web-sdk@latest/dist/olamaps-web-sdk.umd.js"></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${opensans.variable} ${roboto.variable} ${rubik.variable}  ${tektur.variable} antialiased`}
        style={{ height: "99vh", width: "100%", backgroundColor: "#fff" }}
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
