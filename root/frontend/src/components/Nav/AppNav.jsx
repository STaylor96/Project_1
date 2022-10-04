import { Link } from 'react-router-dom';
import { Nav, NavItem, NavSection } from './index.js';

export const AppNav = () => {
    return (
        <Nav>
            <NavSection>
                <NavItem>
                    <Link to="/" className="nav-link">Home</Link>
                </NavItem>
                <NavItem>
                    <Link to="/warehouses" className="nav-link">Warehouses</Link>
                </NavItem>
                <NavItem>
                    <Link to="/products" className="nav-link">Catalog</Link>
                </NavItem>
            </NavSection>
        </Nav>
    )
}