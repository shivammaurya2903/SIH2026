const Permissions = {
    roles: {
        citizen: [
            "challenge:create",
            "challenge:view-own",
            "challenge:update-own",
            "project:view"
        ],

        government: [
            "challenge:view",
            "challenge:validate",
            "challenge:assign",
            "project:view",
            "analytics:view",
            "district:view"
        ],

        university: [
            "challenge:view-assigned",
            "proposal:create",
            "project:create",
            "project:view-own",
            "team:create",
            "team:manage",
            "milestone:update"
        ],

        industry: [
            "opportunity:view",
            "collaboration:create",
            "project:view",
            "mentorship:create",
            "funding:create"
        ],

        admin: [
            "user:view",
            "user:manage",
            "challenge:view",
            "challenge:manage",
            "project:view",
            "project:manage",
            "analytics:view",
            "system:manage"
        ]
    },

    can(permission) {
        const role = Auth.getRole();

        if (!role) {
            return false;
        }

        return (
            this.roles[role]?.includes(permission) ||
            false
        );
    },

    canAny(permissions) {
        return permissions.some(permission =>
            this.can(permission)
        );
    },

    canAll(permissions) {
        return permissions.every(permission =>
            this.can(permission)
        );
    },

    require(permission) {
        if (!this.can(permission)) {
            Toast.error(
                "You do not have permission to perform this action."
            );

            return false;
        }

        return true;
    },

    isRole(role) {
        return Auth.getRole() === role;
    },

    isCitizen() {
        return this.isRole("citizen");
    },

    isGovernment() {
        return this.isRole("government");
    },

    isUniversity() {
        return this.isRole("university");
    },

    isIndustry() {
        return this.isRole("industry");
    },

    isAdmin() {
        return this.isRole("admin");
    }
};

window.Permissions = Permissions;