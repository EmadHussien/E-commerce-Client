import React from "react";
import Navbar from "../components/Navbar";
import Announce from "../components/Announce";
import Slider from "../components/Slider";
import Categories from "../components/Categories";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  });
  return (
    <div>
      <Slider />
      <Categories />
      <Products />
      <Newsletter />
    </div>
  );
}
