import { useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import styled from 'styled-components';
import './App.css';
import AppContext from './appContext';
import Chart from './containers/Chart';
import Controls from './containers/Controls';
import { Ingredient } from './types/types';

const queryClient = new QueryClient();

const AppContainer = styled.div`
max-width: 1100px;
margin: 20px auto;
`;

function App() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const context = useMemo(() => ({ ingredients, setIngredients }), [ingredients]);
  return (
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider value={context}>
        <AppContainer>
          <div className="App">
            <Controls />
            <Chart />
          </div>
        </AppContainer>
      </AppContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
