import {NgModule} from '@angular/core';
import {AccessController} from "./Service/AccessController";
import {CoreModule} from "@ng-app-framework/core";

@NgModule({
    imports  : [
        CoreModule
    ],
    exports  : [],
    providers: [
        AccessController
    ]
})
export class AccessModule {

}

