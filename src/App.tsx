import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Routes } from './routes';
import GlobalStyle from './styles/global';

export function App() {
  return (
    <Router>
      <AuthProvider>
        <GlobalStyle />
        <Routes />
      </AuthProvider>
    </Router>
  );
}

