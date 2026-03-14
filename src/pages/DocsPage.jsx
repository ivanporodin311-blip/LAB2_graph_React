// src/pages/DocsPage.jsx
const DocsPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Docs Page</h1>
      <p style={styles.text}>Документация React Bits</p>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    color: 'white'
  },
  title: {
    color: 'white',
    fontSize: '2rem',
    marginBottom: '1rem'
  },
  text: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '1.1rem'
  }
};

export default DocsPage;