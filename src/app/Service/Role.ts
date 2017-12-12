import {Value} from "@ng-app-framework/core";

export class Role {

    protected permissions: { [key: string]: boolean } = {};

    protected inheritedFrom: Role = null;

    constructor(public name: string) {
    }

    setPermissions(permissions: { [key: string]: boolean }) {
        for (let key in permissions) {
            if (Value.isProvided(permissions[key])) {
                this.setPermission(key, permissions[key]);
            }
        }
    }

    setPermission(key: string, value: boolean) {
        this.permissions[key] = value;
    }

    getPermission(key: string) {
        if (Value.isProvided(this.permissions[key])) {
            return this.permissions[key];
        }
        return false;
    }

    hasPermissionSet(key: string) {
        return Value.isProvided(this.permissions[key]);
    }

    isAuthorizedForAction(action: string) {
        return this.getPermission(action);
    }

    isAuthorizedForActions(actions: string[]) {
        for (let action of actions) {
            if (!this.isAuthorizedForAction(action)) {
                return false;
            }
        }
        return true;
    }

    inherit(role: Role) {
        this.inheritedFrom = role;
        for (let permission in role.permissions) {
            if (role.hasPermissionSet(permission) && !this.hasPermissionSet(permission)) {
                this.setPermission(permission, role.getPermission(permission));
            }
        }
    }
}
