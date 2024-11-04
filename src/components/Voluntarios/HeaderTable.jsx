import React from "react";

import { ArrowDownUp } from "lucide-react";

export const HeaderTable = ({ selecionaTodos }) => {
  return (
    <thead>
      <tr>
      {/* <th>
          <input type="checkbox" onChange={selecionaTodos} />
        </th> */}
        <th className="top-0 bg-gray-200 z-10 p-2.5 text-center">ID</th>
        <th className="top-0 bg-gray-200 z-10 p-2.5 text-center">Voluntário</th>
        {/* <th className="top-0 bg-gray-200 z-10 p-2.5 text-center">
            Status
            <ArrowDownUp size={20} />
        </th> */}
        <th className="top-0 bg-gray-200 z-10 p-2.5 text-center">
            Permissão
            {/* <ArrowDownUp size={20} /> */}
        </th>
        <th className="top-0 bg-gray-200 z-10 p-2.5 text-center">Ações</th>
      </tr>
    </thead>
  );
};