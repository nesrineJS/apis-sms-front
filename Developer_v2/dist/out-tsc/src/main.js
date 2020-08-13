import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { AppInjectorService } from './app/_services';
if (environment.production) {
    enableProdMode();
}
platformBrowserDynamic().bootstrapModule(AppModule)
    .then(function (moduleRef) {
    AppInjectorService.setInjector(moduleRef.injector);
})
    .catch(function (err) { return console.error(err); });
//# sourceMappingURL=main.js.map