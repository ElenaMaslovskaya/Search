import api from '../../utils/Api';
import { useEffect, useState, useCallback } from 'react';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import { Switch } from 'react-router-dom';
import { Main } from '../Main';
import NotFound from '../NotFound';
import { Photo } from '../Photo';
import { CardContext } from '../../context/CardContext';
import { useApi } from "../../hooks/useApi";

function App() {
  const [searchQuery, setSearchQuery] = useState('dog');

  const handler = useCallback(() => {
    return api.search(searchQuery);
  }, [searchQuery]);

  const { data, loading, error } = useApi(handler);
  /*
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleRequest = () => {
      if (searchQuery !== '') {
        setIsLoading(true);
        api.search(searchQuery)
          .then((data) => {
            setCards(data);
          })
          .catch(err => console.error(err))
          .finally(() => setIsLoading(false))
      }
    }
    handleRequest();
  }, [searchQuery]);
*/
  const onSubmit = (value) => {
    setSearchQuery(value)
  }

  return (
    <CardContext.Provider value={data}>
      <Switch>
        <Route path="/" exact>
          <Main
            onSubmit={onSubmit}
            initialValue={searchQuery}
            isLoading={loading}
          />
        </Route>
        <Route path="/photos/:photoId">
          <Photo />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </CardContext.Provider>
  );
}

export default App;
