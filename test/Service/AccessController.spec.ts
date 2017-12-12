import {AccessController} from "../../src/app/Service/AccessController";

describe('AccessController', () => {

    let action = 'execution1';
    let accessController: AccessController;
    beforeEach(() => {
        AccessController.roles = {};
        accessController       = new AccessController();
    });

    function createRole(name) {
        accessController.createRole(name);
        return accessController.getRole(name);
    }

    let createRoleHierarchy = function (parentName, childName) {
        let role1 = createRole(parentName);
        let role2 = createRole(childName);
        role1.setPermissions({
            [action]      : true,
            [action + '2']: true,
            [action + '3']: false
        });
        role2.setPermission(action, false);
        // must be executed before anything inherits from role2
        role2.inherit(role1);
    };
    describe('Role Creation and Retrieval', () => {
        it('can only allow one role of a single name', () => {
            createRole('test');
            expect(() => {
                createRole('test');
            }).toThrow();
        });
        it('should throw an exception if trying to access a role that does not exist', () => {
            expect(() => accessController.getRole('DOES NOT EXIST')).toThrow();
        });
    });

    describe('Role Inheritance', () => {
        it('should allow inherited access unless denied by child', () => {
            let childName = 'test2';
            createRoleHierarchy('test1', childName);

            let result = accessController.isRoleAuthorized(childName, [action]);
            // inheritance enables allowance for topic1
            expect(result).toBeFalsy();
            result = accessController.isRoleAuthorized(childName, [action + '2']);
            // inheritance ignored due to deny on child role
            expect(result).toBeTruthy();
            // inheritance ignored due to allow on child role
            result = accessController.isRoleAuthorized(childName, [action + '3']);
            expect(result).toBeFalsy();
        });
    });

    describe('Permission Detection', () => {
        it('requester has explicitly allowed topic, and does not contain denied access', () => {
            createRole('test1').setPermission(action, true);
            let result = accessController.isRoleAuthorized('test1', [action]);
            expect(result).toBeTruthy();
        });
        it('requester does NOT have explicitly allowed topic', () => {
            createRole('test2');
            let result = accessController.isRoleAuthorized('test2', [action]);
            expect(result).toBeFalsy();
        });
        it('should deny access if any of the topics are denied', () => {
            let role = accessController.createRole('test6');
            role.setPermissions({
                [action]      : true,
                [action + '2']: false
            });

            let result = accessController.isRoleAuthorized('test6', [action, action + '2']);
            expect(result).toBeFalsy();
        });
    });
});
