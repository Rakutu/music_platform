import React from 'react';
import Link from 'next/link';
import { Trans } from '@lingui/react';
import { NavItem } from './navbar.types';
import { navbarMenu } from './navbar.constants';
import { Icon } from '@mui/material';
import styles from './navbar.module.scss';
import classNames from 'classnames';
import { LangSwitcher } from '../LangSwitcher';

type MenuState = [
	open: boolean,
	setOpen: React.Dispatch<React.SetStateAction<boolean>>,
];

type RenderNavbarItem = (item: NavItem) => JSX.Element;

type RenderOpenMenuButton = (state: MenuState) => JSX.Element;

const renderNavbarItem: RenderNavbarItem = ({ href, label, icon }) => (
	<li>
		<Link href={href}>
			<a className={styles.item}>
				<p>
					<Trans id={label} />
				</p>
				<Icon className={styles.icon}>{icon}</Icon>
			</a>
		</Link>
	</li>
);

const renderOpenMenuButton: RenderOpenMenuButton = ([open, setOpen]) => {
	const buttonClassname = classNames(styles.button, styles.openButton);

	if (open)
		return (
			<button
				className={buttonClassname}
				onClick={() => setOpen((open) => !open)}
			>
				<Icon>menu_open</Icon>
			</button>
		);

	return (
		<button
			className={buttonClassname}
			onClick={() => setOpen((open) => !open)}
		>
			<Icon>more_vert</Icon>
		</button>
	);
};

export const Navbar = () => {
	const openState = React.useState<boolean>(false);
	const menuItems = navbarMenu.map(renderNavbarItem);
	const langSwitcherClassName = classNames(
		styles.button,
		styles.langButton,
		styles.item,
	);
	const [isOpen] = openState;

	const rootClassname = classNames(styles.navbar, {
		[styles.navbarOpen]: isOpen,
	});

	return (
		<div className={rootClassname}>
			<div>{renderOpenMenuButton(openState)}</div>
			<ul className={styles.list}>{menuItems}</ul>
			<LangSwitcher className={langSwitcherClassName} />
		</div>
	);
};
