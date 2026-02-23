import { NavLink, Outlet } from 'react-router-dom';

export function AppLayout() {
  return (
    <div className="app-shell">
      <header className="header">
        <h1>Waitlist Management</h1>
        <nav>
          <NavLink to="/">Dashboard</NavLink>
          <NavLink to="/venues">Venues</NavLink>
        </nav>
      </header>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
