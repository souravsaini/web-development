import React from "react";
import Room from "./Room";

const RoomsList = ({rooms}) => {
  if (rooms.length === 0) {
    return (
      <div className="empty-search">
        <h3> unfortunately no rooms your search parameters </h3>
      </div>
    )
  }

  return (
    <section className="rooms-list">
      <div className="roomslist-center">
        {rooms.map( room => {
          return (
            <Room key={room.id} room={room} />
          )
        })}
      </div>
    </section>
  )
}

export default RoomsList;
