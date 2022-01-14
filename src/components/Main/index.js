import React, { useContext, useState } from 'react';
import './index.css';
import Card from '../Card';
import Button from '../Button';
import Input from '../Input';
import Spinner from '../Spinner';
import { CardContext } from '../../context/CardContext';

export const Main = ({
   onSubmit,
   isLoading,
   initialValue
}) => {
   const [value, setValue] = useState(initialValue);
   const cards = useContext(CardContext);

   const handleInputChange = (event) => {
      setValue(event.target.value);
   };

   const handleFormSubmit = (event) => {
      event.preventDefault();
      onSubmit(value);
   }

   return (
      <div className="main">
         <div className="main__content">
            <form onSubmit={handleFormSubmit} className="main__search">
               <Input placeholder="Search free high-resolution photos" onChange={handleInputChange} />
               <Button type="submit" text="Search" handleClick={() => console.log(123)}>
                  <span className="icon"></span>
               </Button>
            </form>
            {isLoading ? (
               <Spinner />
            ) : (
            <div className="main__cards">
               {cards.map((item) => (
                  <Card key={item.id} {...item} />
               ))}
            </div>
            )}
         </div>
      </div>
   );
}

