import React from 'react';
import styles from './Layout.module.scss';

const Layout = ({ children }: { children: React.ReactNode}) => {
    return (
        <div className={styles.containerFluid}>
            <div className={styles.background}>
                {children}
            </div>
        </div>
    )
};

export default Layout;