import React from "react";
import RoomsFilter from "./RoomsFilter";
import RoomsList from "./RoomsList";
import {RoomConsumer} from "../context";
import Loading from "./Loading";

const RoomsContainer = () => {
  return (
    <RoomConsumer>
    {value => {
      //console.log(value);
      const {loading, sortedRooms, rooms} = value;
      if (loading === true) {
        return <Loading />
      }
      return (
        <>
          <RoomsFilter rooms={rooms}/>
          <RoomsList rooms={sortedRooms} />
        </>
      )
    }}
    </RoomConsumer>
  )
}

export default RoomsContainer;
