/* IMPORT REACT */
import { Col, Row, Container } from "react-bootstrap";

/* IMPORT PROJETO */
import IconEdit from "./IconEdit";
import IconDelete from "./IconDelete";

/* IMPORT GERAL */
import Utils from "../../../Geral/Utils";

export default (props) => {
    return (<>
        <Container>
            <Row>                
                <Col sm={4} className="crudIcon">
                    <IconEdit
                        funcao={props.editar}
                        parametrosFuncao={props.parametrosEditar}
                    />
                </Col>
                <Col sm={4} className="crudIcon">
                </Col>
                <Col sm={4} className="crudIcon">
                    <IconDelete
                        funcao={props.deletar}
                        parametrosFuncao={props.parametrosDeletar}
                    />
                </Col>
            </Row>
        </Container>
    </>);
};
