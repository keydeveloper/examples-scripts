/* 
 * INSTALLATION: Copy the ListTables.* files to <user>\KeyDeveloper\scripting\taskplugins
 *
 * SAMPLE: Task plugin that write database object names to file 
 */

var props = current.getTaskExecutor().getProperties();
current.setActiveModel(props.get("listplugin.modelname"));

var commaSep = props.get("listplugin.commaseparated");
var prefix = props.get("listplugin.prefix");
var filename = props.get("listplugin.filename");

// Use a default filename if missing
if (!filename)
{
	filename = "tables.txt";
}

// Make sure the model references in the properties actually exists
if (current.getVisualModel() == null)
{
	current.getTaskExecutor().getStatus().addError(
		"Could not find model: '" + props.get("listplugin.modelname") + "'");
}
else
{
	var output = "";

	for each (obj in current.getVisualModel().getMetaModel().getObjects())
	{
		output += prefix + obj.name;

		if (commaSep === true)
			output += ","
		else
			output += "\n";
	}

	// Write result relative to the project content directory, unless an absolute path was given
	gen = current.getGenerator();
	gen.writeFile(filename, output);
}
