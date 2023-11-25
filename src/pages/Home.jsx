import React from "react";
import Navbar from "../components/Navbar";
import Announce from "../components/Announce";
import Slider from "../components/Slider";
import Categories from "../components/Categories";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

export default function Home() {
  /*   const { userRequests } = useUserRequests();
  const userID = useSelector((state) => state.user.currentUser._id);

  async function getSingleUSer() {
    const res = await userRequests.get(`/users/${userID}`);
    console.log(res);
  }
  getSingleUSer(); */
  return (
    <div>
      <Navbar />
      <Announce />
      <Slider />
      <Categories />
      <Products />
      <Newsletter />
      <Footer />
    </div>
  );
}
