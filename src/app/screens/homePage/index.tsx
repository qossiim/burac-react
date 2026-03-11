import React, { useEffect } from "react";
import ActiveUsers from "./ActiveUsers";
import Advertisement from "./Advertisement";
import Events from "../homePage/Events";
import NewDishes from "./NewDishes";
import PopularDishes from "./PopularDishes";
import Statistics from "./Statistics";
import "../../../css/home.css";


export default function HomePage() {
  // selector: store => Data 

  useEffect(() => {
    // Bacend server data request => Data
    // Slece: Date => Store
  }, []);

  
  return (
  <div className={"homepage"}>
    <Statistics/>
    <PopularDishes/>
    <NewDishes/>
    <Advertisement/>
    <ActiveUsers/>
    <Events/>
 
  </div>
  );
}