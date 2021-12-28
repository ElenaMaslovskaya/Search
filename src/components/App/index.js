import './index.css';
import api from '../../utils/Api';
import { useEffect, useState } from 'react';
import Card from '../Card';
import Button from '../Button';
import Input from '../Input';
import Spinner from '../Spinner';

function App() {
  const [searchQuery, setSearchQuery] = useState('dog');
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    handleRequest();
  }, [])

  const handleRequest = () => {
    if (searchQuery !== '') {
      setIsLoading(true);
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
        .catch(err => console.error(err))
        .finally(() => setIsLoading(false))
    }
  }

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleRequest();
  }

  return (
    <div className="app">
      <div className="app__content">
        <form onSubmit={handleFormSubmit} className="app__search">
          <Input placeholder="Search free high-resolution photos" handleChange={handleInputChange} />
          <Button type="submit" text="Search" handleClick={() => console.log(123)} />
        </form>
        {
          isLoading
            ? <Spinner />
            : (<div className="app__cards">
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
            </div>)
        }
      </div>
    </div>
  );
}

export default App;
