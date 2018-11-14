import { OpenSheetMusicDisplay, Cursor, VoiceEntry, Note, StemDirectionType } from "opensheetmusicdisplay";

let osmd: OpenSheetMusicDisplay;

/*
 * Create a container element for OpenSheetMusicDisplay...
 */
let container: HTMLElement = <HTMLElement>document.createElement("div");
/*
 * ... and attach it to our HTML document's body. The document itself is a HTML5
 * stub created by Webpack, so you won't find any actual .html sources.
 */
document.body.appendChild(container);
/*
 * Create a new instance of OpenSheetMusicDisplay and tell it to draw inside
 * the container we've created in the steps before.
 * The second parameter is an IOSMDOptions object.
 * autoResize tells OSMD not to redraw on resize.
 */
osmd = new OpenSheetMusicDisplay(container, {autoResize: false});
osmd.setLogLevel('info');

/*
 * Load our MusicXMl and display it. The file is renamed by Webpack during bundling, it's
 * Muzio Clementi's Sonatina Opus 36 No 1, Part 1, which you can find next to this file.
 */
loadMusicXML("musicXmlSample.xml");

/** Some example code to use OSMD classes after rendering a score. */
function afterRender() {
	let cursor: Cursor = osmd.cursor;
	cursor.show();
	cursor.next();
	const cursorVoiceEntry: VoiceEntry = cursor.Iterator.CurrentVoiceEntries[0];
	const baseNote: Note = cursorVoiceEntry.Notes[0];
	console.log("Stem direction of VoiceEntry under Cursor: " + StemDirectionType[cursorVoiceEntry.StemDirection]);
	console.log("base note of Voice Entry at second cursor position: " + baseNote.Pitch.ToString());

	osmd.setOptions( { autoResize: true });
}

/**
 * Load a MusicXml file via xhttp request, and display its contents.
 */
function loadMusicXML(url: string) {
   var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function () {
	   switch (xhttp.readyState) {
	      case 0 : // UNINITIALIZED
	      case 1 : // LOADING
	      case 2 : // LOADED
	      case 3 : // INTERACTIVE
	      break;
	      case 4 : // COMPLETED
	      	osmd
				.load(xhttp.responseXML)
				.then(
					() => {
						osmd.render();
						afterRender();
					},
					(err) => console.log(err)
				);
	      	break;
	      default:
	      	throw("Error loading MusicXML file.");
	   }
	}
   xhttp.open("GET", url, true);
   xhttp.send();
 }
