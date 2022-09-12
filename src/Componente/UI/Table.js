/* IMPORT REACT */
import { Table } from "reactstrap";
import IconDelete from "./Icon/IconDelete";

export default (p) => { 
    var colunas = p.colunas;
    var dados = p.dados;
    var funcao = p.hasOwnProperty("funcao") ? p.funcao : () => {};
    var funcaoNegativo = p.hasOwnProperty("funcaoNegativo") ? p.funcaoNegativo : () => {};
    return (
                <Table bordered className="tableListagemSimulacao">
                    <thead>
                        <tr>
                            {colunas.map((c) => (<th width={c.largura + "%"}>{c.texto}</th>))}
                        </tr>
                    </thead>
                    <tbody>
                        {dados.map((d, index) => (
                            <tr className={funcaoNegativo(index) ? "negativo" : ""}>
                                {colunas.map((c) => (c.colunaBotao ? <td><IconDelete funcao={funcao} parametrosFuncao={{id: index}}/></td> : <td>{d[c.chave]}</td>))}                            
                            </tr>
                        ))}
                    </tbody>
                </Table>
            );
}