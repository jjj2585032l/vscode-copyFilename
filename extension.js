//Required modules
const vscode = require('vscode');
const clipboardy = require('clipboardy');

//Set error view
const showError = message => vscode.window.showErrorMessage(`Copy filename: ${message}`);
const showWarning = message => vscode.window.setStatusBarMessage(`${message}`, 3000);

exports.activate = context => {

    //Register command
    const copyFilename = vscode.commands.registerCommand('extension.copyFileName', (uri) => {
		if (typeof uri === 'undefined') {
			if (vscode.window.activeTextEditor) {
				uri = vscode.window.activeTextEditor.document.uri;
			}
		}
		if (!uri) {
			vscode.window.showErrorMessage('Cannot copy relative path, as there appears no file is opened (or it is very large');
			return;
		}
        //get the relative url, parse it and take the last part
        let url = vscode.workspace.asRelativePath(uri);
        let urlFormatted = url.replace(/\\/g, '/')
        let lastPart = urlFormatted.split('/').pop();

        //Copy the last part to clipboard
        clipboardy.write(lastPart).then(showWarning(`Filename ${lastPart} has been copied to clipboard`));

    });

    context.subscriptions.push(copyFilename);
}

exports.deactivate = () => { };