var AppInjectorService = /** @class */ (function () {
    function AppInjectorService() {
    }
    AppInjectorService.setInjector = function (injector) {
        AppInjectorService.injector = injector;
    };
    AppInjectorService.getInjector = function () {
        return AppInjectorService.injector;
    };
    return AppInjectorService;
}());
export { AppInjectorService };
//# sourceMappingURL=app-injector.service.js.map