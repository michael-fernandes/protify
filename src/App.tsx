import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import Controls from './containers/Controls';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Controls />
      </div>
    </QueryClientProvider>
  );
}

export default App;
