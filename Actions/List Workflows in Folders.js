var arrWorkflowCategory;
arrWorkflowCategory = new Array();

var arrAllWorkflowCategory;
arrAllWorkflowCategory = Server.getAllWorkflowCategories();

for ( var i = 0; i < arrAllWorkflowCategory.length; i++ )
{
var objWorkflowCategory;
objWorkflowCategory = arrAllWorkflowCategory[i];

var strWorkflowCategoryName;
strWorkflowCategoryName = objWorkflowCategory.name;

if ( strWorkflowCategoryName.search(" - ") > -1 )
{
System.log("Workflow Category Name: " + objWorkflowCategory.name);

arrWorkflowCategory.push(objWorkflowCategory);
}
}

return arrWorkflowCategory;
