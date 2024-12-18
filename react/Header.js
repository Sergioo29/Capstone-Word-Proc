const React = require('react');

function Header() {
    return React.createElement(
        React.Fragment,
        null,
        React.createElement(
            'header',
            { className: 'main-header' },
            React.createElement('img', {
                src: '/images/logo.png',
                alt: 'logo',
                className: 'logo'
            }),
            React.createElement('h1', { className: 'title' }, 'Idea Surge'),
            React.createElement('div', { className: 'placeholder-div' })
        ),
        React.createElement(
            'nav',
            { className: 'main-nav' },
            React.createElement(
                'ul',
                { className: 'nav-list' },
                React.createElement(
                    'li',
                    { className: 'nav-item' },
                    React.createElement(
                        'a',
                        { href: '/', className: 'nav-link' },
                        'Home'
                    )
                ),
                React.createElement(
                    'li',
                    { className: 'nav-item' },
                    React.createElement(
                        'a',
                        { href: '/documents', className: 'nav-link' },
                        'Documents'
                    )
                )
            )
        )
    );
}

module.exports = Header;
