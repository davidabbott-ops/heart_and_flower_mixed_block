# Changelog

## 2026-11-12 — Mixed block, trial timing, and fixation update

This revision, prepared by David Abbott in Adele Diamond’s laboratory, builds on the browser implementation supplied by Dr Rui Wang and his team. It replaces the repeated single-rule blocks with a mixed Hearts and Flowers block, updates trial timing, and improves fixation-cross visibility.

Comparison files: original `experiment(8).js` → revised `experiment(7).js`. These filenames identify the copies used for comparison; the task file in this repository is `experiment.js`.

### Task structure

- Changed the formal block order from **Hearts → Flowers → Flowers → Hearts** to **Hearts → Flowers → Mixed**.
- Retained the 12-trial heart and flower blocks and added a **49-trial mixed block**, giving **73 formal trials** overall.
- Added six mixed-sequence labels representing three distinct predefined sequences: `m1 = m4`, `m2 = m5`, and `m3 = m6`. One label is randomly selected for each run.
- Added mixed-block instructions using `resources/p38_updated.png`.
- Updated stimulus selection and expected-response scoring so that mixed trials apply the appropriate rule: **same side for hearts; opposite side for flowers**.
- Recorded the mixed block as `BlockNo = 3` and `BlockOrder = 3`, with its selected sequence label in `PseudoSequence`.

The mixed block requires participants to switch between the two rules as the stimulus changes within a block, replacing the original repetition of single-rule blocks. There is no separate mixed practice, and all 49 mixed trials—including the first—are saved.

### Trial timing

Updated formal trials and second-stage timed practice:

| **Phase**                           | **Original** | **Revised** |
|-------------------------------------|--------------|-------------|
| Fixation                            | 500 ms       | 250 ms      |
| Blank before stimulus               | 0 ms         | 250 ms      |
| Stimulus                            | 500 ms       | 750 ms      |
| Blank after stimulus                | 250 ms       | 250 ms      |
| Total trial duration                | 1250 ms      | 1500 ms     |
| Response window from stimulus onset | 750 ms       | 1000 ms     |

These changes introduce a brief blank between fixation and stimulus presentation and give participants longer to view and respond to the stimulus. RT continues to start at stimulus onset, and an early response does not shorten a timed trial.

### Fixation cross

- Explicitly set the cross to **48 px and bold** for clearer visibility.
- Removed the cross from the stimulus display. It now appears only during the fixation phase.

### Unchanged features

The S/L response keys, first-stage feedback practice, second-stage extra-trial and restart rules, CSV column structure, and local/Pavlovia saving logic remain unchanged.

### Required resource

Include `p38_updated.png` in the `resources/` folder so that the new mixed-block instruction image is available.
