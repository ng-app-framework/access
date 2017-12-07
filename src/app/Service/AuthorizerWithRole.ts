import {Authorizer} from "@ng-app-framework/session";
import {Injectable} from "@angular/core";
import {Session} from "@ng-app-framework/session";
import {Router} from "@angular/router";
import {AccessController} from "./AccessController";
import {SessionStateWithRole} from "./SessionStateWithRole";

@Injectable()
export class AuthorizerWithRole extends Authorizer {

    constructor(public accessController: AccessController, public sessionState: SessionStateWithRole, public session: Session, public router: Router) {
        super(session, router);
    }

    isAuthorized(permissions: string[] = ['loggedIn']) {
        return this.accessController.isRoleAuthorized(this.sessionState.role, permissions);
    }
}
