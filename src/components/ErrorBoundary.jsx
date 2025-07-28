import { Component } from 'react';
import './ErrorBoundary.css';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging
    console.error('Game Error:', error);
    console.error('Error Info:', errorInfo);
    
    this.setState({
      error,
      errorInfo
    });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-container">
            <div className="error-icon">⚠️</div>
            <h1 className="error-title">Oops! Something went wrong</h1>
            <p className="error-message">
              The Simon Game encountered an unexpected error. Don't worry, your high scores are safe!
            </p>
            
            <div className="error-actions">
              <button className="retry-button" onClick={this.handleRetry}>
                🔄 Try Again
              </button>
              <button 
                className="reload-button" 
                onClick={() => window.location.reload()}
              >
                🌐 Reload Page
              </button>
            </div>

            {import.meta.env.DEV && this.state.error && (
              <details className="error-details">
                <summary>Technical Details (Development Mode)</summary>
                <pre className="error-stack">
                  {this.state.error.toString()}
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
