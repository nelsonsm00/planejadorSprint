/* IMPORT REACT */
import { Col } from "react-bootstrap";
import FormCheck from 'react-bootstrap/FormCheck'
import { Table } from "reactstrap";

/* IMPORT COMPONENTE */
import ComponenteEnum from "../../Geral/Enum/ComponenteEnum";
import IconCRUD from "./Icon/IconCRUD";
import IconAdd from "./Icon/IconAdd";
import IconDelete from "./Icon/IconDelete";
import Input from "./Input";
import IconEdit from "./Icon/IconEdit";

export default (p) => { 
    var id = p.id;
    var colunas = p.colunas;
    var dados = p.dados;
    var funcao = p.hasOwnProperty("funcao") ? p.funcao : () => {};
    var funcaoNegativo = p.hasOwnProperty("funcaoNegativo") ? p.funcaoNegativo : () => {};
    var filtraExcluido = p.hasOwnProperty("filtraExcluido") ? p.filtraExcluido : {filtra: false};
    return (
                <Table id={id} bordered className="tableListagemSimulacao">
                    <thead>
                        <tr>
                            {colunas.map((c) => (<>
                                {c.componente == ComponenteEnum.ButtonAddDelete || c.componente == ComponenteEnum.ButtonCRUD?
                                    <th width={c.largura + "%"}><IconAdd funcao={c.funcao.add} /></th> :
                                    <th width={c.largura + "%"}>{c.texto}</th>
                                }                            
                            </>))}
                        </tr>
                    </thead>
                    <tbody>
                        {dados.map((d, index) => (<>
                            {filtraExcluido.filtra && d[filtraExcluido.chave] ? <></> :
                            <tr className={funcaoNegativo(index) ? "negativo" : ""}>
                                {colunas.map((c) => (                                    
                                    c.componente == ComponenteEnum.Texto && c.subDados.length > 0 && c.subChave != "" ? 
                                        <>{c.subDados.map((cs) => (cs[c.subChave.split(";")[0]] == d[c.chave] ? <td>{cs[c.subChave.split(";")[1]]}</td> : <></>))}</> :    
                                    c.componente == ComponenteEnum.Texto ?
                                        <td>{d[c.chave]}</td> :                                   
                                    c.componente == ComponenteEnum.Input ?
                                        <td><Input ativo={true} valor={d[c.chave]} parametrosTamanho={c.parametrosTamanho} inputTexto={true} funcao={c.funcao} parametrosFuncao={{index: index, propriedade: c.chave}}/></td> :
                                    c.componente == ComponenteEnum.CheckBox ?
                                        <td align="center"><Col sm={c.parametrosTamanho}><FormCheck label={""} name={"gb"+c.chave} type="checkbox" checked={d[c.chave]} onChange={() => c.funcao(!d[c.chave], {index: index, propriedade: c.chave})}/></Col></td> :
                                    c.componente == ComponenteEnum.Radio ?
                                        <td align="center"><Col sm={c.parametrosTamanho}><FormCheck label={""} name={"gb"+c.chave} type="radio" checked={d[c.chave]} onChange={() => c.funcao(!d[c.chave], {index: index, propriedade: c.chave})}/></Col></td> :
                                    c.componente == ComponenteEnum.Button ?
                                        <td align="center"><IconDelete funcao={c.funcao} parametrosFuncao={{valor: true, index: index, propriedade: c.chave}}/></td> : 
                                    c.componente == ComponenteEnum.ButtonAddDelete ?
                                        <td align="center"><IconDelete funcao={c.funcao.delete} parametrosFuncao={{valor: true, index: index, propriedade: c.chave}}/></td> :
                                    (c.componente == ComponenteEnum.ButtonCRUD || c.componente == ComponenteEnum.ButtonEditDelete) && c.funcao.validaDelete != null && d[c.funcao.validaDelete.chave] != c.funcao.validaDelete.valor ?
                                        <td></td> :
                                    (c.componente == ComponenteEnum.ButtonCRUD || c.componente == ComponenteEnum.ButtonEditDelete) && c.funcao.validaEdicao != null && d[c.funcao.validaEdicao.chave] != c.funcao.validaEdicao.valor ?
                                        <td align="center"><IconDelete funcao={c.funcao.delete} parametrosFuncao={{index: index}}/></td> :
                                    (c.componente == ComponenteEnum.ButtonCRUD || c.componente == ComponenteEnum.ButtonEditDelete) ?
                                        <td align="center"><IconCRUD editar={c.funcao.edit} parametrosEditar={{index: index}} deletar={c.funcao.delete} parametrosDeletar={{index: index}}/></td> :
                                    <td></td>                                    
                                    ))
                                }                            
                            </tr>}                                
                        </>))}
                    </tbody>
                </Table>
            );                            
}