import "./PreviousRulings.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../common/card/Card";
import Select, { components } from "react-select";

const PreviousRulings = () => {
  const [list, setList] = useState(null);
  const [sort, setSort] = useState("list");
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
    window.addEventListener("storage", (e) => {
      console.log(e);
    });
  }, []);
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
    console.log(option);
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
      <Select
        options={options}
        className="select"
        classNamePrefix="react-select"
        defaultValue={options[0]}
        components={{ Placeholder, DropdownIndicator }}
        onChange={(e) => setSort(e.value)}
      />
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
    </div>
  );
};

export default PreviousRulings;
