import {NgModule} from '@angular/core';
import {AccessController} from "./Service/AccessController";
import {NgCoreModule} from "@ng-app-framework/core";
import {SessionStateWithRole} from "./Service/SessionStateWithRole";
import {Authorizer, NgSessionModule, SessionState} from "@ng-app-framework/session";
import {AuthorizerWithRole} from "./Service/AuthorizerWithRole";
import {RouterModule} from "@angular/router";

@NgModule({
    imports  : [
        NgCoreModule,
        NgSessionModule,
        RouterModule.forRoot([])
    ],
    exports  : [],
    providers: [
        AccessController,
        SessionStateWithRole,
        AuthorizerWithRole,
        {
            provide    : SessionState,
            useExisting: SessionStateWithRole
        },
        {
            provide    : Authorizer,
            useExisting: AuthorizerWithRole
        }
    ]
})
export class AccessModule {

    constructor(sessionState: SessionStateWithRole, authorizer: AuthorizerWithRole) {

    }

}
