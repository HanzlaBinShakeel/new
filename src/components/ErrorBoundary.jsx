import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('App error:', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            background: '#051a42',
            color: '#fff',
            fontFamily: 'system-ui, sans-serif',
            textAlign: 'center',
          }}
        >
          <div>
            <h1 style={{ marginBottom: '1rem' }}>Something went wrong</h1>
            <p style={{ opacity: 0.85, marginBottom: '1.5rem' }}>
              Please refresh the page. If the problem continues, try clearing your browser cache.
            </p>
            <a
              href="/new/"
              style={{
                color: '#5b9cf5',
                fontWeight: 600,
              }}
            >
              Reload home
            </a>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
