import React from 'react'
import Select from 'react-select'

const PickList = ({options, onChange, value}) => {
  console.log(value)
  return (
  
  <Select  placeholder="Selecionar" options={options} onChange={e => onChange(e.value)}/>
)}

export default PickList;