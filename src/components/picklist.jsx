import React from 'react'
import Select from 'react-select'

const options = []


const PickList = ({options, onChange}) => (
  <Select placeholder="Selecionar" options={options} onChange={e => onChange(e.value)}/>
)

export default PickList;