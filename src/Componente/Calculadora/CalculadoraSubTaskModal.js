/* IMPORT REACT */
import Modal from "react-bootstrap/Modal";

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
            size="lg"
            show={show}
            onHide={() => {
                onHide();
            }}
        >
            <Modal.Body>
                <CalculadoraDevTesteSubTaskForm 
                    funcao={funcao} 
                    funcaoVoltar={onHide}
                    funcaoGetMaiorDesenvolvimento={funcaoGetMaiorDesenvolvimento}
                    edicao={{edicao, indexEdicao, registroEdicao}}/>  
            </Modal.Body>
        </Modal>
    </>);
};
