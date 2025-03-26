import React from "react";
import { ProductHeader1 } from "./components/ProductHeader1.jsx";
import { Layout16 } from "./components/Layout16.jsx";
import { Layout22 } from "./components/Layout22.jsx";
import { Layout6 } from "./components/Layout6.jsx";
import { Contact3 } from "./components/Contact3.jsx";
import { Footer9 } from "../../components/Footer/Footer9.jsx"; 
import Header from "../../components/Header/Header.jsx";
export default function ReservationScreen() {
  return (
    <div>
      {/* <Navbar3 /> */}
      <Header />
      <ProductHeader1 />
      <Layout16 />
      <Layout22 />
      <Layout6 />
      <Contact3 />
      <Footer9 />
    </div>
  );
}
