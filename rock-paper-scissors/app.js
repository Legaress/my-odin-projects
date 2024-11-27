import { RockPaperScissorsModel } from "./src/rock-paper-scissors-model.js";
import { RockPaperScissorsView } from "./src/rock-paper-scissors-view.js";
import { RockPaperScissorsController } from "./src/rock-paper-scissors-controller.js";

// Instantiate MVC components
const model = new RockPaperScissorsModel();
const view = new RockPaperScissorsView();
const controller = new RockPaperScissorsController(model, view);