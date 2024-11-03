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
        <th className="top-0 bg-gray-200 z-10 p-2.5 text-center">
          <div className="flex">
            Status
            <ArrowDownUp size={20} />
          </div>
        </th>
        <th className="top-0 bg-gray-200 z-10 p-2.5 text-center">
          <div className="flex">
            Permissão
            <ArrowDownUp size={20} />
          </div>
        </th>
        <th className="top-0 bg-gray-200 z-10 p-2.5 text-center">Ações</th>
      </tr>
    </thead>
  );
};