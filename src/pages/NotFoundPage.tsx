import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <section>
      <h2>Page not found</h2>
      <p>The page you requested doesn't exist.</p>
      <Link to="/">Go back to dashboard</Link>
    </section>
  );
}
