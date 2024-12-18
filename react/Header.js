// JSX that needs babel to translate
// const React = require('react');

// function Header() {
//     return (
//         <header style={{ backgroundColor: 'lightblue', padding: '1rem', textAlign: 'center' }}>
//             <h1>Welcome to My React Project</h1>
//         </header>
//     );
// }

// module.exports = Header;

const React = require('react');

function Header() {
    return React.createElement(
        React.Fragment,
        null,
        React.createElement(
            'header',
            {
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem',
                    backgroundColor: 'lightblue'
                }
            },
            React.createElement('img', {
                src: '/images/logo.png',
                alt: 'logo',
                style: { width: '200px', height: '200px' }
            }),
            React.createElement('h1', {
                style: { fontSize: '2.5rem', margin: '0', color: '#333' }
            }, 'Idea Surge'),
            React.createElement('div') // Placeholder div
        ),
        React.createElement(
            'nav',
            {
                style: {
                    backgroundColor: '#333',
                    color: 'white',
                    padding: '0.5rem 1rem'
                }
            },
            React.createElement(
                'ul',
                {
                    style: {
                        display: 'flex',
                        listStyle: 'none',
                        margin: 0,
                        padding: 0
                    }
                },
                React.createElement(
                    'li',
                    { style: { margin: '0 1rem' } },
                    React.createElement(
                        'a',
                        {
                            href: '/',
                            style: { color: 'white', textDecoration: 'none', fontSize: '1.2rem' }
                        },
                        'Home'
                    )
                ),
                React.createElement(
                    'li',
                    { style: { margin: '0 1rem' } },
                    React.createElement(
                        'a',
                        {
                            href: '/documents',
                            style: { color: 'white', textDecoration: 'none', fontSize: '1.2rem' }
                        },
                        'Documents'
                    )
                )
            )
        )
    );
}

module.exports = Header;
