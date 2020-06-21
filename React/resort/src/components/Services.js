import React from "react";
import Title from "./Title";

import {FaCocktail, FaHiking, FaShuttleVan, FaBeer } from "react-icons/fa";

class Services extends React.Component {

  state = {
    services: [
      {
        icon: <FaCocktail />,
        title: "free cocktails",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt"
      },
      {
        icon: <FaHiking />,
        title: "Endless hiking",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt"
      },
      {
        icon: <FaShuttleVan />,
        title: "free Shuttle",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt"
      },
      {
        icon: <FaBeer/>,
        title: "Strongest Beer",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt"
      }
    ]
  }

  render() {
    return (
      <section className="services">
        <Title title="Services" />
        <div className="services-center">
          {this.state.services.map( (service, index) => {
            return (
              <article key={index} className="service">
                <span>{service.icon}</span>
                <h6>{service.title}</h6>
                <p>{service.info}</p>
              </article>
            )
          })}
        </div>
      </section>
    )
  }
}

export default Services;
