import "./Quote.css";

const Quote = (p: { text: string }) => {
  const pieces = p.text.split("'");
  const lastPiece = pieces.pop();
  const text = (
    <>
      {pieces.map((piece, index) => (
        <span key={index}>
          {piece}
          <>&rsquo;</>
        </span>
      ))}
      <span>{lastPiece}</span>
    </>
  );

  return (
    <div className="Quote">
      <figure>
        <blockquote>
          <p className="text">{text}.</p>
        </blockquote>
        <figcaption>—Anonymous</figcaption>
      </figure>
    </div>
  );
};

export default Quote;
