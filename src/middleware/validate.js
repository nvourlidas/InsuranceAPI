
const post_validator = (req,res,next) =>{
    const { name, surname, email, cellphone, phone, gender, postcode, property, birthday,afm } = req.body;
        
    if (typeof name !== 'string' ||typeof surname !== 'string' ||typeof email !== 'string' ||typeof cellphone !== 'string' ||typeof phone !== 'string' ||
        typeof gender !== 'string' ||
        typeof postcode !== 'number' ||
        typeof property !== 'string' ||
        typeof afm !== 'string') {
        res.status(400).send('Invalid data types');
        return;
    }
    req.name=name
    req.surname=surname
    req.email=email
    req.cellphone=cellphone
    req.phone=phone
    req.gender=gender
    req.postcode=postcode
    req.property=property
    req.birthday=birthday
    req.afm=afm
    next()
}

const update_validator =(req,res,next)=>{
    const { name, surname, email, cellphone, phone, gender, postcode, property, birthday,afm } = req.body;  
}

module.exports= {post_validator,update_validator}