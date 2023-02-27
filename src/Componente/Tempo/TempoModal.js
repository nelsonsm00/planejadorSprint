/* IMPORT REACT */
import Modal from "react-bootstrap/Modal";

/* IMPORT COMPONENTE */
import TempoForm from "./TempoForm";

export default (props) => {    
    var show = props.show;
    var onHide = props.onHide;
    return (<>
        <Modal
            size="lg"
            show={show}
            onHide={() => {
                onHide();
            }}
        >
            <Modal.Body>
                <TempoForm funcaoVoltar={onHide}/>  
            </Modal.Body>
        </Modal>
    </>);
};
