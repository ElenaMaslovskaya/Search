import './index.css';

const Input = ({placeholder, handleChange}) => {
   return (
      <input className="input" placeholder={placeholder} onChange={handleChange} />
   )
}

export default Input;