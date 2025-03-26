import React from "react";
// import { Navbar3 } from "./components/Navbar3";
// import { Header26 } from "./components/Header26";
import { Layout3 } from "./components/Layout3.jsx";
import { Cta25 } from "./components/Cta25.jsx";
import { Footer9 } from "../../components/Footer/Footer9.jsx";
// import {Footer} from "./components/Footer";
import Header from "../../components/Header/Header.jsx";
export default function Home() {
  return (
    <div>
      {/* <Navbar3 /> */}
      <Header />
      <Layout3 />
      <Cta25 />
      <Footer9 />
    </div>
  );
}
