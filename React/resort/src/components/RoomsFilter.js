import React, {useContext} from "react";
import {RoomContext} from "../context";
import Title from "./Title";

const RoomsFilter = ({rooms}) => {
  const context = useContext(RoomContext);  //getting context using hooks
  const {handleChange, type, capacity, price, minPrice, maxPrice, minSize, maxSize, breakfast, pets} = context;

  //get all unique values
  const getUnique = (items, value) => {
    return [...new Set(items.map(item => item[value]))]
  }

  let types = getUnique(rooms, "type");
  types = ['all', ...types];

  let people = getUnique(rooms, "capacity");


  return (
    <section className="filter-container">
      <Title title="search rooms" />
      <form className="filter-form">
        {/* Search type */}
        <div className="form-group">
          <label htmlFor="type">room type </label>
          <select name="type" id="type" value={type} className="form-control" onChange={handleChange}>
            {types.map( (type, index) => {
              return <option value={type} key={index}> {type} </option>
            })}
          </select>
        </div>
        {/* Guests */}
        <div className="form-group">
          <label htmlFor="capacity">guests </label>
          <select name="capacity" id="capacity" value={capacity} className="form-control" onChange={handleChange}>
            {people.map( (item, index) => {
              return <option value={item} key={index}> {item} </option>
            })}
          </select>
        </div>
        {/* room price */}
        <div className="form-group">
          <label htmlFor="price">room price ${price}</label>
          <input type="range" name="price" min={minPrice} max={maxPrice} id="price" value={price} onChange={handleChange}
            className="form-control" />
        </div>
        {/* room size */}
        <div className="form-group">
          <label htmlFor="size">room size</label>
          <div className="size-inputs">
            <input type="number" name="minSize" id="size" value={minSize} onChange={handleChange}
              className="size-input"/>
            <input type="number" name="maxSize" id="size" value={maxSize} onChange={handleChange}
              className="size-input"/>
          </div>
        </div>
        <div className="form-group">
          <div className="single-extra">
            <input type="checkbox" name="breakfast" id="breakfast" checked={breakfast} onChange={handleChange} />
            <label htmlFor="breakfast">breakfast</label>
          </div>
          <div className="single-extra">
            <input type="checkbox" name="pets" id="pets" checked={pets} onChange={handleChange} />
            <label htmlFor="pets">pets</label>
          </div>
        </div>
      </form>
    </section>
  )
}

export default RoomsFilter;
