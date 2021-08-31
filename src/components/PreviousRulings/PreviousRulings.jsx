import "./PreviousRulings.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../common/card/Card";
import CarouselComponent from "../common/carousel/CarouselComponent";
import Select, { components } from "react-select";
import useDimensions from "../../utils/hooks/window/useWindowDimensions";

const PreviousRulings = () => {
  const [list, setList] = useState(null);
  const [sort, setSort] = useState("list");
  const [dimension] = useDimensions();
  const options = [
    { value: "list", label: "List" },
    { value: "grid", label: "Grid" },
  ];
  useEffect(() => {
    if (!localStorage.getItem("people")) {
      axios.get("/assets/data.json").then((res) => {
        if (res.data && res.data.data && res.data.data.length > 0) {
          localStorage.setItem("people", JSON.stringify(res.data.data));
          setList(res.data.data);
        }
      });
    } else {
      setList(JSON.parse(localStorage.getItem("people")));
    }
  }, []);
  useEffect(() => {
    if (dimension.device === "mobile") {
      setSort("grid");
    }
    if (dimension.device !== "mobile") {
      setSort("list");
    }
  }, [dimension]);
  const CreateArrow = () => {
    return <span className="triangle"></span>;
  };
  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <CreateArrow />
      </components.DropdownIndicator>
    );
  };
  const Placeholder = (props) => {
    return <components.Placeholder {...props} />;
  };
  const changeVotes = (option, person) => {
    let list = JSON.parse(localStorage.getItem("people"));
    const voted = list.map((element) => {
      if (element.name === person.name) {
        if (option === "positive") {
          element.votes.positive = element.votes.positive + 1;
        } else {
          element.votes.negative = element.votes.negative + 1;
        }
      }
      return element;
    });
    localStorage.setItem("people", JSON.stringify(voted));
    setList(JSON.parse(localStorage.getItem("people")));
  };
  return (
    <div className={"previousRuling " + sort}>
      <h1>Previous Rulings</h1>
      {dimension.device !== "mobile" && (
        <Select
          options={options}
          className="select"
          classNamePrefix="react-select"
          defaultValue={options[0]}
          components={{ Placeholder, DropdownIndicator }}
          onChange={(e) => setSort(e.value)}
        />
      )}
      {dimension.device !== "mobile" && (
        <div className="cardsContainer">
          {list &&
            list.map((person, index) => (
              <Card
                key={"P" + index}
                person={person}
                sort={sort}
                changeVotes={changeVotes}
              ></Card>
            ))}
        </div>
      )}
      {dimension.device === "mobile" && (
        <CarouselComponent className="carrusel">
          {list &&
            list.map((person, index) => (
              <Card
                key={"P" + index}
                person={person}
                sort={sort}
                changeVotes={changeVotes}
              ></Card>
            ))}
        </CarouselComponent>
      )}
    </div>
  );
};

export default PreviousRulings;
