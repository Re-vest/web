import React from 'react'
import Select from 'react-select'
const PickList = ({options, onChange, value}) => {
  return (
  <Select value={{ label: value, value: value }} placeholder="Selecionar" options={options} onChange={e => onChange(e.label)} styles={{
    width: "100%",
  }}/>
)}
export default PickList;