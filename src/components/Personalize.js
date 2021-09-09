import { useContext, useState } from "react";
import { UserInputContext } from "../contexts";

const Personalize = () => {
  const { title, updateTitle, budget, updateBudget, isOffgrid, updateIsOffgrid } = useContext(UserInputContext);
  // let tripLength = "A couple of nights";
  const [tripLength, setTripLength] = useState("A couple of nights");

  function sliderTripValue(value) {
    switch (value) {
      case "1":
        setTripLength("A couple of nights");
        break
      case "2":
        setTripLength("Less than 1 week");
        break
      case "3":
        setTripLength("1 to 2 weeks");
        break;
      case "4":
        setTripLength("3 to 6 weeks");
        break;
      case "5":
        setTripLength("Months long expeditions");
        break;
      default:
        setTripLength("default");
        break;

    }
  }

  return (
    <div className="personalize cardlike">
      <h1>Hello,</h1>
      <h1>{title}</h1>
      <h4>Project Name</h4>
      <input type="text" style={{ zIndex: 1 }} onChange={(e) => updateTitle(e.target.value)} />
      <h4>Current Budget ${budget}</h4>
      <input type="text" onChange={(e) => updateBudget(e.target.value)} />
      <h4>Primarily Offgrid?</h4>
      <label>
        <input type="radio" checked={isOffgrid === "yes"} value="yes" onChange={(e) => updateIsOffgrid(e.target.value)} />
        Yes
      </label>
      <label>
        <input type="radio" checked={isOffgrid === "no"} value="no" onChange={(e) => updateIsOffgrid(e.target.value)} />
        No
      </label>
      <h4>Typical Trip Length?</h4>
      <div>
        <input type="range" min="1" max="5" defaultValue="1" onChange={(e) => sliderTripValue(e.target.value)} className="trip-slider" />
        <p>{tripLength}</p>
      </div>
      <p>terrain, full build?, </p>
    </div>
  )
}

export default Personalize;
