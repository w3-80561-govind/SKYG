const express = require('express')
const gotoAddSubCategory = require('./subcategory/Addsubcategory')
const gotoAllSubCategory = require('./subcategory/Allsubcategory')
const gotoBlockSubCategory = require('./subcategory/Blocksubcategory')
const gotoSubCategoryByCategoryId = require('./subcategory/Subcategorybycategoryid')
const app = express.Router();

app.use('/addsubcategory',gotoAddSubCategory);
app.use('/allsubcategory',gotoAllSubCategory);
app.use('/blocksubcategory',gotoBlockSubCategory);
app.use('/bycategory',gotoSubCategoryByCategoryId);

module.exports = app;