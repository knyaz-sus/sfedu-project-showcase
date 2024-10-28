import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="flex justify-center pl-3 pr-3 pt-2 pb-2 m-0 bg-highlight text-header">
      <nav className="flex-auto max-w-5xl">
        <ul className="flex items-center justify-between max-w-5xl">
          <div className="flex items-center gap-6">
            <li className="mr-2">
              <Link to="/">
                <img className="max-w-16 max-h-16" src="/logo.png" alt="logo" />
              </Link>
            </li>
            <li>
              <Link to="/">Витрина ПД</Link>
            </li>
            <li>
              <Link to="/tracks">Треки</Link>
            </li>
            <li>
              <Link to="/search">Проекты</Link>
            </li>
          </div>
          <li>
            <Link to="/auth">Войти</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
