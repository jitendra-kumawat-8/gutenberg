import Genre from "../Components/Genre";
import fiction from "../Assets/Fiction.svg";
import drama from "../Assets/Drama.svg";
import humour from "../Assets/Humour.svg";
import politics from "../Assets/Politics.svg";
import philosophy from "../Assets/Philosophy.svg";
import history from "../Assets/History.svg";
import adventure from "../Assets/Adventure.svg";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import {QueryClient} from "react-query";

const queryClient = new QueryClient();

export default function Home() {
  const navigate = useNavigate(); 
  const handleClick = (genre) => { // callback function for genre cards
    navigate("/library", {state:{genre}});
  };

  return (
    <div className="home">
      <section className="top-section">
        <div className="headings">
          <p className="heading-1">Gutenberg Project</p>
          <p className="heading-2">
            A social cataloging website that allows you to freely search its
            database of books, annotations, and reviews.
          </p>
        </div>
      </section>
      <section className="bottom-section">
        <div className="grid">
          <div className="item">
            <Genre
              icon={fiction}
              genre="FICTION"
              handleClick={handleClick}
            ></Genre>
          </div>
          <div className="item">
            <Genre
              icon={philosophy}
              genre="PHILOSOPHY"
              handleClick={handleClick}
            ></Genre>
          </div>
          <div className="item">
            <Genre icon={drama} genre="DRAMA" handleClick={handleClick}></Genre>
          </div>
          <div className="item">
            <Genre
              icon={history}
              genre="HISTORY"
              handleClick={handleClick}
            ></Genre>
          </div>
          <div className="item">
            <Genre
              icon={humour}
              genre="HUMOUR"
              handleClick={handleClick}
            ></Genre>
          </div>
          <div className="item">
            <Genre
              icon={adventure}
              genre="ADVENTURE"
              handleClick={handleClick}
            ></Genre>
          </div>
          <div className="item">
            <Genre
              icon={politics}
              genre="POLITICS"
              handleClick={handleClick}
            ></Genre>
          </div>
        </div>
      </section>
    </div>
  );
}
