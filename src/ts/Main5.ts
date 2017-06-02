
import {EventName} from "./eventname/EventName";
class Main5 {
  constructor() {
    var s = Snap("#svg");

    var path = s.select("#hoge");
    path.animate({d:"M,40,15,C,40,15,69,-38,22,60,C,-25,158,-9,84,82,92"}, 2000);

    const array = Snap.path.toCubic("M229,45l-5-6-2-3-2-3-5-5-5-5A114,114,0,0,0,185,7l-3-2H156l-7,2h-3l-3,2-3,2-3,2-4,5-2,3-2,3h-1v5l-2,6v6a155,155,0,0,0-2,25c0,8,0,17,1,25s1,16,2,25c4,33,10,65,16,96l2,11c-18-11-42-15-66-11-48,8-81,46-75,86s51,64,99,56,79-44,75-81v-4c0-16-1-32-2-48-3-32-7-63-9-93-1-7-1-15-1-22s0-14,0-20a108,108,0,0,1,2-18V59h3V53h15l17,5,20,8h1c3,1,5,1,7-1S234,51,229,45Z");

    console.log("Z");
    for (var j = 0; j < array.length; j++) {
      const segment = array[j];

      for (var i = 0; i < segment.length; i++) {
        if (typeof segment[i] == "number") {
          segment[i] = Math.floor(segment[i]);
        }
      }
      array[j] = segment.join(" ");
    }

    console.log(array.join(" ") + "Z");

    // setTimeout(() => {
    //   /svgField.setAttribute("d", "M40,15S69-38,22,60-9,84,82,92")
    // }, 2000)
  }
}

window.addEventListener(EventName.DOM_CONTENT_LOADED, () => new Main5());

