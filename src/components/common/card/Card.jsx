import "./Card.scss";
import React, { useEffect, useRef, useState } from "react";

const Card = ({ person, sort, changeVotes }) => {
  const [currentVote, setCurrentVote] = useState(null);
  const [picture, setPicture] = useState(null);
  const [positivePorcent, setPositivePorcent] = useState(null);
  const [negativePorcent, setNegativePorcent] = useState(null);
  const [optionSelect, setOptionSelect] = useState(null);
  const positive = useRef(null);
  const negative = useRef(null);

  useEffect(() => {
    const positiveVotes = person.votes.positive;
    const negativeVotes = person.votes.negative;
    const total = positiveVotes + negativeVotes;
    const posPorcent = ((positiveVotes * 100) / total).toFixed(1) + "%";
    const negPorcent = ((negativeVotes * 100) / total).toFixed(1) + "%";
    positive.current.style.width = posPorcent;
    negative.current.style.width = negPorcent;
    setNegativePorcent(negPorcent);
    setPositivePorcent(posPorcent);
  }, [person]);
  useEffect(() => {
    let picture = person.picture;
    if (sort === "grid") {
      picture = picture.split(".");
      picture = picture[0] + "G." + picture[1];
    }
    setPicture(picture);
  }, [sort, person.picture]);
  const difDate = (last) => {
    const difdt = new Date(new Date() - new Date(last));
    let date = "";
    date =
      difdt.toISOString().slice(0, 4) - 1970 === 0
        ? ""
        : difdt.toISOString().slice(0, 4) - 1970 + " year ago";
    if (!date) {
      date = date === "" ? difdt.getMonth() + 1 + " months ago" : "";
    }
    if (!date) {
      date = date === "" ? difdt.getDate() + " days ago" : "";
    }
    return date;
  };
  const hand = (background, position) => {
    return (
      <div
        className={
          "hand" +
          (background ? " background" : "") +
          (position === "up" ? " up" : " down")
        }
      >
        <img
          src={"http://localhost:3000/assets/img/thumbs-up.svg"}
          alt="hand"
        ></img>
      </div>
    );
  };
  return (
    <div className={"card " + sort}>
      {hand(
        true,
        person.votes.positive > person.votes.negative ? "up" : "down"
      )}
      <div className="picture">
        <img alt="picturePerson" src={`/assets/img/people/${picture}`}></img>
      </div>
      <div className="description">
        <div className="contentName">
          <h2 className="name">{person.name}</h2>
          <h4 className="info">{person.description}</h4>
        </div>
        <div className={"votes " + (currentVote ? "vote" : "noVote")}>
          <div className="lastUpdated">
            <h5>
              {currentVote
                ? "Thank you for your vote!"
                : difDate(person.lastUpdated) + " in " + person.category}
            </h5>
          </div>
          <div className="buttons">
            <div
              className={optionSelect === "positive" ? " selected" : ""}
              onClick={() => {
                setOptionSelect("positive");
              }}
            >
              {hand(true, "up")}
            </div>
            <div
              className={optionSelect === "negative" ? " selected" : ""}
              onClick={() => {
                setOptionSelect("negative");
              }}
            >
              {hand(true, "down")}
            </div>
            <button
              disabled={!optionSelect && !currentVote}
              onClick={() => {
                if (currentVote) {
                  setCurrentVote(false);
                } else {
                  changeVotes(optionSelect, person);
                  setCurrentVote(true);
                  setOptionSelect(null);
                }
              }}
            >
              {currentVote ? "Vote Again" : "Vote Now"}
            </button>
          </div>
        </div>
      </div>
      <div className="statistics">
        <div ref={positive} className="statistic positive">
          {hand(false, "up")}
          <h3>{positivePorcent}</h3>
        </div>
        <div ref={negative} className="statistic negative">
          <h3>{negativePorcent}</h3>
          {hand(false, "down")}
        </div>
      </div>
    </div>
  );
};

export default Card;
