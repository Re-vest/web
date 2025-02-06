import React from "react";
import Select from "react-select";
import MakeAnimation from "react-select/animated";

const makeAnimation = MakeAnimation();

const Filter = ({ options, handleFilterChange }) => (
  <div style={{maxWidth: "570px", width:"100%", fontSize: "13px" }}>
    <Select
      options={options}
      onChange={(e) => handleFilterChange(e)}
      isMulti
      components={makeAnimation}
      placeholder="Selecionar"
    />
  </div>
);

export default Filter;
