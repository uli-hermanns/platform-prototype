import "./polyfills";

import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { ApplicationModule } from "./app/application.module";

platformBrowserDynamic()
  .bootstrapModule(ApplicationModule)
  .then(ref => {
    // Ensure Angular destroys itself on hot reloads.
    if (window["ngRef"]) {
      window["ngRef"].destroy();
    }
    window["ngRef"] = ref;

    // Otherwise, log the boot error
  })
  .catch(err => console.error(err));
