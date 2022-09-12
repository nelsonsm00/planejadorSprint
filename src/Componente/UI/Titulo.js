export default (props) => {    
    var titulo = props.hasOwnProperty("titulo") ? props.titulo : "";
    return <div className="titleBox">{titulo}</div>
};