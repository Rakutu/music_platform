import React from 'react';
import Link from "next/link";
import {Trans} from "@lingui/react";
import {NavItem} from "./navbar.types";
import {navbarMenu} from "./navbar.constants";
import {Icon} from "@mui/material";
import styles from './navbar.module.scss';


type MenuState = [ open: boolean, setOpen:  React.Dispatch<React.SetStateAction<boolean>>];

type RenderNavbarItem = (item: NavItem) => JSX.Element;

type RenderOpenMenuButton = (state: MenuState) => JSX.Element;

const renderNavbarItem: RenderNavbarItem = ({ href, label, icon}) => (
    <li>
        <Link href={href}>
            <a className={styles.item}>
                <p>
                    <Trans id={label} />
                </p>
                <Icon>{icon}</Icon>
            </a>
        </Link>
    </li>
)

const renderOpenMenuButton: RenderOpenMenuButton = ([ open, setOpen ]) => (
    open
        ? <button
            className={styles.button}
            onClick={() => setOpen(open => !open)}
        >
            <Icon>
                menu_open
            </Icon>
        </button>
        : <button
            className={styles.button}
            onClick={() => setOpen(open => !open)}
        >
            <Icon>
                more_vert
            </Icon>
        </button>
)

export const Navbar = () => {
    const openState = React.useState<boolean>(true)
    const menuItems = navbarMenu.map(renderNavbarItem);

    return (
        <div className={styles.navbar}>
            <div>
                {renderOpenMenuButton(openState)}
            </div>
            <ul className={styles.list}>
                {menuItems}
            </ul>
        </div>
    );
};
