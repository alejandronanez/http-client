import {argv} from 'yargs';

export const ENV      = argv['env'] || 'dev';
export const DEBUG    = argv['debug'] || false;
export const PORT     = argv['port'] || 5555;
export const APP_BASE = argv['base'] || '/';

export const APP_SRC   = 'src';
export const TOOLS_DIR = 'tools';
export const ASSET_SRC = `${APP_SRC}/asset`;
export const APP_DEST  = `dist/${ENV}`;
export const CSS_DEST  = `${APP_DEST}/asset`;
export const LIB_DEST  = `${APP_DEST}/lib`;

// declare local files that needs to be injected
export const APP_ASSETS = [
    { src: `${CSS_DEST}/guardian.css`, inject: 'app', dest: CSS_DEST }
];

export const DEPENDENCIES = APP_ASSETS;
