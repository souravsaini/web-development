import React from "react";

import { API } from "../backend";
import Base from "./Base";

function Home() {
  return (
    <div>
      <Base title="Home Page" description="Welcome to XMan Shopping">
        <h1> Hello Front End. {API} is backend.</h1>
      </Base>
    </div>
  )
}

export default Home;
