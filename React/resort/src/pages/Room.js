import React from "react";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import RoomsContainer from "../components/RoomsContainer";
import { Link } from "react-router-dom";

const Room = () => {
  return (
    <>
      <Hero hero="roomsHero">
        <Banner title="our rooms">
          <Link to="/" className="btn-primary">Return Home </Link>
        </Banner>
      </Hero>
      <RoomsContainer />
    </>
  )
}

export default Room;
