import { useContext } from "react";
import { UserInputContext } from "../contexts";

const Personalize = () => {
  const { title, updateTitle, budget, updateBudget, isOffgrid, updateIsOffgrid } = useContext(UserInputContext);
  return (
    <div className="personalize cardlike">
      <h1>Hello,</h1>
      <h1>{title}</h1>
      <h4>Project Name</h4>
      <input type="text" style={{ zIndex: 1 }} onChange={(e) => updateTitle(e.target.value)} />
      <h4>Budget ${budget}</h4>
      <input type="text" onChange={(e) => updateBudget(e.target.value)} />
      <h4>Offgrid?</h4>
      <label>
        <input type="radio" checked={isOffgrid === "yes"} value="yes" onChange={(e) => updateIsOffgrid(e.target.value)} />
        Yes
      </label>
      <label>
        <input type="radio" checked={isOffgrid === "no"} value="no" onChange={(e) => updateIsOffgrid(e.target.value)} />
        No
      </label>
      <p>terrain, typical trip length, full build?, </p>
    </div>
  )
}

export default Personalize;
