/* IMPORT REACT */
import Modal from "react-bootstrap/Modal";

/* IMPORT COMPONENTE */
import SquadForm from "./SquadForm";

export default (props) => {    
    var show = props.show;
    var onHide = props.onHide;
    return (<>
        <Modal
            show={show}
            backdrop="static"
            keyboard={false}
            fullscreen={true}
            onHide={() => {
                onHide();
            }}
        >
            <SquadForm funcaoVoltar={onHide}/>
        </Modal>
    </>);
};
