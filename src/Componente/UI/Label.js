/* IMPORT REACT */
import { Col, Form } from "react-bootstrap";
import parse from "html-react-parser";

/* IMPORT GERAL */
import Utils from "../../Geral/Utils";

export default (props) => {
    
    var parametrosTamanho = props.hasOwnProperty("parametrosTamanho")
        ? props.parametrosTamanho
        : null;
    var classe = props.hasOwnProperty("classe")
        ? props.classe
        : null;
    var texto = props.hasOwnProperty("texto")
        ? parse(props.texto)
        : null;
    var coluna = props.hasOwnProperty("coluna")
        ? props.coluna
        : false;
    var id = props.hasOwnProperty("id") 
        ? props.id 
        : null;

    if (coluna) {
        return (
            <Form.Label
                column
                xs={Utils.getTamanhoColuna("xs", parametrosTamanho)}
                sm={Utils.getTamanhoColuna("sm", parametrosTamanho)}
                md={Utils.getTamanhoColuna("md", parametrosTamanho)}
                lg={Utils.getTamanhoColuna("lg", parametrosTamanho)}
                xl={Utils.getTamanhoColuna("xl", parametrosTamanho)}
                id={id}
            >
                {texto}
            </Form.Label>
        );
    } else {
        return (
            <Col
                xs={Utils.getTamanhoColuna("xs", parametrosTamanho)}
                sm={Utils.getTamanhoColuna("sm", parametrosTamanho)}
                md={Utils.getTamanhoColuna("md", parametrosTamanho)}
                lg={Utils.getTamanhoColuna("lg", parametrosTamanho)}
                xl={Utils.getTamanhoColuna("xl", parametrosTamanho)}
                className={classe}
            >
                <Form.Label className={classe}>{texto}</Form.Label>
            </Col>
        );
    }
};
