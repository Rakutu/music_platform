import Link from 'next/link';
import { useRouter } from 'next/router';
import { t } from '@lingui/macro';
import React from 'react';
import { Icon } from '@mui/material';
import styles from '../Navbar/navbar.module.scss';

interface Props {
	className?: string;
}

type AvailableLanguageNames = (locale: string | undefined) => string;

const availableLanguageNames: AvailableLanguageNames = (locale) => {
	if (locale === 'ru') return t`Russian`;

	return t`Английский`;
};

export const LangSwitcher: React.FC<Props> = (props) => {
	const { className } = props;
	const { locale, locales, route } = useRouter();
	const otherLocale = locales?.find((cur) => cur !== locale);

	return (
		<Link href={route} locale={otherLocale}>
			<a className={className}>
				{availableLanguageNames(otherLocale)}
				<Icon className={styles.icon}>language</Icon>
			</a>
		</Link>
	);
};
