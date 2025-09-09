import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import './index.css';
import App from './App';
import store from './store/store';

// Error boundary fallback component
function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div role="alert" className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
      <p className="font-bold">Something went wrong:</p>
      <pre className="whitespace-pre-wrap my-2">{error.message}</pre>
      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Try again
      </button>
    </div>
  );
}

const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <Provider store={store}>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
          // Reset the state of your app here
          window.location.href = '/';
        }}
      >
        <App />
      </ErrorBoundary>
    </Provider>
  </StrictMode>
);
