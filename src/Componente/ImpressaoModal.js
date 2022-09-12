/* IMPORT REACT */
import Modal from "react-bootstrap/Modal";
import { Col, Row } from "react-bootstrap";


/* IMPORT COMPONENTE */
import Input from "./UI/Input";
import Label from "./UI/Label";
import ButtonSuccess from "./UI/Button/ButtonSuccess";
import ButtonCancel from "./UI/Button/ButtonCancel";

export default (props) => {    
    var show = props.show;
    var onHide = props.onHide;
    var valor = props.valor;
    var funcao = props.funcao;
    var funcaoSecundaria = props.funcaoSecundaria;
    return (<>
        <Modal
            size="sm"
            show={show}
            onHide={() => {
                onHide();
            }}
        >
            <Modal.Header>
                <Modal.Title>
                    Impressão
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Label texto="Nome da sprint:" />
                    <Input ativo={true} valor={valor} inputTexto={true} funcao={funcaoSecundaria} />
                </Row>
                <hr/>
                <Row>                        
                    <Col sm={6}>
                        <ButtonSuccess
                            valido={true}
                            texto={"Imprimir"}
                            funcao={funcao}
                        />  
                    </Col>
                    <Col sm={6}>
                        <ButtonCancel
                            valido={true}
                            texto={"Cancelar"}
                            funcao={onHide}
                        />
                    </Col>                        
                </Row>    
            </Modal.Body>
        </Modal>
    </>);
};
