import {Injectable} from "@angular/core";
import {SessionState} from "@ng-app-framework/session";
import {Roles} from "../Constant/Roles";

@Injectable()
export class SessionStateWithRole extends SessionState {

    static DEFAULT_ROLE = Roles.GUEST;

    role: string = SessionStateWithRole.DEFAULT_ROLE;

    saveFromResponse(data: any) {
        super.saveFromResponse(data);
        this.update({
            role: data.role || ''
        });
    }

    initialize() {
        super.initialize();
        this.role = SessionStateWithRole.DEFAULT_ROLE;
    }
}
