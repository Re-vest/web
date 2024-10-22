import React from "react";

import { ArrowDownUp } from "lucide-react";

export const HeaderTable = ({ selecionaTodos }) => {
  return (
    <thead>
      <tr>
        <th>
          <input type="checkbox" onChange={selecionaTodos} />
        </th>
        <th>ID</th>
        <th>Voluntário</th>
        <th>
          <div className="flex">
            Status
            <ArrowDownUp size={20} />
          </div>
        </th>
        <th>
          <div className="flex">
            Permissão
            <ArrowDownUp size={20} />
          </div>
        </th>
        <th>Ações</th>
      </tr>
    </thead>
  );
};