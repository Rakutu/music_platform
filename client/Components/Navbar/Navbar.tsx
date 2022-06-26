import React from 'react';
import Link from "next/link";
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import {Trans} from "@lingui/react";


export const Navbar = (props) => {
    return (
        <ul>
            <li>
                <Link href={'favorites'}>
                    <a>
                        <p>
                            <Trans id="components.navbar@my_music" />
                        </p>
                        <LibraryMusicIcon
                            color={'action'}
                        />
                    </a>
                </Link>
            </li>
        </ul>
    );
}