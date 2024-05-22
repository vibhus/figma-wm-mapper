// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

// This shows the HTML page in "ui.html".
import {COMPONENT, Mapper} from "./mapper/Mapper";

figma.showUI(__html__);

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage =  (msg: {type: string, count: number}) => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.

  let comp: InstanceNode;
  let data: string|undefined;
  switch(msg.type) {
    case 'translate-btn':
      console.log('translating', figma.currentPage);
      // Get the button (temp logic)
      comp = figma.currentPage.selection[0] as InstanceNode;
      // the button component is identified.
      // map this button to wm button
      data = mapButton(comp);
      console.log(data);
      break;
    case 'translate-text':
      console.log('translating', figma.currentPage);
      // Get the button (temp logic)
      comp = figma.currentPage.selection[0] as InstanceNode;
      // the button component is identified.
      // map this button to wm button
      data = mapText(comp);
      console.log(data);
      break;
  }
  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  //figma.closePlugin();
};

const mapButton = (btnComp: InstanceNode) => {
  const mapperEngine = new Mapper();
  return mapperEngine.map(btnComp, COMPONENT.BUTTON);
}
const mapText = (comp: InstanceNode) => {
  const mapperEngine = new Mapper();
  return mapperEngine.map(comp, COMPONENT.TEXT);
}


/**
 * Approach:
 * - Component identified as Button: Get a button form the currentPage.
 * - Map component to WM button: Call your function to find mapper for this button
 * - Mapper engine: Write logic to translate this component to WM button markup through the mapper engine.
 */
