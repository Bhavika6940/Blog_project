
const findAllRecord = async (model) => {
    const dbRes = await model.findAll();
    return dbRes;
}

const createNewRecord = async (data, model) => {
    const dbRes = await  model.create(data);
    return dbRes;
}

const updateRecord = async (id, data, model) => {
    const [updatedCount] = await model.update(data, {
        where : {id}
    });

    if(updatedCount === 0){
        return null;
    }

    const updatedRecord = await model.findByPk(id);
    return updatedRecord;
}

const deleteRecord = async (id, model) => {
    const deletedRowsCount = await model.destroy({
       where : {id} 
     });
    return deletedRowsCount > 0;
}

//Find one record by query
const findOneRecord = async (query, model) => {
    const dbRes = await model.findOne({
        where : query
    });
    return dbRes;
}

const findById = async (id , model) => {
    return await model.findByPk(id);
}


module.exports = {
    findAllRecord,
    createNewRecord,
    updateRecord,
    deleteRecord,
    findOneRecord,
    findById
}
