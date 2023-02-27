/* IMPOR REACT */
import { Col, Row } from "react-bootstrap";

/* IMPORT COMPONENTE */
import ButtonSuccess from "./UI/Button/ButtonSuccess";
import ButtonCancel from "./UI/Button/ButtonCancel";
import Botao from "./UI/Button/Botao";

export default (props) => {    
    return (<>
        <Row>                        
            <Col sm={8}>
            </Col>
            <Col sm={2}>
                <ButtonSuccess
                    valido={true}
                    texto={"Salvar"}
                    funcao={props.funcaoSalvar}
                />  
            </Col>
            <Col sm={2}>
                <ButtonCancel
                    valido={true}
                    texto={"Voltar"}
                    funcao={props.funcaoVoltar}
                />
            </Col>                        
        </Row>
    </>);
};
