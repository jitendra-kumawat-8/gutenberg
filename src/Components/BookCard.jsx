import './BookCard.css';

export default function BookCard({cover, book, author}){
    const bookName = book.split(/[;:]/)[0]; //splitting book title based on semi colon and colon so the title can be shortened
    return(
        <div className="book-card">
            <img className="rectangle" src={cover} alt="Book"></img>
            <p className="book-text">{bookName}</p>
            <p className="book-text author">{author}</p>
        </div>
    );
}