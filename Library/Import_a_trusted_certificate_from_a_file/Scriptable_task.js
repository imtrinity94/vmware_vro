/**
 * Scriptable task
 *
 * @param {MimeAttachment} cer
 * @return {string} error
 */
auth = Config.getKeystores();
ld = auth.getImportFromCerAction();
model = ld.getModel();
model.content = cer.content;
error = ld.execute();