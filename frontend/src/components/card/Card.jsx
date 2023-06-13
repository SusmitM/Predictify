import "./card.css"
/* eslint-disable react/prop-types */
export default function Card({ data }) {
  const { predictedText, image } = data;

  return (
    <div className="cardContainer">
      <div className="imgContainer">
        <img src={image} />
      </div>
      <div className="textContainer">
        <textarea rows="4">{predictedText}</textarea>
      </div>
    </div>
  );
}
