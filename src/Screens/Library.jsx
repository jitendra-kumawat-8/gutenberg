import "./Library.css";
import back from "../Assets/Back.svg";
import TextBox from "../Components/TextBox";
import BookCard from "../Components/BookCard";
import { useState, useEffect } from "react";
import { useInfiniteQuery, QueryClient } from "react-query";
import { useNavigate, useLocation } from "react-router";
const queryClient = new QueryClient();

export default function Library() {
  let fetching;
  const handleSearch = (e, book) => { // callback for search button
    const encodedQuery = encodeURIComponent(book); //encoding book name so it can be appended to the API
    queryClient.clear(); //clearing data cache
    setUrl( 
      `http://gutendex.com/books?mime_type=image%2F&topic=${genre}&search=${encodedQuery}`
    ); //setURL method to update API endpoint with new genre and search term, trigger refetch again.
  };

  const fetchInfiniteBooks = (pageNumber = 1) =>
    fetch(`${url}&page=${pageNumber}`).then((res) => res.json()); //calls fetch method with default page number 
  const navigate = useNavigate();
  const location = useLocation(); //used to handle page navigations

  const genre = location.state.genre; //storing data passed from previous page
  const [url, setUrl] = useState(
    `http://gutendex.com/books?mime_type=image%2F&topic=${genre}`
  ); // sets URL as soon as this screen is loaded 
  const {
    isLoading,
    isError,
    data,
    error,
    refetch,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    "books",
    ({ pageParam = 1 }) => fetchInfiniteBooks(pageParam),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.next !== null) {
          return pages.length + 1;
        } else {
          return undefined;
        }
      },  //getNextPageParam sets pageParam property for fetch method and uses the API property next to figure out whether the current page has a next page or not if it has it increases current param by 1
    }
  ); //useinfinitequery is used to handle infinite scrolling 
  //functionality of the website with a callback function fetchinifinitebooks defined above

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["books"] });
    refetch({ pageParam: 1 });
  }, [url]); //re renders components and refetches query when URL is changed, specifically by the search box

  useEffect(() => {
    refetch({ pageParam: 1 });
  }, [genre]); 

  useEffect(() => {
    fetching = false; //sets initial value of fetching to be false
    const onScroll = async (event) => {
      const { scrollHeight, scrollTop, clientHeight } =
        event.target.scrollingElement; // extracts the three properties from client screen

      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.5) { //a check to make sure no duplicate fetch requests are made
        fetching = true; //if the scrollbar reaches bottom it triggers the fetch method
        if (hasNextPage) await fetchNextPage(); //if there is a next page the fetch method is called asynchronously
        fetching = false; //sets fetching to be false once the method is called
      }
    };

    document.addEventListener("scroll", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="library">
      <section className="top-section-library">
        <div className="heading-box">
          <div className="library-heading">
            <img
              src={back}
              onClick={() => {
                navigate(-1);
              }}
            ></img>
            <p className="library-heading-genre">{genre}</p>
          </div>
          <TextBox handleSearch={handleSearch}></TextBox>
        </div>
      </section>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <section className="bottom-section-library">
          {isLoading ? <p>Loading new genre ...</p> : <></>}
          <div className="grid-library">
            {data.pages.map((page, index) =>
              page.results.map((item, index) => (
                <div
                  key={index}
                  className="item-library"
                  onClick={() => {
                    if (item.formats["text/html"]) {
                      window.open(item.formats["text/html"]);
                    } else if (item.formats["application/pdf"]) {
                      window.open(item.formats["application/pdf"]);
                    } else if (item.formats["text/plain"]) {
                      window.open(item.formats["text/plain"]);
                    } else {
                      alert("no viewable versions !");
                    }
                  }}
                >
                  <BookCard
                    key={index}
                    book={item.title}
                    author={item.authors[0]?.name || "no name"}
                    cover={item.formats["image/jpeg"]}
                  ></BookCard>
                </div>
              ))
            )}
          </div>
          {isFetching ? <p>fetching more books ... </p> : <></>}
        </section>
      )}
    </div>
  );
}
