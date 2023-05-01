import "./TextBox.css";
import search from "../Assets/Search.svg";
import cancel from "../Assets/Cancel.svg";
import { useRef} from 'react';
export default function TextBox(props) {
    const inputRef = useRef(null); //initializing a new ref
    const handleSearch = props.handleSearch; // callback function from props
    const handleClear = () => { //handles clear buttons function
        inputRef.current.value="";
    }
  return (
    <div className="text-box-div">
      <img src = {search} onClick={(e)=>{handleSearch(e, inputRef.current.value);handleClear()}}></img>
      <input className="text-box" name="book" type="search" id="textBox" ref={inputRef} placeholder="Search" ></input>
      <img id="cancel-button" src = {cancel} onClick={handleClear}></img>
    </div>
  );
}
