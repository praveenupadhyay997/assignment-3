import styled from 'styled-components';
import { ThemeProvider } from './theme/ThemeProvider';
import { StyledComponentsProvider } from './theme/StyledThemeProvider';
import { GlobalStyles } from './theme/GlobalStyles';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import Board from './components/Board/Board';
import { DragProvider } from './context/DragContext';
import FilterBar from './components/FilterBar/FilterBar';

const AppContainer = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacings.lg};
`;

const Header = styled.header`
  background-color: ${({ theme }) => theme.colors.background.paper};
  padding: ${({ theme }) => theme.spacings.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  margin-bottom: ${({ theme }) => theme.spacings.lg};
`;

function App() {
  return (
    <ThemeProvider>
      <StyledComponentsProvider>
        <GlobalStyles />
        <DragProvider>
          <AppContainer>
            <Header>
              <h1>FlowBoard</h1>
              <p>A simple and elegant task management board.</p>
            </Header>
            <main>
              <FilterBar />
              <Board />
            </main>
            <ThemeToggle />
          </AppContainer>
        </DragProvider>
      </StyledComponentsProvider>
    </ThemeProvider>
  );
}

export default App;
