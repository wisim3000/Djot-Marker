// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { commands, Range, ExtensionContext, window } from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated

	context.subscriptions.push(
		commands.registerCommand('djot-marker.setHeadingLevel', args => setHeadingLevel(args["level"]))
	);
}

// This method is called when your extension is deactivated
export function deactivate() { }

async function setHeadingLevel(level: number) {
	const editor = window.activeTextEditor!;
	const lineIndex = editor.selection.active.line;
	const lineText = editor.document.lineAt(lineIndex).text;

	return await editor.edit((editBuilder) => {
		if (lineText.startsWith("#".repeat(level) + " ")) {
			return;
		};

		let end = 0;
		const headMarker = lineText.match("^#*\\s*")
		if (headMarker) {
			end = headMarker[0].length;
		};

		if (level === 0) {
			editBuilder.replace(new Range(lineIndex, 0, lineIndex, end), "");
		} else {
			editBuilder.replace(new Range(lineIndex, 0, lineIndex, end), '#'.repeat(level) + " ");
		}

	});
}