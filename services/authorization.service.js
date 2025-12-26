const isAdmin = (user) => {
    return user.role === "admin";
};

const isAuthor = (user) => {
    return user.role === "author";
};

const hasPermission = (user, permsission) => {
    if(!user) return false;
    
    if(isAdmin(user)) return true;

    return user.permsissions?.[permsission] === true;

};
// Ownership check
const ownsRecord = (user, record, ownerField = "userId") => {
    return record[ownerField] === user.id;
};


//Action-based permissions
const canCreate = (user) => (user, "canCreate");

const canRead = (user , record) => {
    if(isAdmin(user)) return true;
    return hasPermission(user, "canRead") && ownsRecord(user, record);
};

const canEdit = (user, record) => {
    if(isAdmin(user)) return true;
    return hasPermission(user, "canEdit") && ownsRecord(user , record);
};



const canDeleteRecord = async( user, record , ownerField = "userId") => {

    if(!user || !record) return false;
    if(isAdmin(user)){
        return record[ownerField] === user.id;
    }

    if(isAuthor(user)){
        return record[ownerField] === user.id;
    }

    return false;
};

module.exports = {
    canCreate,
    canRead,
    canEdit,
    isAdmin,
    isAuthor,
    canDeleteRecord
};