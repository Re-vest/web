import React from "react";

import { ArrowDownUp } from "lucide-react";

export const HeaderTable = ({ selecionaTodos }) => {
  return (
    <thead >
      {/* className="fixed mg-5" */}
      <tr>
      {/* <th>
          <input type="checkbox" onChange={selecionaTodos} />
        </th> */}
        <th className="top-0 bg-gray-200 z-10 p-2.5 text-center text-sm">ID</th>
        <th className="top-0 bg-gray-200 z-10 p-2.5 text-center text-sm">Voluntário</th>
        <th className="top-0 bg-gray-200 z-10 p-2.5 text-center text-sm">
          <div className="flex">
            Status
            <ArrowDownUp size={18} />
          </div>
        </th>
        <th className="top-0 bg-gray-200 z-10 p-2.5 text-center text-sm">
          <div className="flex">
            Permissão
            <ArrowDownUp size={18} />
          </div>
        </th>
        <th className="top-0 bg-gray-200 z-10 p-2.5 text-center text-sm">Ações</th>
      </tr>
    </thead>
  );
};