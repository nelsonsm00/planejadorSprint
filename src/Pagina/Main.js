/* IMPORT REACT */
import React from "react";
import CalculadoraForm from "../Componente/CalculadoraForm";

/* IMPORT COMPONENTE */
import Rodape from "../Componente/UI/Rodape";

/* IMPORT GERAL */
import Cache from "../Geral/Cache/Cache";

export default () => {
    /*Cache.reseta();
    if (Cache.equipeDesenvolvimento.get == null || (Cache.equipeDesenvolvimento.get != null && Cache.equipeDesenvolvimento.get.length == 0)) {
        Cache.equipeDesenvolvimento.set([
            {nome: "Andrei Dilhe", usuario: "andrei.dilhe"},
            {nome: "Eduardo Reis", usuario: "eduardo.reis"},
            {nome: "Gustavo da Conceição", usuario: "gustavo.conceicao"},
            {nome: "Icaro Nunes", usuario: "icaro.nunes"},
            {nome: "Nélson Martins", usuario: "nelson.martins"}])
    }

    if (Cache.equipeTeste.get == null || (Cache.equipeTeste.get != null && Cache.equipeTeste.get.length == 0)) {
        Cache.equipeTeste.set([{nome: "Fabio da Silva", usuario: "fabio.dasilva"}]);
    }*/
/*
    Cache.equipe.set([
        {nome: "Andrei Dilhe", usuario: "andrei.dilhe", desenvolvimento: true, teste: false, documentacao: true},
        {nome: "Eduardo Reis", usuario: "eduardo.reis", desenvolvimento: true, teste: false, documentacao: true},
        {nome: "Fabio da Silva", usuario: "fabio.dasilva", desenvolvimento: false, teste: true, documentacao: true},
        {nome: "Gustavo da Conceição", usuario: "gustavo.conceicao", desenvolvimento: true, teste: false, documentacao: true},
        {nome: "Icaro Nunes", usuario: "icaro.nunes", desenvolvimento: true, teste: false, documentacao: true},
        {nome: "Nélson Martins", usuario: "nelson.martins", desenvolvimento: true, teste: false, documentacao: true}]);*/

    return (
        <>
            <div align="center">
                <div className="containerComponent">
                    <CalculadoraForm />    
                </div>
                <Rodape />
            </div>
        </>
    );
};

