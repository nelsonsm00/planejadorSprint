export default (props) => {
    var value = props.hasOwnProperty("value") ? props.value : "";
    var text = props.hasOwnProperty("text") ? props.text : "SELECIONE";
    
    return(<option value={value}>{text}</option>);
};
