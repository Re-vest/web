import React, { useState } from "react";

import "../../styles/voluntarios.css";

export const CadastroVoluntario = () => {
    return (
      <>
    <form>
        {/* MARK: FORMULARIO */}
    <div className="space-y-8">
        <div className="border-b border-gray-900/10 pb-8">
        <h2 className="text-base font-semibold leading-7 text-gray-900">Novo Voluntário</h2>
        {/* <p className="mt-1 text-sm leading-6 text-gray-600">Essas informações estarão visíveis para todos os Administradores da Instituição</p> */}

        <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-6">
            {/* NOME */}
            <div className="sm:col-span-4">
                <div className="flex items-center space-x-2">
                    <label
                    htmlFor="username"
                    className="text-sm font-medium leading-6 text-gray-900"
                    >
                    Nome
                    </label>
                    <div className="flex-1">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                        type="text"
                        name="username"
                        id="username"
                        autoComplete="username"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Jane Smith"
                        />
                    </div>
                    </div>
                </div>
            </div>


            {/* EMAIL */}
            <div className="sm:col-span-4">
                <div className="flex items-center space-x-2">
                    <label
                    htmlFor="username"
                    className="text-sm font-medium leading-6 text-gray-900"
                    >
                    E-mail
                    </label>
                    <div className="flex-1">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                        type="text"
                        name="useremail"
                        id="useremail"
                        autoComplete="useremail"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder=" janesmith@gmail.com"
                        />
                    </div>
                    </div>
                </div>
            </div>

            {/* SENHA */}
            <div className="sm:col-span-4">
                <div className="flex items-center space-x-2">
                    <label
                    htmlFor="senha"
                    className="text-sm font-medium leading-6 text-gray-900"
                    >
                    Senha
                    </label>
                    <div className="flex-1">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                        type="password"
                        name="senha"
                        id="senha"
                        autoComplete="senha"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder=" ******"
                        />
                    </div>
                    </div>
                </div>
            </div>

            {/* TELEFONE */}
            <div className="sm:col-span-4">
                <div className="flex items-center space-x-2">
                    <label
                    htmlFor="userphone"
                    className="text-sm font-medium leading-6 text-gray-900"
                    >
                    Telefone
                    </label>
                    <div className="flex-1">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                        type="text"
                        name="userphone"
                        id="userphone"
                        autoComplete="userphone"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder=" (11) 1234-5678"
                        />
                    </div>
                    </div>
                </div>
            </div>

        </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">Definir Permissões</h2>

        <div className="mt-5 space-y-5">
            <fieldset>
                {/* MARK: Checkbox Permissão ADMIN 
                */}
            <legend className="text-sm font-semibold leading-6 text-gray-900">Atribuir permissão de Administrador</legend>
            <div className="space-y-3">
                <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                        <input id="podeCriarEventos" name="podeCriarEventos" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600">
                        </input>
                    </div>
                    <div className="text-sm leading-6">
                        <label htmlFor="podeCriarEventos" className="text-gray-500">Pode criar Eventos</label>
                    </div>
                </div>
                <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                        <input id="podeAddUsuario" name="podeAddUsuario" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600">
                        </input>
                    </div>
                    <div className="text-sm leading-6">
                        <label htmlFor="podeAddUsuario" className="text-gray-500">Pode adicionar novos usuários</label>
                    </div>
                </div>
                <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                        <input id="podeRemoverUsuario" name="podeRemoverUsuario" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600">
                        </input>
                    </div>
                    <div className="text-sm leading-6">
                        <label htmlFor="podeRemoverUsuario" className="text-gray-500">Pode remover usuários</label>
                    </div>
                </div>
                <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                        <input id="podeEditarUsuario" name="podeEditarUsuario" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600">
                        </input>
                    </div>
                    <div className="text-sm leading-6">
                        <label htmlFor="podeEditarUsuario" className="text-gray-500">Pode editar usuários (alterar senha, perrmissões, ...)</label>
                    </div>
                </div>
                <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                        <input id="podePromoverERebaixarUsuario" name="podePromoverERebaixarUsuario" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600">
                        </input>
                    </div>
                    <div className="text-sm leading-6">
                        <label htmlFor="podePromoverERebaixarUsuario" className="text-gray-500">Pode promover e rebaixar usuários</label>
                    </div>
                </div>
            
            </div>
                    {/* MARK: Checkbox Permissão VOLUNT
                */}
            <legend className="text-sm font-semibold leading-6 text-gray-900 mt-5">Atribuir permissão de Voluntário</legend>
            <div className="space-y-3">
                <div className="relative flex gap-x-3">
                <div className="flex h-6 items-center">
                        <input id="podeAcessarDashboard" name="podeAcessarDashboard" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600">
                        </input>
                </div>
                <div className="text-sm leading-6">
                    <label htmlFor="podeAcessarDashboard" className="text-gray-500">Pode acessar a dashboard</label>
                </div>
                </div>
                <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                        <input id="podeAddProduto" name="podeAddProduto" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600">
                        </input>
                    </div>
                    <div className="text-sm leading-6">
                        <label htmlFor="podeAddProduto" className="text-gray-500">Pode adicionar produtos ao estoque e a vitrine</label>
                    </div>
                </div>
                <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                        <input id="podeRemoverPorduto" name="podeRemoverPorduto" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600">
                        </input>
                    </div>
                    <div className="text-sm leading-6">
                        <label htmlFor="podeRemoverPorduto" className="text-gray-500">Pode remover produtos do estoque</label>
                    </div>
                </div>
                <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                        <input id="podeEditarProduto" name="podeEditarProduto" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600">
                        </input>
                    </div>
                    <div className="text-sm leading-6">
                        <label htmlFor="podeEditarProduto" className="text-gray-500">Pode editar produtos (alterar valores, status, estado, ...)</label>
                    </div>
                </div>
                <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                        <input id="podeBiaxarRelatorio" name="podeBiaxarRelatorio" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600">
                        </input>
                    </div>
                    <div className="text-sm leading-6">
                        <label htmlFor="podeBiaxarRelatorio" className="text-gray-500">Pode baixar relatórios</label>
                    </div>
                </div>
            
            </div>

            </fieldset>

        </div>
        </div>
    </div>

        {/* MARK: BOTÕES 
        */}
        <div className="mt-3 flex items-center justify-end gap-x-6">
            <button type="button" 
                className="text-sm font-semibold leading-6 text-gray-900">Cancelar</button>
            <button type="submit" 
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Cadastrar</button>
        </div>
    </form>
      </>
    );
  };
  
