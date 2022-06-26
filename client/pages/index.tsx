import React from 'react';
import {Button} from "@mui/material";
import Link from "next/link";
import styles from './mainPage.module.scss';
import {Trans} from "@lingui/react";

const MainPage = () => {
    return (
        <div className={styles.titleBlock}>
            <h1 className={styles.title}>
                <Trans id="pages.title"/>
            </h1>
            <Link className={styles.button} href={'/tracks'}>
                <Button
                    variant={"contained"}
                    classes={{
                        root: styles.button,
                    }}
                >
                    <Trans id="pages.start_to_listen" />
                </Button>
            </Link>
        </div>
    );
};

export default MainPage;