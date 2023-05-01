import "./Genre.css";
import next from "../Assets/Next.svg";
export default function Genre({icon, genre, handleClick}) { //props destructuring

  return (
    <div className="genre-card" onClick={()=>{handleClick(genre)}}>
      <div className="left">
        <img src={icon} alt="icon"></img>
        <p>{genre}</p>
      </div>
      <div className="right">
        {" "}
        <img id="next" src={next} alt="next sign"></img>
      </div>
    </div>
  );
}
