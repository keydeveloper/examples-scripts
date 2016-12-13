/*
 * INSTALLATION: Copy the JavaCodeGen.* files to <user>\KeyDeveloper\scripting\taskplugins
 *
 * SAMPLE: Task plugin that generates Java interfaces given a model. This can
 * be extended to generate domain model classes for entities by expanding
 * the "stg" file.
 *
 * This sample is StringTemplate based (set template to "Java.stg" in KeyDeveloper's task property editor)
 */

// Set active model using the model name property, as set by the user
var props = current.getTaskExecutor().getProperties();
current.setActiveModel(props.get("javagen.modelname"));

var templateFile = props.get("javagen.template");
var rootPackage = props.get("javagen.rootpackage");
var output = props.get("javagen.outputdirectory");

// File utilities
var gen = current.getGenerator();
gen.createDirectory(output);

// Apply template to each interface
template = current.getTemplateEngine();
template.applyToInterfaces(current.getVisualModel().getMetaModel(), templateFile, function(obj, content) {
	
	var pck = rootPackage + "." + obj.getAnnotations().getPackageName();
	var pckDir = gen.packageToDirectory(pck);

	gen.createDirectory(output+"/"+pckDir);
	gen.writeFile(output+"/"+pckDir+"/"+obj.getName()+".java", content);

    // Uncomment to show file content in output pane
	//current.writeOutput("Content for " + pck + " => "+content);
});
