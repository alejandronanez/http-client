/// <reference path="tsd/browser-sync/browser-sync.d.ts" />
declare module 'connect-history-api-fallback' {
    import {MiddlewareHandler} from "browser-sync";

    function connectHistoryApiFallback(): MiddlewareHandler;
    module connectHistoryApiFallback {}
    export = connectHistoryApiFallback;
}