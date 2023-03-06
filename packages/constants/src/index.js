export const roles = ["admin", "seller", "buyer"].reduce((acc, role) => {
    acc[role] = role;
    return acc;
}, {});