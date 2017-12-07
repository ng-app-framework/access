import {Role} from "../../src/app/Service/Role";
describe('Role', () => {

    it('should return true when a permission is provided and is set to true', () => {
        let role                            = new Role('test');
        role.setPermissions({
            'test permission': true,
            'test failure': false
        });

        expect(role.isAuthorizedForAction('test permission')).toBeTruthy();
        expect(role.isAuthorizedForAction('test failure')).toBeFalsy();
        expect(role.isAuthorizedForAction('nonexistent permission')).toBeFalsy();
    });

    it('should return true when all permissions are authorized', () => {
        let role                                   = new Role('test');
        role.setPermissions({
            'test permission': true,
            'test second permission': true,
            'test failure': false
        });
        expect(role.isAuthorizedForActions(['test failure'])).toBeFalsy();
        expect(role.isAuthorizedForActions(['test permission', 'test failure'])).toBeFalsy();
        expect(role.isAuthorizedForActions(['test permission', 'test second permission'])).toBeTruthy();
        expect(role.isAuthorizedForActions(['test permission'])).toBeTruthy();
    });

    it('should inherit and override permissions only when the role executed on does not have the permission set', () => {
        let role1         = new Role('Inherit Me');
        let role2         = new Role('Inherit The Other One');
        role1.setPermissions({
            'test success'        : true,
            'test failure'        : false,
            'test inherit failure': true
        });
        role2.setPermissions({
            'test inherit failure': false
        });

        role2.inherit(role1);
        expect(role2.getPermission('test success')).toBeTruthy();
        expect(role2.getPermission('test failure')).toBeFalsy();
        expect(role2.getPermission('test inherit failure')).toBeFalsy();

    })
});
