import { of } from 'rxjs';
var AppCustomPreloader = /** @class */ (function () {
    function AppCustomPreloader() {
    }
    AppCustomPreloader.prototype.preload = function (route, load) {
        return route.data && route.data.preload ? load() : of(null);
    };
    return AppCustomPreloader;
}());
export { AppCustomPreloader };
//# sourceMappingURL=app-routing-loader.js.map