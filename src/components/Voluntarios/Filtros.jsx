import React from 'react'
import Select from 'react-select'

import MakeAnimation from 'react-select/animated'


const makeAnimation = MakeAnimation()

const Filtro = ({options, atualizandoFiltros}) => {

  return (
    <div style={{ zIndex: 999 }}>
      <Select
        options={options} //selecionar os filtros
        onChange={(e) => atualizandoFiltros(e)} //atualizar filtros qnd selecionar mais ou alterar
        isMulti
        components={makeAnimation}
        placeholder="Selecionar"
      />
    </div>
  );
};

export default Filtro;