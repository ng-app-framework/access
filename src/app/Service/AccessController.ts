import {Role} from "./Role";
import {Injectable} from "@angular/core";
import {Value} from "@ng-app-framework/core";

@Injectable()
export class AccessController {

    static roles: { [name: string]: Role } = {};

    createRole(name: string) {
        this.assertRoleDoesNotExist(name);
        AccessController.roles[name] = new Role(name);
        return AccessController.roles[name];
    }

    isRoleAuthorized(roleName: string, actions: string[]) {
        this.assertRoleExists(roleName);
        return AccessController.roles[roleName].isAuthorizedForActions(actions);
    }

    getRole(name: string) {
        this.assertRoleExists(name);
        return AccessController.roles[name];
    }

    protected assertRoleExists(roleName: string) {
        if (!Value.isProvided(AccessController.roles[roleName])) {
            throw new Error(`Role '${roleName}' does not exist.`);
        }
    }

    protected assertRoleDoesNotExist(roleName: string) {
        if (Value.isProvided(AccessController.roles[roleName])) {
            throw new Error(`Role '${roleName}' exists.`);
        }
    }
}
