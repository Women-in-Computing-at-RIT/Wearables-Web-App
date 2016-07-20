import ReactDOM from 'react-dom';

const getInputValue = (comp) => ReactDOM.findDOMNode(comp).value;
export default getInputValue;
