const categoryModel = require("../models/categoryModel");

//create category
exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).send({ success: false, message: "Name is required" });
        }
        //check category name is already exit or not
        const exitingCateogry = await categoryModel.findOne({ name });
        if (exitingCateogry) {
            return res.status(400).send({ success: false, message: "Category Already Exit" });
        }

        //saving new category
        const newCategory = await categoryModel.create({ name });
        return res.status(201).send({ success: true, message: "Category Created !", newCategory });

    } catch (error) {
        return res.status(500).send({ success: false, message: "Interanl Server Error" });
    }

}


//getallCategory 
exports.getAllCategory = async (req, res) => {
    try {
        const allCategory = await categoryModel.find();
        if (!allCategory) {
            return res.status(400).send({ success: false, message: "Category Not Found !" });
        }
        return res.status(200).send({ success: true, message: "Category Fetched !", allCategory })
    } catch (error) {
        return res.status(500).send({ success: false, message: "Internal Server Error" });

    }
}

//update Category 
exports.updateCateogry = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const updateCategory = await categoryModel.findByIdAndUpdate(id, { name }, { new: true });
        return res.status(200).send({ success: true, message: "Category Updated !", updateCategory })

    } catch (error) {
        return res.status(500).send({ success: false, message: "Error while updating Category" });
    }
}

//delete Category 
exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const delteCategory = await categoryModel.findByIdAndDelete(id);
        return res.status(200).send({ success: true, message: "Category Delted !" });

    } catch (error) {
        return res.status(500).send({ success: false, message: "Error while deleting Category" });

    }

}





