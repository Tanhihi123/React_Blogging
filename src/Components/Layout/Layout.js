import React, { Children, Fragment } from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({children}) => {
    return (
        <Fragment>
            <Header></Header>
            {children}
        </Fragment>
    );
};

export default Layout;