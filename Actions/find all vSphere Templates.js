// no inputs, just run!
var vms = VcPlugin.allVirtualMachines;
var templates = []; // templates will be stored into this array
for each (var vm in vms) {
  if (vm.config != null && vm.config.template) {
    templates.push(vm);
  }
}
// iterate over all found templates and print their names
for each (var t in templates) {
  System.log("template -> " + t.name);
}
