# Hearts & Flowers

Task documentation updated 12 November 2026

This document describes the current keyboard task in experiment.js. It updates the older task overview, block design, response instructions and data key to match the supplied code. The sample CSV is used as a check of recorded output.

## File and program information

| **Item**          | **Current revision**                                                                                                                      |
|-------------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| File info         | experiment.js, with the project HTML, CSS and resources folder.                                                                           |
| Brief description | Heart: respond on the SAME side. Flower: respond on the OPPOSITE side. Blocks occur in the fixed order hearts, flowers, then mixed.       |
| Version           | Keyboard responses; stimulus duration 750 ms. This file does not implement touchscreen responses or automatic age-based timing selection. |
| Program info      | A browser-based Hearts & Flowers task implemented in jsPsych 7.1.2, adapted from Mengquan’s Pavlovia-hosted version                       |

## Task design

Enter the participant ID and continue to full screen. Instructions are normally advanced with SPACEBAR. The sequence is:

- Heart instructions → four feedback practice items → timed second-stage practice → 12 formal heart trials.

- Flower instructions → four feedback practice items → timed second-stage practice → 12 formal flower trials.

- Mixed instructions → 49 formal mixed trials → end instructions and data saving. There is no mixed practice.

## Timing for timed practice and formal trials

| **Phase**             | **Duration** | **Time from trial start** |
|-----------------------|--------------|---------------------------|
| Fixation cross        | 250 ms       | 0–250 ms                  |
| Blank before stimulus | 250 ms       | 250–500 ms                |
| Heart or flower       | 750 ms       | 500–1250 ms               |
| Blank between trials  | 250 ms       | 1250–1500 ms              |

The fixation cross is a bold 48 px “+” and is absent during the stimulus. RT starts at stimulus onset. The first S/L response is accepted during the stimulus or following blank, giving a 1000 ms response window. Responses do not shorten timed trials; the programmed total is 1500 ms. First-stage feedback practice uses different timing, described below.

## Block design

### First-stage feedback practice for hearts and flowers

Each game has four base practice items. Heart stimulus positions are right, left, right, left; flower positions are left, right, left, right. A stimulus appears immediately and remains until an S/L response. There is no timed fixation or blank sequence in this practice stage.

A correct response produces positive feedback for 750 ms, then advances to the next item. A wrong response produces negative feedback that waits for SPACEBAR, then repeats the same item. Repeats have no programmed maximum. There is no experimenter Y/N decision or block-level passing threshold. Each attempt is saved with the same TrialNo and an incremented PracticeAttempt.

### Second-stage timed practice for hearts and flowers

Each game begins with four fixed stimulus positions: hearts left, right, right, left; flowers right, right, left, left. These trials use the 1500 ms timing and 1000 ms response window, without feedback.

Each wrong key or missed response adds one trial with a randomly chosen stimulus side, up to four extra trials per attempt. An error on an extra trial can also add a trial until that cap is reached. An attempt therefore contains four to eight trials unless interrupted by a restart.

Four consecutive complete nonresponses trigger a reminder that waits for SPACEBAR, followed by a fresh four-trial attempt. The extra-trial count and nonresponse streak reset; attempt and restart counters increase. Any S/L response, including a wrong response, resets the nonresponse streak. The executable restart flow shows the reminder only; it does not redisplay the initial second-stage start slides, despite comments in the code saying otherwise.

### Formal heart and flower blocks

Each block contains 12 trials, with six expected left responses and six expected right responses. One predefined sequence is randomly selected from h1–h6 for hearts and f1–f6 for flowers. There is no feedback, repetition after errors, or accuracy-based extension.

### Formal mixed block

One sequence is randomly selected from m1–m6. There are three distinct sequences with duplicate labels: m1 = m4, m2 = m5, and m3 = m6. Every sequence contains 49 trials. The first trial is saved as TrialNo 1 with IsTrial = 1; the code does not discard it or mark it for exclusion.

| **Sequence labels** | **Hearts L / R** | **Flowers L / R** | **Total** |
|---------------------|------------------|-------------------|-----------|
| m1 and m4           | 12 / 12          | 13 / 12           | 49        |
| m2 and m5           | 12 / 14          | 13 / 10           | 49        |
| m3 and m6           | 13 / 13          | 11 / 12           | 49        |

L/R in this table denotes stimulus position. Expected responses are on the same side for hearts and the opposite side for flowers. The mixed sequences are not all exactly balanced for stimulus or response side. All 49 trials are recorded without feedback. Any first-trial exclusion must be applied separately during analysis.

## Responses and buttons

| **Control**     | **Function**                                                                                                                                                   |
|-----------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| S               | Left-hand response.                                                                                                                                            |
| L               | Right-hand response.                                                                                                                                           |
| SPACEBAR        | Advance instruction images and negative practice feedback; acknowledge the second-stage nonresponse reminder; download the CSV at the local completion screen. |
| Continue button | Submit the participant ID and enter full screen.                                                                                                               |
| ESC             | Stop the task. Local preview attempts to download completed task rows as an ESC_partial CSV. The current unfinished trial is not guaranteed to be included.    |

Only the first accepted S/L response per trial is scored. Held keys are not accepted as new responses. Keys pressed before stimulus onset are outside the timed response window.

## Data saving

The exported CSV contains one row per completed task attempt, including both practice stages and formal trials. Instruction, feedback and demographic screen rows are excluded. The participant ID entered in the form supplies SubjectID; the form does not collect age or sex.

In local preview, SPACEBAR at the completion screen downloads HeartsFlowers\_\<SubjectID\>.csv. On Pavlovia, the finish command is configured to upload the filtered CSV. ESC stops the online task without the normal finish sequence; successful online saving after ESC should not be assumed.

## Data key

| **Field**                    | **Meaning**                                                                                                                                                     |
|------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| SubjectID / Experiment       | Participant ID / fixed task name HeartsFlowers.                                                                                                                 |
| BlockNo / BlockOrder         | 1 = heart, 2 = flower, 3 = mixed; order is fixed.                                                                                                               |
| TrialNo                      | Formal trial number, base feedback-practice item number, or second-stage trial number within the current attempt.                                               |
| TrialType / IsTrial          | Practice or Practice2: IsTrial = 0. Formal Trial: IsTrial = 1.                                                                                                  |
| TrialName                    | p\_ = feedback practice; p2\_ = timed practice; t\_ = formal. con = heart, incon = flower; l/r = stimulus position.                                             |
| PseudoSequence               | h0/f0 = feedback practice; hP2/fP2 = timed practice; h1–h6, f1–f6 or m1–m6 = formal sequence.                                                                   |
| StimSide / ExpRes            | Stimulus side / expected response side: 1 = left, 2 = right.                                                                                                    |
| Congruent                    | 1 = heart, same-side rule; 0 = flower, opposite-side rule.                                                                                                      |
| Response / ResponseKey       | Response side: 1 = left, 2 = right, 0 = none. Key: s, l, or blank for no response.                                                                              |
| Correct / Error / NoResponse | Binary flags. Correct + Error = 1. Error includes wrong keys and nonresponses; NoResponse identifies the latter.                                                |
| ResponseOutcome              | Correct, WrongKey or NoResponse.                                                                                                                                |
| RT                           | Milliseconds from stimulus onset, rounded to an integer. No response is coded 0, not a measured zero-latency response. Feedback practice has no fixed RT limit. |
| PracticeAttempt              | Attempt number for the current feedback-practice item; blank for other trial types.                                                                             |

## Second-stage practice data key

These fields are populated only for Practice2 rows. State values are recorded after scoring the current trial and applying any extra-trial or restart trigger.

| **Field**                         | **Meaning**                                                                                  |
|-----------------------------------|----------------------------------------------------------------------------------------------|
| SecondPracticeAttempt             | Attempt number within the current game, beginning at 1.                                      |
| SecondPracticeGlobalTrialNo       | Running trial count across all second-stage attempts within the game.                        |
| SecondPracticeIsExtra             | 1 for a trial beyond the four base trials; otherwise 0.                                      |
| SecondPracticeExtraAddedThisTrial | 1 if this error adds an extra trial; otherwise 0.                                            |
| SecondPracticeExtraAddedTotal     | Cumulative extras added in this attempt, from 0 to 4.                                        |
| SecondPracticePlannedTotal        | Current planned attempt length, including added extras; 4–8.                                 |
| SecondPracticeNoResponseStreak    | Consecutive complete nonresponses, including this trial; reset to 0 by an accepted response. |
| SecondPracticeRestartTriggered    | 1 when this trial reaches four consecutive nonresponses; otherwise 0.                        |
| SecondPracticeRestartCount        | Cumulative restarts for this game; includes the restart triggered by this row.               |

## Other recorded fields

| **Field**        | **Meaning**                                                                                     |
|------------------|-------------------------------------------------------------------------------------------------|
| DateTime         | UTC timestamp written when the completed trial is scored. It is not a stimulus-onset timestamp. |
| BrowserUserAgent | Browser and operating-system identification supplied by the browser.                            |

## Reference output check

The supplied fourth-testing CSV contains 92 task rows: 73 formal trials and 19 practice attempts. Its formal sequences are h1, f3 and m6, with 12, 12 and 49 trials respectively, matching the supplied code.

| **Block** | **Formal trials** | **Correct** | **Wrong key** | **No response** |
|-----------|-------------------|-------------|---------------|-----------------|
| Hearts    | 12                | 12          | 0             | 0               |
| Flowers   | 12                | 10          | 2             | 0               |
| Mixed     | 49                | 22          | 23            | 4               |

Both feedback-practice stages contain five recorded attempts because one item is answered incorrectly and repeated. Heart timed practice contains four trials. Flower timed practice contains five trials because one nonresponse adds an extra trial. These counts reflect this test run; practice totals can vary between runs.

Recorded timed-trial intervals of approximately 1500–1517 ms are consistent with the programmed 1500 ms duration. CSV timestamps cannot establish exact fixation or stimulus presentation durations, or verify visual appearance. The code specifies the bold 48 px fixation cross and removes it before stimulus presentation.

## Sources for this revision

### Task origins and implementation credits

The Hearts & Flowers task originated in Adele Diamond’s laboratory at the University of British Columbia.  
see: https://www.devcogneuro.com/eftasks.html#Heart

The browser implementation on which this repository is based was prepared by:  
  
**Dr Rui Wang (Cantab)**

Research Fellow

Nanyang Technological University  
Centre for Lifelong Learning and Individualized Cognition  
& Cambridge Centre for Advanced Research and Education in Singapore 

and is available through:  
https://gitlab.pavlovia.org/Mengquan/heart_and_flower.  
  
We gratefully acknowledge Rui’s team in implementing the task in JavaScript using jsPsych, with support for hosting and data collection on Pavlovia.

This repository contains subsequent revisions by David Abbott in Adele Diamond’s laboratory. These revisions adapt the supplied browser implementation to our laboratory’s task requirements. Details of the changes are provided in the version history.

The underlying task, the initial browser implementation, and the subsequent revisions represent distinct contributions; the implementation credits above acknowledge that development history.
