var __FN_NAME__ = 'fnC' 
if ((typeof this === 'object') && (System.getObjectClassName(this) == 'Module') && ($_a = [].slice.call(arguments)[0], ($_a && typeof $_a === 'function' && $_a.name === 'String') ? true : false)) return ("var __FN_NAME__ = '" + __FN_NAME__ + "'\n" + this.actionDescriptions.filter(function(e){return e.name === __FN_NAME__})[0].script.split('\n').slice(2).join('\n'))
