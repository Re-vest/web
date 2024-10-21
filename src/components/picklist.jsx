import React from 'react'
import Select from 'react-select'

const options = []


const PickList = ({options}) => (
  <Select placeholder="Selecionar" options={options} />
)

export default PickList;