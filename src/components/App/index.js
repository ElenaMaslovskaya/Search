import './index.css';
import api from '../../utils/Api';
import { useEffect, useState } from 'react';
import Card from '../Card';
import Button from '../Button';
import Input from '../Input';

function App() {
  const [searchQuery, setSearchQuery] = useState('dog');
  const [cards, setCards] = useState([]);
  useEffect(() => {
    if(searchQuery !== ''){
      api.search(searchQuery)
      .then(data => {
        const cards = data.results.map(item => {
          return {
            id: item.id,
            src: item.urls.regular,
            alt: item.alt_description,
            title: item.user.name,
            subtitle: item.description
          }
        })
        setCards(cards);
      })
    }
  }, [])

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
  }

  console.log('searchQuery', searchQuery)
  return (
    <div className="app">
      <div className="app__content">
        <form onSubmit={handleFormSubmit} className="app__search">
          <Input placeholder="Search free high-resolution photos" handleChange={handleInputChange} />
          <Button text="Search" handleClick={()=> console.log(123)} />
        </form>
        <div className="app__cards">
          {
            cards.map(item =>
              <Card
                key={item.id}
                src={item.src}
                title={item.title}
                subtitle={item.subtitle}
                alt={item.alt}
              />
            )
          }
        </div>
      </div>
    </div>
  );
}

export default App;
