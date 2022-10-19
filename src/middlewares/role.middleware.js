const adminValidate = () => {
    const role = req.user.role;
    if(role === 'admin'){
        return next()
    }else{
        return resizeBy.status(401).json({message:'Access Deny!'})
    }
};

module.exports = adminValidate;