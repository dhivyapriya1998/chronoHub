import React from 'react';

const Sidebar = ({ pages }) => {
  const sidebarStyle = {
    height: '100vh',
    width: '220px',
    backgroundColor: '#1e1e2f',
    color: '#fff',
    padding: '20px',
    boxSizing: 'border-box',
    position: 'fixed',
    left: 0,
    top: 0,
  };

  const logoStyle = {
    fontSize: '24px',
    marginBottom: '40px',
    textAlign: 'center',
  };

  const navLinksStyle = {
    listStyle: 'none',
    padding: 0,
  };

  const navItemStyle = {
    margin: '20px 0',
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '18px',
    display: 'block',
    transition: 'color 0.2s',
  };

  const hoverStyle = {
    color: '#1abc9c',
  };

  return (
    <div style={sidebarStyle}>
      <h2 style={logoStyle}>MyApp</h2>
      <ul style={navLinksStyle}>
        {pages.map((page, index) => (
          <li key={index} style={navItemStyle}>
            <a
              href={page.href}
              style={linkStyle}
              onMouseOver={e => (e.target.style.color = hoverStyle.color)}
              onMouseOut={e => (e.target.style.color = linkStyle.color)}
            >
              {page.icon && <span style={{ marginRight: '8px' }}>{page.icon}</span>}
              {page.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
