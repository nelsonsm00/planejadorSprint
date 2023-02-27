/* IMPORT REACT */
import Modal from "react-bootstrap/Modal";
import CalculadoraDemandaPaiForm from "./CalculadoraDemandaPaiForm";

/* IMPORT COMPONENTE */
import CalculadoraDevTesteSubTaskForm from "./CalculadoraDevTesteSubTaskForm";

export default (props) => {    
    var show = props.show;
    var edicao = props.edicao;
    var indexEdicao = props.indexEdicao;
    var registroEdicao = props.registroEdicao;
    var onHide = props.onHide;
    var funcao = props.funcao;
    var funcaoGetMaiorDesenvolvimento = props.funcaoGetMaiorDesenvolvimento;
    return (<>
        <Modal
            show={show}
            backdrop="static"
            keyboard={false}
            fullscreen={true}
        >
            <CalculadoraDemandaPaiForm 
                edicao={{edicao: true, registroEdicao}} 
                funcao={funcao} 
                funcaoVoltar={onHide} 
            />
        </Modal>
    </>);
};
