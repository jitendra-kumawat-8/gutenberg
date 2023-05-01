import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./Screens/Home";
import Library from "./Screens/Library";
import { QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient();

export default function App() {
  return(
      <QueryClientProvider client={queryClient}>

      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home></Home>}></Route>
              <Route path="/library" element={<Library></Library>}></Route>
          </Routes>
      </BrowserRouter>
      </QueryClientProvider>
  );
}
