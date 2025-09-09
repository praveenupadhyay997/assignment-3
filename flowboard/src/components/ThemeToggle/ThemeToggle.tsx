import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../theme/ThemeProvider';

const ToggleContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
`;

const ToggleButton = styled.button<{ active: boolean }>`
  background: ${({ theme }) => theme.colors.background.paper};
  border: 1px solid ${({ theme }) => theme.colors.divider};
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px;
  position: relative;
  width: 60px;
  height: 30px;
  outline: none;
  transition: all 0.3s ease;
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const ToggleIcon = styled.span<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  width: 100%;
  height: 100%;
  transition: all 0.3s ease;
  color: ${({ theme, active }) => 
    active ? theme.colors.primary : theme.colors.text.secondary};
`;

const ToggleThumb = styled.span<{ $isDark: boolean }>`
  position: absolute;
  top: 2px;
  left: ${({ $isDark }) => ($isDark ? '32px' : '2px')};
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  transition: all 0.3s ease;
`;

export const ThemeToggle: React.FC = () => {
  const { themeMode, toggleTheme } = useTheme();
  const isDark = themeMode === 'dark' || 
    (themeMode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <ToggleContainer>
      <ToggleButton 
        onClick={toggleTheme}
        aria-label="Toggle theme"
        active={isDark}
      >
        <ToggleIcon active={!isDark}>☀️</ToggleIcon>
        <ToggleIcon active={isDark}>🌙</ToggleIcon>
        <ToggleThumb $isDark={isDark} />
      </ToggleButton>
    </ToggleContainer>
  );
};

export default ThemeToggle;
