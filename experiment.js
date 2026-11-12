/*
Hearts & Flowers Task for Pavlovia / jsPsych 7.1.2
Author: generated for the user's H&F PsychoPy/Pavlovia deployment

Folder rule: put all instruction images and stimulus images in ./resources/
Main required image names are listed in resources/PLACE_IMAGES_HERE.txt
*/

/***********************
 * 1. EDITABLE CONFIG  *
 ***********************/
// Version note (2026-08-07 v7 practice update):
// 1) Timed trials: 250 ms fixation + 250 ms blank + 750 ms stimulus + 250 ms intertrial blank.
// 2) RT starts at stimulus onset; the response window is 750 + 250 = 1000 ms.
// 3) First-stage feedback practice remains 4 items; errors only repeat that item and do NOT change stage-2 length.
// 4) Second-stage practice has 4 fixed base trials. Each stage-2 error (wrong key OR no response) adds 1 random extra trial, up to 4 extras (maximum 8 trials per attempt).
// 5) Four consecutive no-response stage-2 trials trigger a reminder slide, then the stage-2 start instructions are shown again and a fresh 4-trial attempt begins.
// 6) Added practice_1_1/practice_2_1 start slides and practice_1_2/practice_2_2 no-response reminder slides.
// 7) ESC behavior and Pavlovia/local data handling remain unchanged.

const RESOURCE_DIR = "resources/";

// Timing: edit here if your lab has fixed durations.
const TIMING = {
  fixationMs: 250,
  preBlankMs: 250,
  stimulusMs: 750,
  postBlankMs: 250,
  // true = go to the next section immediately after the first S/L response.
  // false = keep the formal trial on screen for the full 250+250+750+250 = 1500 ms.
  // Keyboard listening starts when the stimulus appears, so the formal RT window is 750+250 = 1000 ms.
  responseEndsTrial: false,
};

// Keys: S = left, L = right.
const LEFT_KEY = "s";
const RIGHT_KEY = "l";

// Stimulus images. Rename your files to these names or change them here.
const STIM_IMAGES = {
  heart: RESOURCE_DIR + "heart.png",
  flower: RESOURCE_DIR + "flower.png",
};

// Instruction images. Export PPT slides as PNG/JPG, put them in resources/, and rename as below.
// If a listed image is missing, the experiment still shows a text fallback, but the visual slide will be blank.
const GUIDE = {
  mixedStart: ["p38_updated.png"],
  welcome: ["p01.png"],
  heartRules: ["p02.png", "p03.png", "p04.png"],

  // Stage-2 Heart practice start pages, shown in this order.
  heartPractice2Start: ["practice_1.png", "practice_1_1.png"],
  // Shown only after four consecutive stage-2 no-response trials.
  heartPractice2NoResponse: ["practice_1_2.png"],

  heartStart: ["p11.png"],
  doneBlock1: ["p16.png"],

  flowerRules: ["p17.png", "p18.png", "p19.png"],

  // Stage-2 Flower practice start pages, shown in this order.
  flowerPractice2Start: ["practice_2.png", "practice_2_1.png"],
  // Shown only after four consecutive stage-2 no-response trials.
  flowerPractice2NoResponse: ["practice_2_2.png"],

  flowerStart: ["p26.png"],
  doneBlock2: ["p31.png"],
  flowerAgain: ["p32.png", "p33.png"],
  doneBlock3: ["p34.png"],
  heartAgain: ["p35.png", "p36.png"],
  end: ["p37.png"],
};

// Practice feedback images from PPT.
const PRACTICE_FEEDBACK_IMAGES = {
  heart: {
    wrong: "p09.png",
    correct: "p10.png",
  },
  flower: {
    wrong: "p25.png",
    correct: "p24.png",
  },
};
// Practice correct feedback stays on screen briefly, then auto-advances.
const PRACTICE_CORRECT_FEEDBACK_MS = 750;


// Practice trials: pictures wait for response; wrong response repeats the same practice item.
// Change to fewer/more trials if needed.
const PRACTICE = {
  heart: ["con_R", "con_L", "con_R", "con_L"],
  flower: ["incon_L", "incon_R", "incon_L", "incon_R"],
};

// Second-stage practice:
// - Runs after each first-stage feedback practice.
// - No feedback is shown. Timing is identical to formal trials.
// - Heart first four stimulus positions are fixed as LRRL.
// - Flower first four stimulus positions are fixed as RRLL.
// - ONLY stage-2 errors affect stage-2 length.
// - Each wrong key OR no response adds one random extra trial, up to 4 extras.
// - Four consecutive no-response trials trigger a reminder and a complete restart of stage 2.
const SECOND_PRACTICE_FIXED_SIDES = {
  heart: ["L", "R", "R", "L"],
  flower: ["R", "R", "L", "L"],
};
const SECOND_PRACTICE_MAX_EXTRA_TRIALS = 4;
const SECOND_PRACTICE_NO_RESPONSE_RESTART_STREAK = 4;
const SECOND_PRACTICE_STATE = {
  heart: {
    sequence: [], index: 0, extraAdded: 0, noResponseStreak: 0,
    attempt: 0, restartCount: 0, restartPending: false, globalTrialNo: 0,
  },
  flower: {
    sequence: [], index: 0, extraAdded: 0, noResponseStreak: 0,
    attempt: 0, restartCount: 0, restartPending: false, globalTrialNo: 0,
  },
};

// Six predefined formal sequences from the experiment procedure.
const SEQUENCES = {
  h1: ["con_R","con_L","con_L","con_R","con_R","con_L","con_R","con_R","con_L","con_L","con_L","con_R"],
  h2: ["con_L","con_R","con_R","con_L","con_L","con_L","con_R","con_L","con_R","con_R","con_L","con_R"],
  h3: ["con_L","con_L","con_R","con_R","con_L","con_R","con_R","con_L","con_R","con_L","con_L","con_R"],
  h4: ["con_R","con_R","con_L","con_L","con_R","con_L","con_L","con_L","con_R","con_L","con_R","con_R"],
  h5: ["con_L","con_L","con_R","con_R","con_L","con_R","con_L","con_R","con_R","con_L","con_R","con_L"],
  h6: ["con_R","con_L","con_L","con_L","con_R","con_L","con_R","con_R","con_L","con_R","con_L","con_R"],

  f1: ["incon_R","incon_L","incon_L","incon_R","incon_R","incon_L","incon_R","incon_R","incon_L","incon_L","incon_L","incon_R"],
  f2: ["incon_L","incon_R","incon_R","incon_L","incon_L","incon_L","incon_R","incon_L","incon_R","incon_R","incon_L","incon_R"],
  f3: ["incon_L","incon_L","incon_R","incon_R","incon_L","incon_R","incon_R","incon_L","incon_R","incon_L","incon_L","incon_R"],
  f4: ["incon_R","incon_R","incon_L","incon_L","incon_R","incon_L","incon_L","incon_L","incon_R","incon_L","incon_R","incon_R"],
  f5: ["incon_L","incon_L","incon_R","incon_R","incon_L","incon_R","incon_L","incon_R","incon_R","incon_L","incon_R","incon_L"],
  f6: ["incon_R","incon_L","incon_L","incon_L","incon_R","incon_L","incon_R","incon_R","incon_L","incon_R","incon_L","incon_R"],

    // Mixed blocks: hearts = con; flowers = incon.
  // m1/m4, m2/m5, and m3/m6 are identical pairs.
  m1: [
    "con_R","con_R","incon_R","con_R","incon_R","con_L","incon_R",
    "con_R","con_R","con_L","incon_L","incon_R","incon_L","con_L",
    "incon_L","con_L","incon_L","incon_R","incon_L","con_L","con_R",
    "incon_R","incon_L","con_L","con_R","incon_R","incon_L","con_L",
    "con_R","con_L","incon_L","incon_R","incon_L","con_R","con_L",
    "incon_R","incon_L","con_R","con_L","incon_R","incon_R","con_L",
    "incon_L","con_R","incon_L","con_R","incon_L","incon_R","con_L"
  ],

  m2: [
    "con_R","incon_R","con_R","incon_R","con_L","incon_R","incon_L",
    "con_L","incon_L","con_R","con_L","incon_L","con_R","incon_L",
    "con_R","con_L","con_R","incon_L","incon_R","incon_L","con_L",
    "con_R","incon_R","incon_L","con_L","con_L","con_R","con_L",
    "con_R","incon_L","con_L","incon_R","incon_L","con_R","con_R",
    "incon_R","incon_L","con_L","con_R","incon_R","con_R","incon_L",
    "con_L","incon_R","incon_L","con_R","incon_R","incon_L","con_L"
  ],

  m3: [
    "con_L","incon_L","con_L","con_R","con_L","incon_R","con_R",
    "incon_L","incon_R","incon_L","con_R","con_R","con_L","incon_R",
    "incon_L","incon_L","con_R","con_L","con_R","incon_L","con_L",
    "incon_L","con_L","incon_L","incon_R","con_R","con_R","incon_L",
    "incon_R","incon_R","con_L","con_R","incon_L","incon_R","con_L",
    "con_R","con_R","incon_R","con_L","incon_R","con_R","incon_R",
    "con_R","con_L","incon_R","incon_L","con_L","incon_R","con_L"
  ],

  m4: [
    "con_R","con_R","incon_R","con_R","incon_R","con_L","incon_R",
    "con_R","con_R","con_L","incon_L","incon_R","incon_L","con_L",
    "incon_L","con_L","incon_L","incon_R","incon_L","con_L","con_R",
    "incon_R","incon_L","con_L","con_R","incon_R","incon_L","con_L",
    "con_R","con_L","incon_L","incon_R","incon_L","con_R","con_L",
    "incon_R","incon_L","con_R","con_L","incon_R","incon_R","con_L",
    "incon_L","con_R","incon_L","con_R","incon_L","incon_R","con_L"
  ],

  m5: [
    "con_R","incon_R","con_R","incon_R","con_L","incon_R","incon_L",
    "con_L","incon_L","con_R","con_L","incon_L","con_R","incon_L",
    "con_R","con_L","con_R","incon_L","incon_R","incon_L","con_L",
    "con_R","incon_R","incon_L","con_L","con_L","con_R","con_L",
    "con_R","incon_L","con_L","incon_R","incon_L","con_R","con_R",
    "incon_R","incon_L","con_L","con_R","incon_R","con_R","incon_L",
    "con_L","incon_R","incon_L","con_R","incon_R","incon_L","con_L"
  ],

  m6: [
    "con_L","incon_L","con_L","con_R","con_L","incon_R","con_R",
    "incon_L","incon_R","incon_L","con_R","con_R","con_L","incon_R",
    "incon_L","incon_L","con_R","con_L","con_R","incon_L","con_L",
    "incon_L","con_L","incon_L","incon_R","con_R","con_R","incon_L",
    "incon_R","incon_R","con_L","con_R","incon_L","incon_R","con_L",
    "con_R","con_R","incon_R","con_L","incon_R","con_R","incon_R",
    "con_R","con_L","incon_R","incon_L","con_L","incon_R","con_L"
  ],
};

const DATA_COLUMNS = [
  "SubjectID", "Experiment", "BlockNo", "BlockOrder", "TrialNo", "TrialType", "IsTrial",
  "TrialName", "PseudoSequence", "StimSide", "ExpRes", "Congruent",
  "Response", "Correct", "Error", "NoResponse", "ResponseOutcome", "RT", "ResponseKey",
  "PracticeAttempt",
  "SecondPracticeAttempt", "SecondPracticeGlobalTrialNo", "SecondPracticeIsExtra",
  "SecondPracticeExtraAddedThisTrial", "SecondPracticeExtraAddedTotal", "SecondPracticePlannedTotal",
  "SecondPracticeNoResponseStreak", "SecondPracticeRestartTriggered", "SecondPracticeRestartCount",
  "DateTime", "BrowserUserAgent"
];

/*****************************
 * 2. CUSTOM H&F TRIAL PLUGIN *
 *****************************/
const jsPsychHFTrial = (function(jspsych) {
  const info = {
    name: "hf-trial",
    parameters: {
      stimulus: { type: jspsych.ParameterType.IMAGE, default: undefined },
      side: { type: jspsych.ParameterType.INT, default: 1 },
      choices: { type: jspsych.ParameterType.KEYS, default: ["s", "l"] },
      fixation_duration: { type: jspsych.ParameterType.INT, default: 250 },
      pre_blank_duration: { type: jspsych.ParameterType.INT, default: 250 },
      stimulus_duration: { type: jspsych.ParameterType.INT, default: 750 },
      post_blank_duration: { type: jspsych.ParameterType.INT, default: 250 },
      response_ends_trial: { type: jspsych.ParameterType.BOOL, default: false },
      wait_for_response: { type: jspsych.ParameterType.BOOL, default: false },
    },
  };

  class HFTrialPlugin {
    constructor(jsPsych) {
      this.jsPsych = jsPsych;
    }

    trial(display_element, trial) {
      let responded = false;
      let response = { rt: null, key: null };
      let keyboardListener = null;
      let trialEnded = false;
      const jsPsych = this.jsPsych;

      function renderFrame(contentHtml = "") {
        display_element.innerHTML = `<div class="hf-screen"><div class="hf-frame">${contentHtml}</div></div>`;
      }

      function renderFixation() {
     renderFrame(`<div class="fixation" style="font-size:48px; font-weight:bold; line-height:1;">+</div>`);
      }

      function renderBlank() {
        renderFrame("");
      }

      function renderStimulus() {
        const currentSide = typeof trial.side === "function" ? trial.side() : trial.side;
        const currentStimulus = typeof trial.stimulus === "function" ? trial.stimulus() : trial.stimulus;
        const sideClass = Number(currentSide) === 1 ? "left" : "right";
       renderFrame(`<img class="hf-stim ${sideClass}" src="${currentStimulus}" alt="stimulus">`);
      }
      function startKeyboard() {
        keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
          callback_function: function(info) {
            if (!responded) {
              responded = true;
              response = info;
              if (trial.response_ends_trial) {
                endTrial();
              }
            }
          },
          valid_responses: trial.choices,
          rt_method: "performance",
          persist: false,
          allow_held_key: false,
        });
      }

      function endTrial() {
        if (trialEnded) return;
        trialEnded = true;
        jsPsych.pluginAPI.clearAllTimeouts();
        if (keyboardListener !== null) {
          jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
        }
        const trialData = {
          rt: response.rt,
          response: response.key,
        };
        display_element.innerHTML = "";
        jsPsych.finishTrial(trialData);
      }

      if (trial.wait_for_response) {
        renderStimulus();
        startKeyboard();
        return;
      }

      renderFixation();
      jsPsych.pluginAPI.setTimeout(renderBlank, trial.fixation_duration);
      jsPsych.pluginAPI.setTimeout(function() {
        renderStimulus();
        startKeyboard();
      }, trial.fixation_duration + trial.pre_blank_duration);
      jsPsych.pluginAPI.setTimeout(renderBlank, trial.fixation_duration + trial.pre_blank_duration + trial.stimulus_duration);
      jsPsych.pluginAPI.setTimeout(endTrial, trial.fixation_duration + trial.pre_blank_duration + trial.stimulus_duration + trial.post_blank_duration);
    }
  }
  HFTrialPlugin.info = info;
  return HFTrialPlugin;
})(typeof jsPsychModule !== "undefined" ? jsPsychModule : { ParameterType: { IMAGE: "image", INT: "int", KEYS: "keys", BOOL: "bool" } });

/***********************************
 * 3. PRACTICE FEEDBACK PLUGIN      *
 ***********************************/
// A single feedback plugin is used instead of two conditional feedback trials.
// This avoids jsPsych/browser-version differences where conditional_function
// on individual trials may be ignored and both Correct/Oopsies pages are shown.
const jsPsychHFPracticeFeedback = (function(jspsych) {
  const info = {
    name: "hf-practice-feedback",
    parameters: {
      game: { type: jspsych.ParameterType.STRING, default: "heart" },
    },
  };

  class HFPracticeFeedbackPlugin {
    constructor(jsPsych) {
      this.jsPsych = jsPsych;
    }

    trial(display_element, trial) {
      const jsPsych = this.jsPsych;
      const last = getLastTaskRow();
      const correct = !!(last && Number(last.Correct) === 1);
      let keyboardListener = null;
      let trialEnded = false;

      function endTrial() {
        if (trialEnded) return;
        trialEnded = true;
        jsPsych.pluginAPI.clearAllTimeouts();
        if (keyboardListener !== null) {
          jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
        }
        display_element.innerHTML = "";
        jsPsych.finishTrial({ feedback_correct: correct ? 1 : 0 });
      }

      display_element.innerHTML = practiceFeedbackHtml(trial.game, correct);

      if (correct) {
        jsPsych.pluginAPI.setTimeout(endTrial, PRACTICE_CORRECT_FEEDBACK_MS);
      } else {
        keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
          callback_function: endTrial,
          valid_responses: [" "],
          rt_method: "performance",
          persist: false,
          allow_held_key: false,
        });
      }
    }
  }

  HFPracticeFeedbackPlugin.info = info;
  return HFPracticeFeedbackPlugin;
})(typeof jsPsychModule !== "undefined" ? jsPsychModule : { ParameterType: { STRING: "string" } });

/**********************
 * 3. HELPER FUNCTIONS *
 **********************/
function getURLParam(names) {
  const params = new URLSearchParams(window.location.search);
  for (const name of names) {
    const value = params.get(name);
    if (value !== null && value !== "") return value;
  }
  return null;
}

function resource(name) {
  return RESOURCE_DIR + name;
}

function allGuideImages() {
  return Object.values(GUIDE).flat().map(resource);
}

function allPracticeFeedbackImages() {
  return [
    PRACTICE_FEEDBACK_IMAGES.heart.wrong,
    PRACTICE_FEEDBACK_IMAGES.heart.correct,
    PRACTICE_FEEDBACK_IMAGES.flower.wrong,
    PRACTICE_FEEDBACK_IMAGES.flower.correct,
  ].map(resource);
}

function escapeForOnerrorAttribute(html) {
  return html
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/\n/g, " ");
}

function imageInstruction(file, fallbackTitle, fallbackText) {
  const src = resource(file);
  const fallbackHtml = `<div class="fallback-box"><h1>${fallbackTitle}</h1><p>${fallbackText}</p><p>Press SPACEBAR to continue.</p></div>`;
  const escapedFallback = escapeForOnerrorAttribute(fallbackHtml);
  return {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
      <div class="instr-wrap">
        <img src="${src}" class="instr-img" alt="instruction" onerror="this.style.display='none'; this.insertAdjacentHTML('afterend', '${escapedFallback}');">
        <div class="continue-hint">Heart and Flower</div>
      </div>`,
    choices: [" "],
    record_data: false,
    data: { TaskRow: 0, ScreenType: "Instruction", ImageFile: file },
  };
}

function pushInstructions(timeline, files, title, text) {
  files.forEach(file => timeline.push(imageInstruction(file, title, text)));
}

function codeToMeta(game, code) {
const isHeart = game === "mixed"
  ? code.startsWith("con_")
  : game === "heart";
  const stimSide = code.endsWith("_L") ? 1 : 2;
  const congruent = isHeart ? 1 : 0;
  const expRes = isHeart ? stimSide : (stimSide === 1 ? 2 : 1);
  const stimulus = isHeart ? STIM_IMAGES.heart : STIM_IMAGES.flower;
  const sideChar = stimSide === 1 ? "l" : "r";
  const typeChar = isHeart ? "con" : "incon";
  return { stimSide, expRes, congruent, stimulus, trialNameCore: `${typeChar}_${sideChar}` };
}

function keyToResponseSide(key) {
  if (key === null || typeof key === "undefined") return 0;
  const k = String(key).toLowerCase();
  if (k === LEFT_KEY) return 1;
  if (k === RIGHT_KEY) return 2;
  return 0;
}

function scoreAndAnnotate(data, baseMeta, practiceAttempt = "") {
  const responseSide = keyToResponseSide(data.response);
  const rt = data.rt === null || typeof data.rt === "undefined" ? 0 : Math.round(data.rt);
  const noResponse = responseSide === 0;
  const correct = noResponse ? 0 : (responseSide === baseMeta.ExpRes ? 1 : 0);
  const error = correct === 1 ? 0 : 1;
  const responseOutcome = noResponse ? "NoResponse" : (correct === 1 ? "Correct" : "WrongKey");

  data.TaskRow = 1;
  data.SubjectID = SUBJECT_ID;
  data.Experiment = "HeartsFlowers";
  data.BlockNo = baseMeta.BlockNo;
  data.BlockOrder = baseMeta.BlockOrder;
  data.TrialNo = baseMeta.TrialNo;
  data.TrialType = baseMeta.TrialType;
  data.IsTrial = baseMeta.IsTrial;
  data.TrialName = baseMeta.TrialName;
  data.PseudoSequence = baseMeta.PseudoSequence;
  data.StimSide = baseMeta.StimSide;
  data.ExpRes = baseMeta.ExpRes;
  data.Congruent = baseMeta.Congruent;
  data.Response = responseSide;
  data.Correct = correct;
  data.Error = error;
  data.NoResponse = noResponse ? 1 : 0;
  data.ResponseOutcome = responseOutcome;
  data.RT = rt;
  data.ResponseKey = data.response === null || typeof data.response === "undefined" ? "" : String(data.response).toLowerCase();
  data.PracticeAttempt = practiceAttempt;
  data.DateTime = new Date().toISOString();
  data.BrowserUserAgent = navigator.userAgent;
}

function getLastTaskRow() {
  const rows = jsPsych.data.get().filter({ TaskRow: 1 }).values();
  return rows[rows.length - 1];
}

function practiceFeedbackHtml(game, correct) {
  const file = correct
    ? PRACTICE_FEEDBACK_IMAGES[game].correct
    : PRACTICE_FEEDBACK_IMAGES[game].wrong;

  const src = resource(file);
  const fallbackTitle = correct ? "Correct!" : "Oopsies!";
  const fallbackRule = game === "heart" ? "Heart---SAME Side" : "Flower---OPPOSITE Side";
  const fallbackHtml = escapeForOnerrorAttribute(
    `<div class="fallback-box">
      <h1>${fallbackTitle}</h1>
      <p>${correct ? "" : fallbackRule}</p>
      ${correct ? "" : "<p>Press SPACEBAR to continue.</p>"}
    </div>`
  );

  return `
    <div class="instr-wrap">
      <img
        src="${src}"
        class="instr-img"
        alt="practice feedback"
        onerror="this.style.display='none'; this.insertAdjacentHTML('afterend', '${fallbackHtml}');"
      >
    </div>
  `;
}

function practiceFeedbackTrial(game) {
  return {
    type: jsPsychHFPracticeFeedback,
    game: game,
    record_data: false,
    data: { TaskRow: 0, ScreenType: "PracticeFeedback" },
  };
}

function makePracticeLoop(game, code, trialNo) {
  const m = codeToMeta(game, code);
  let attempt = 0;
  const baseMeta = {
    BlockNo: game === "heart" ? 1 : 2,
    BlockOrder: game === "heart" ? 1 : 2,
    TrialNo: trialNo,
    TrialType: "Practice",
    IsTrial: 0,
    TrialName: `p_${m.trialNameCore}`,
    PseudoSequence: game === "heart" ? "h0" : "f0",
    StimSide: m.stimSide,
    ExpRes: m.expRes,
    Congruent: m.congruent,
  };

  const practiceStim = {
    type: jsPsychHFTrial,
    stimulus: m.stimulus,
    side: m.stimSide,
    choices: [LEFT_KEY, RIGHT_KEY],
    wait_for_response: true,
    response_ends_trial: true,
    on_finish: function(data) {
      attempt += 1;
      scoreAndAnnotate(data, baseMeta, attempt);
    },
  };

  return {
    timeline: [practiceStim, practiceFeedbackTrial(game)],
    loop_function: function() {
      const last = getLastTaskRow();
      return !(last && Number(last.Correct) === 1);
    },
  };
}

function makeFormalTrial(game, code, blockOrder, trialNo, pseudoSequence) {
  const m = codeToMeta(game, code);
  const baseMeta = {
    BlockNo: game === "heart" ? 1 : game === "flower" ? 2 : 3,
    BlockOrder: blockOrder,
    TrialNo: trialNo,
    TrialType: "Trial",
    IsTrial: 1,
    TrialName: `t_${m.trialNameCore}`,
    PseudoSequence: pseudoSequence,
    StimSide: m.stimSide,
    ExpRes: m.expRes,
    Congruent: m.congruent,
  };
  return {
    type: jsPsychHFTrial,
    stimulus: m.stimulus,
    side: m.stimSide,
    choices: [LEFT_KEY, RIGHT_KEY],
    fixation_duration: TIMING.fixationMs,
    pre_blank_duration: TIMING.preBlankMs,
    stimulus_duration: TIMING.stimulusMs,
    post_blank_duration: TIMING.postBlankMs,
    response_ends_trial: TIMING.responseEndsTrial,
    wait_for_response: false,
    on_finish: function(data) {
      scoreAndAnnotate(data, baseMeta, "");
    },
  };
}

function selectSequence(game) {
  const labels =
    game === "heart" ? ["h1", "h2", "h3", "h4", "h5", "h6"] :
    game === "flower" ? ["f1", "f2", "f3", "f4", "f5", "f6"] :
    ["m1", "m2", "m3", "m4", "m5", "m6"];

  return jsPsych.randomization.sampleWithoutReplacement(labels, 1)[0];
}

function pushPractice(timeline, game) {
  PRACTICE[game].forEach((code, i) => {
    timeline.push(makePracticeLoop(game, code, i + 1));
  });
}

function sideToCode(game, sideLetter) {
  const side = String(sideLetter).toUpperCase() === "L" ? "L" : "R";
  return game === "heart" ? `con_${side}` : `incon_${side}`;
}

function randomSideLetter() {
  return Math.random() < 0.5 ? "L" : "R";
}

function resetSecondPracticeAttemptState(game, isRestart) {
  const state = SECOND_PRACTICE_STATE[game];
  const fixedSides = SECOND_PRACTICE_FIXED_SIDES[game] || SECOND_PRACTICE_FIXED_SIDES.heart;

  if (isRestart) {
    state.attempt += 1;
    state.restartCount += 1;
  } else {
    state.attempt = 1;
    state.restartCount = 0;
    state.globalTrialNo = 0;
  }

  state.sequence = fixedSides.map(side => sideToCode(game, side));
  state.index = 0;
  state.extraAdded = 0;
  state.noResponseStreak = 0;
  state.restartPending = false;
}

function initializeSecondPractice(game) {
  resetSecondPracticeAttemptState(game, false);
}

function restartSecondPractice(game) {
  resetSecondPracticeAttemptState(game, true);
}

function secondPracticeStartFiles(game) {
  return game === "heart" ? GUIDE.heartPractice2Start : GUIDE.flowerPractice2Start;
}

function secondPracticeNoResponseFiles(game) {
  return game === "heart" ? GUIDE.heartPractice2NoResponse : GUIDE.flowerPractice2NoResponse;
}

function makeSecondPracticeStartInstructionTrial(game, file, initializeOnStart = false) {
  const title = game === "heart" ? "Heart practice" : "Flower practice";
  const text = game === "heart"
    ? "Now you will do another Heart practice without feedback."
    : "Now you will do another Flower practice without feedback.";

  const trial = imageInstruction(file, title, text);
  if (initializeOnStart) {
    trial.on_start = function() {
      initializeSecondPractice(game);
    };
  }
  return trial;
}

function makeSecondPracticeNoResponseReminderTrial(game) {
  const file = secondPracticeNoResponseFiles(game)[0];
  const title = game === "heart" ? "Heart practice reminder" : "Flower practice reminder";
  const text = "You did not respond on four consecutive practice trials. Press SPACEBAR to continue and restart this practice section.";
  const trial = imageInstruction(file, title, text);

  // The reminder waits for SPACEBAR because imageInstruction() uses choices: [" "].
  // After SPACEBAR, reset stage 2 to a fresh four-trial attempt. The regular
  // stage-2 start instruction slides are then shown again before the new trials.
  trial.on_finish = function() {
    restartSecondPractice(game);
  };
  return trial;
}

function currentSecondPracticeCode(game) {
  const state = SECOND_PRACTICE_STATE[game];
  return state.sequence[state.index] || state.sequence[state.sequence.length - 1] || sideToCode(game, "L");
}

function makeSecondPracticeTrial(game) {
  return {
    type: jsPsychHFTrial,
    stimulus: function() {
      const m = codeToMeta(game, currentSecondPracticeCode(game));
      return m.stimulus;
    },
    side: function() {
      const m = codeToMeta(game, currentSecondPracticeCode(game));
      return m.stimSide;
    },
    choices: [LEFT_KEY, RIGHT_KEY],
    fixation_duration: TIMING.fixationMs,
    pre_blank_duration: TIMING.preBlankMs,
    stimulus_duration: TIMING.stimulusMs,
    post_blank_duration: TIMING.postBlankMs,
    response_ends_trial: TIMING.responseEndsTrial,
    wait_for_response: false,
    on_finish: function(data) {
      const state = SECOND_PRACTICE_STATE[game];
      const trialNo = state.index + 1;
      const code = currentSecondPracticeCode(game);
      const m = codeToMeta(game, code);
      const isExtra = state.index >= SECOND_PRACTICE_FIXED_SIDES[game].length ? 1 : 0;

      const baseMeta = {
        BlockNo: game === "heart" ? 1 : 2,
        BlockOrder: game === "heart" ? 1 : 2,
        TrialNo: trialNo,
        TrialType: "Practice2",
        IsTrial: 0,
        TrialName: `p2_${m.trialNameCore}`,
        PseudoSequence: game === "heart" ? "hP2" : "fP2",
        StimSide: m.stimSide,
        ExpRes: m.expRes,
        Congruent: m.congruent,
      };

      scoreAndAnnotate(data, baseMeta, "");

      state.globalTrialNo += 1;

      // Four-consecutive-no-response logic uses ONLY complete non-responses.
      // A wrong key is still an Error, but it counts as a keyboard response and
      // therefore resets the no-response streak.
      if (Number(data.NoResponse) === 1) {
        state.noResponseStreak += 1;
      } else {
        state.noResponseStreak = 0;
      }

      // Dynamic stage-2 length: every stage-2 Error (wrong key OR no response)
      // adds one random extra trial, up to four extras. Errors on extra trials
      // can also add another trial until the +4 cap is reached.
      let extraAddedThisTrial = 0;
      if (Number(data.Error) === 1 && state.extraAdded < SECOND_PRACTICE_MAX_EXTRA_TRIALS) {
        state.sequence.push(sideToCode(game, randomSideLetter()));
        state.extraAdded += 1;
        extraAddedThisTrial = 1;
      }

      const restartTriggered = state.noResponseStreak >= SECOND_PRACTICE_NO_RESPONSE_RESTART_STREAK;
      if (restartTriggered) {
        state.restartPending = true;
      }

      data.SecondPracticeAttempt = state.attempt;
      data.SecondPracticeGlobalTrialNo = state.globalTrialNo;
      data.SecondPracticeIsExtra = isExtra;
      data.SecondPracticeExtraAddedThisTrial = extraAddedThisTrial;
      data.SecondPracticeExtraAddedTotal = state.extraAdded;
      data.SecondPracticePlannedTotal = state.sequence.length;
      data.SecondPracticeNoResponseStreak = state.noResponseStreak;
      data.SecondPracticeRestartTriggered = restartTriggered ? 1 : 0;
      data.SecondPracticeRestartCount = state.restartCount + (restartTriggered ? 1 : 0);

      state.index += 1;
    },
  };
}

function makeSecondPracticeRestartFlow(game) {
  const restartTimeline = [
    makeSecondPracticeNoResponseReminderTrial(game)
  ];

  return {
    timeline: restartTimeline,
    conditional_function: function() {
      return SECOND_PRACTICE_STATE[game].restartPending === true;
    },
  };
}

function makeSecondPracticeProcedure(game) {
  return {
    timeline: [makeSecondPracticeTrial(game), makeSecondPracticeRestartFlow(game)],
    loop_function: function() {
      const state = SECOND_PRACTICE_STATE[game];
      // If a restart occurred, restartSecondPractice() has already reset index to 0
      // and sequence to the fresh four base trials before this function is reached.
      return state.index < state.sequence.length;
    },
  };
}

function pushSecondPractice(timeline, game) {
  const startFiles = secondPracticeStartFiles(game);

  // First stage-2 start page initializes the state. Additional start pages follow it.
  startFiles.forEach((file, i) => {
    timeline.push(makeSecondPracticeStartInstructionTrial(game, file, i === 0));
  });

  timeline.push(makeSecondPracticeProcedure(game));
}

function pushFormalBlock(timeline, game, blockOrder) {
  const seqLabel = selectSequence(game);
  const sequence = SEQUENCES[seqLabel];
  sequence.forEach((code, i) => {
    timeline.push(makeFormalTrial(game, code, blockOrder, i + 1, seqLabel));
  });
}

function csvEscape(value) {
  if (value === null || typeof value === "undefined") return "";
  const str = String(value);
  if (/[",\n\r]/.test(str)) return `"${str.replace(/"/g, '""')}"`;
  return str;
}

function rowsToCSV(rows, columns) {
  const header = columns.map(csvEscape).join(",");
  const body = rows.map(row => columns.map(col => csvEscape(row[col])).join(",")).join("\n");
  return header + "\n" + body;
}

function isPavloviaRuntime() {
  const host = window.location.hostname.toLowerCase();
  const force = new URLSearchParams(window.location.search).get("pavlovia");
  if (force === "1" || force === "true") return true;
  return host.includes("pavlovia.org");
}

function makeCSVForDownload() {
  const rows = jsPsych.data.get().filter({ TaskRow: 1 }).values();
  return rowsToCSV(rows, DATA_COLUMNS);
}

function downloadTextFile(filename, text) {
  const blob = new Blob([text], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(function() {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 0);
}

/**********************
 * 4. ESCAPE KEY EXIT  *
 **********************/
function installEscapeQuitHandler() {
  let escapeQuitLocked = false;

  document.addEventListener("keydown", function(event) {
    const isEscape = event.key === "Escape" || event.code === "Escape" || event.keyCode === 27;
    if (!isEscape || escapeQuitLocked) return;

    escapeQuitLocked = true;
    event.preventDefault();
    event.stopPropagation();

    document.body.style.cursor = "default";

    try {
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen();
      }
    } catch (e) {}

    try {
      jsPsych.pluginAPI.clearAllTimeouts();
    } catch (e) {}

    // Local preview: save whatever task rows have already been collected.
    // Pavlovia online: the page will stop immediately; for official data collection,
    // participants normally should not use ESC unless the experimenter wants to abort.
    try {
      if (!USE_PAVLOVIA) {
        const partialId = SUBJECT_ID || "UNKNOWN";
        downloadTextFile(`HeartsFlowers_${partialId}_ESC_partial.csv`, makeCSVForDownload());
      }
    } catch (e) {}

    try {
      jsPsych.endExperiment("Experiment stopped by ESC.");
    } catch (e) {}

    setTimeout(function() {
      document.body.innerHTML = `
        <div style="
          width: 100vw;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: Arial, sans-serif;
          text-align: center;
          line-height: 1.8;
          background: #f7f7f7;
          color: #111;
        ">
          <div>
            <h2>Experiment stopped.</h2>
            <p>You pressed ESC. The task has been stopped.</p>
            <p>You may now close this page.</p>
          </div>
        </div>
      `;
    }, 80);
  }, true);
}

/**********************
 * 5. BUILD EXPERIMENT *
 **********************/
const jsPsych = initJsPsych({
  show_progress_bar: false,
  override_safe_mode: true,
});

let SUBJECT_ID = getURLParam(["participant", "SubjectID", "subject", "PROLIFIC_PID", "id"]) || "";
const USE_PAVLOVIA = isPavloviaRuntime() && (typeof jsPsychPavlovia !== "undefined");
const timeline = [];
installEscapeQuitHandler();

if (isPavloviaRuntime() && typeof jsPsychPavlovia === "undefined") {
  document.body.innerHTML = `<div class="debug-note"><b>Pavlovia plugin failed to load.</b><br>
  请检查网络是否能访问 https://lib.pavlovia.org/jspsych-7-pavlovia-2022.1.1.js ，或把该插件下载到本地并在 index.html 中改成本地路径。</div>`;
  throw new Error("Pavlovia runtime detected, but jsPsychPavlovia is undefined.");
}

// Pavlovia connection. Locally opened files skip this step to avoid file:// security errors.
if (USE_PAVLOVIA) {
  timeline.push({
    type: jsPsychPavlovia,
    command: "init",
  });
}

// Preload core assets.
timeline.push({
  type: jsPsychPreload,
  images: [STIM_IMAGES.heart, STIM_IMAGES.flower].concat(
    allGuideImages(),
    allPracticeFeedbackImages()
  ),
  continue_after_error: true,
  show_detailed_errors: true,
  message: "Loading experiment materials...",
  record_data: false,
  data: { TaskRow: 0, ScreenType: "Preload" },
});

// Demographic information.
timeline.push({
  type: jsPsychSurveyHtmlForm,

  preamble: `
    <h2>Basic Information</h2>
    <p>Please fill in the following information, then click “Continue”.</p>
  `,

  html: `
    <div style="text-align: left; width: 430px; margin: 0 auto; font-size: 18px; line-height: 2.3;">

      <label>
        ID：
        <input name="subject_id" type="text" required
               style="width: 280px; font-size: 18px;">
      </label>

    </div>
  `,

  button_label: "Continue",

  data: { TaskRow: 0, ScreenType: "Demographics" },

  on_finish: function(data) {
    const info = data.response;

    SUBJECT_ID = info.subject_id;

    jsPsych.data.addProperties({
      SubjectID: SUBJECT_ID
    });
  }
});

// Fullscreen is recommended for keyboard RT tasks.
timeline.push({
  type: jsPsychFullscreen,
  fullscreen_mode: true,
  on_finish: function() {
    document.body.style.cursor = "none";
  },
  message: "<p>The experiment will switch to full-screen mode.</p><p>Press the button below to continue.</p>",
  button_label: "Continue",
  record_data: false,
  data: { TaskRow: 0, ScreenType: "Fullscreen" },
});

// Flow: Heart feedback practice -> Heart no-feedback stage 2 -> Heart formal ->
// Flower feedback practice -> Flower no-feedback stage 2 -> Flower formal ->
// Mixed instructions -> Mixed formal (no mixed practice).
pushInstructions(timeline, GUIDE.welcome, "Welcome", "Welcome to the Hearts and Flowers Game.");
pushInstructions(timeline, GUIDE.heartRules, "Heart game", "For hearts, press the SAME side. S = Left, L = Right.");
pushPractice(timeline, "heart");
pushSecondPractice(timeline, "heart");
pushInstructions(timeline, GUIDE.heartStart, "Heart game", "Now play the Heart game for real. Try to be fast and accurate.");
pushFormalBlock(timeline, "heart", 1);
pushInstructions(timeline, GUIDE.doneBlock1, "Block complete", "You have completed this block. There are a few more blocks to go.");

pushInstructions(timeline, GUIDE.flowerRules, "Flower game", "For flowers, press the OPPOSITE side. S = Left, L = Right.");
pushPractice(timeline, "flower");
pushSecondPractice(timeline, "flower");
pushInstructions(timeline, GUIDE.flowerStart, "Flower game", "Now play the Flower game for real. Try to be fast and accurate.");
pushFormalBlock(timeline, "flower", 2);
// Mixed-block instructions.
pushInstructions(
  timeline,
  GUIDE.mixedStart,
  "Hearts and Flowers Together",
  "For hearts, press the SAME side. For flowers, press the OPPOSITE side. S = Left, L = Right."
);

pushFormalBlock(timeline, "mixed", 3);

pushInstructions(
  timeline,
  GUIDE.end,
  "Task complete",
  "You have completed the game."
);

// Finish connection and upload filtered CSV data on Pavlovia.
// In local preview mode, press SPACEBAR at the end to download a CSV file.
if (USE_PAVLOVIA) {
  timeline.push({
    type: jsPsychPavlovia,
    command: "finish",

    participantId: function() {
      return SUBJECT_ID;
    },

    dataFilter: function() {
      return makeCSVForDownload();
    },

    on_start: function() {
      setTimeout(function() {
        document.body.innerHTML = `
          <div style="
            width: 100vw;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: Arial, sans-serif;
            text-align: center;
            line-height: 1.8;
            background: #f7f7f7;
          ">
            <div>
              <h2>The experiment is complete.</h2>
              <p>The data has been saved. Thank you for your participation.</p>
              <p>You may now close this page.</p>
            </div>
          </div>
        `;
      }, 20000);
    }
  });
} else {
  timeline.push({
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<div class="feedback-wrap">
      <div class="feedback-title feedback-good">Local preview complete</div>
      <div class="feedback-subtitle"> Press SPACEBAR to download the CSV of this test.</div>
    </div>`,
    choices: [" "],
    record_data: false,
    on_finish: function() {
      downloadTextFile(`HeartsFlowers_${SUBJECT_ID}.csv`, makeCSVForDownload());
      document.body.style.cursor = "default";
    },
  });
}

jsPsych.run(timeline);