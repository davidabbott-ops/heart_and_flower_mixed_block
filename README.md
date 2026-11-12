# Hearts & Flowers Pavlovia / jsPsych v7

本版本基于当前 `experiment.js` 的正式实验流程更新，重点修改 **第二轮无反馈练习（Practice2）** 的动态加题与连续无反应重启逻辑。

## 1. 项目目录

Pavlovia / GitLab 项目根目录建议保持：

```text
project-root/
├─ data/
├─ resources/
├─ experiment.js
├─ index.html
└─ README.md
```

当前代码从 `resources/` 读取所有刺激与指导语图片。

本次新增/确认使用的第二轮练习图片：

```text
resources/practice_1.png
resources/practice_1_1.png
resources/practice_1_2.png
resources/practice_2.png
resources/practice_2_1.png
resources/practice_2_2.png
```

其中：

- `practice_1.png`：Heart 第二轮练习开始指导语第 1 页
- `practice_1_1.png`：Heart 第二轮练习开始指导语第 2 页，紧接 `practice_1.png`
- `practice_1_2.png`：Heart 第二轮练习连续 4 个 trial 完全未按键时显示的提醒页
- `practice_2.png`：Flower 第二轮练习开始指导语第 1 页
- `practice_2_1.png`：Flower 第二轮练习开始指导语第 2 页，紧接 `practice_2.png`
- `practice_2_2.png`：Flower 第二轮练习连续 4 个 trial 完全未按键时显示的提醒页

本代码保留当前材料映射：

```text
Welcome:             p01.png
Heart rules:         p02.png, p03.png, p04.png
Heart formal start:  p11.png
Block 1 done:        p16.png
Flower rules:        p17.png, p18.png, p19.png
Flower formal start: p26.png
Block 2 done:        p31.png
Flower again:        p32.png, p33.png
Block 3 done:        p34.png
Heart again:         p35.png, p36.png
End:                 p37.png

Heart feedback:  wrong p09.png / correct p10.png
Flower feedback: wrong p25.png / correct p24.png
```

`heart.png` 与 `flower.png` 仍作为实际 trial 刺激图片。

---

## 2. 第一轮练习（有反馈 Practice）

Heart 和 Flower 各自仍为 **4 个基础练习项目**。

第一轮练习逻辑保持不变：

1. trial 图片一直显示，直到被试按 `S` 或 `L`。
2. 正确：显示 Correct 页面 750 ms，然后自动进入下一项目。
3. 错误：显示 Oopsies 页面，等待按 SPACEBAR，然后重复当前同一项目。
4. 直到该项目答对后才进入下一项目。
5. **第一轮练习产生多少次错误，不再影响第二轮练习的题数。**

第一轮练习中的 `PracticeAttempt` 继续记录同一项目是第几次作答。

---

## 3. 第二轮练习（无反馈 Practice2）

### 3.1 开始指导语

Heart 第二轮练习开始前依次显示：

```text
practice_1.png
↓ SPACEBAR
practice_1_1.png
↓ SPACEBAR
开始 Practice2
```

Flower 第二轮练习开始前依次显示：

```text
practice_2.png
↓ SPACEBAR
practice_2_1.png
↓ SPACEBAR
开始 Practice2
```

### 3.2 基础 trial 数与固定顺序

每次进入/重新进入第二轮练习时，都从 **4 个基础 trial** 开始：

- Heart：`L R R L`，即 `con_L, con_R, con_R, con_L`
- Flower：`R R L L`，即 `incon_R, incon_R, incon_L, incon_L`

Practice2 与正式实验使用相同时序：

```text
500 ms fixation
→ 500 ms stimulus
→ 250 ms blank
```

RT 从 stimulus 出现时开始计算，允许反应的总窗口为 750 ms。Practice2 **不显示 Correct / Oopsies 反馈**。

### 3.3 Error 的定义

在第二轮练习中，以下两类情况都记为 `Error = 1`：

1. **WrongKey**：在 750 ms 内按了键，但按错 `S/L`；
2. **NoResponse**：整个 750 ms 反应窗口内没有按 `S/L`。

正确反应记为 `Error = 0`。

### 3.4 根据第二轮自身 Error 动态增加 trial

第二轮最初有 4 个基础 trial。

**只根据第二轮自身产生的 Error 动态增加练习题：**

- 每出现 1 个 Error，立即在当前 Practice2 尾部增加 1 个随机左右位置的额外 trial；
- 最多增加 4 个额外 trial；
- 因此单次 Practice2 attempt 的计划总数为 **4–8 个 trial**；
- 额外 trial 如果再次出错，也可以继续触发加题，只要累计额外题数尚未达到 4。

示例：

```text
4 个基础题中错 1 个
→ 增加 1 个额外题
→ 当前计划总数变为 5
```

如果随后额外题又错 1 个，并且额外题总数尚未达到 4：

```text
再增加 1 个额外题
→ 当前计划总数变为 6
```

---

## 4. 连续 4 个 trial 完全未按键：提醒并重新开始第二轮练习

此规则仅检查 **NoResponse**，不是一般 Error。

- WrongKey 虽然属于 Error、会增加额外 trial，但因为被试确实按过键，所以会把“连续未反应计数”清零。
- 只有 `NoResponse = 1` 才会累积连续未反应次数。

如果在同一次 Practice2 attempt 中出现：

```text
连续 4 个 trial 都完全没有 S/L 键盘反应
```

则在第 4 个 NoResponse trial 结束后：

### Heart

```text
显示 practice_1_2.png
↓ SPACEBAR
重新从 4 个 Heart 基础 Practice2 trial 开始（LRRL）
```

### Flower

```text
显示 practice_2_2.png
↓ SPACEBAR
重新从 4 个 Flower 基础 Practice2 trial 开始（RRLL）
```

重启时：

- 本次 Practice2 的动态额外题数重新归零；
- 新 attempt 再从 4 个基础 trial 开始；
- 新 attempt 中仍继续应用“每个 Error 增加 1 题、最多增加 4 题”的规则；
- 如果之后再次出现连续 4 个 NoResponse，可以再次触发相同提醒与重启；
- **重启前已经完成的 Practice2 trial 不会从数据中删除**，而是保留并通过 attempt / restart 字段标记，方便核查。

---

## 5. 正式实验

正式 trial 时序保持：

```text
500 ms fixation
→ 500 ms stimulus
→ 250 ms blank
```

RT 从刺激出现时开始，最大反应窗口 750 ms。

正式实验流程继续按当前代码执行：

```text
Heart formal block
→ Flower formal block
→ Flower formal block again
→ Heart formal block again
```

正式 pseudo-sequence 与现有 6 组 Heart / 6 组 Flower 序列均未修改。

---

## 6. CSV 数据字段

最终 CSV 只导出 `TaskRow = 1` 的行为 trial 行，指导页、feedback 页面和 fullscreen 页面不进入最终行为 CSV。

### 6.1 原有核心字段

- `SubjectID`：被试 ID
- `Experiment`：固定为 `HeartsFlowers`
- `BlockNo`
- `BlockOrder`
- `TrialNo`
- `TrialType`：`Practice` / `Practice2` / `Trial`
- `IsTrial`：正式 trial 为 1，练习为 0
- `TrialName`
- `PseudoSequence`
- `StimSide`：1=左，2=右
- `ExpRes`：正确反应位置，1=左/S，2=右/L
- `Congruent`
- `Response`：1=左/S，2=右/L，0=未反应
- `Correct`：1=正确，0=错误或未反应
- `RT`：毫秒；未反应仍记为 0
- `ResponseKey`：`s` / `l` / 空
- `PracticeAttempt`：第一轮有反馈练习中，同一项目的第几次作答
- `DateTime`
- `BrowserUserAgent`

### 6.2 新增的通用反应结果字段

- `Error`：1=错误，0=正确。WrongKey 与 NoResponse 都属于 Error
- `NoResponse`：1=750 ms 内完全没有 S/L 反应；否则为 0
- `ResponseOutcome`：
  - `Correct`
  - `WrongKey`
  - `NoResponse`

这三个字段可避免后续分析时把 `RT=0` 误解释为 0 ms 的真实反应。

### 6.3 第二轮 Practice2 专用字段

这些字段只在 `TrialType = Practice2` 的行中有值，其他 trial 留空。

- `SecondPracticeAttempt`：当前第二轮练习 attempt 编号。首次为 1；每次“连续 4 个 NoResponse”重启后 +1
- `SecondPracticeGlobalTrialNo`：该 Heart/Flower 第二轮练习从第一次开始以来实际呈现的 Practice2 trial 总顺序号；重启后不归零
- `SecondPracticeIsExtra`：0=本 attempt 的前 4 个基础 trial；1=因 Error 动态增加的额外 trial
- `SecondPracticeExtraAddedThisTrial`：当前 trial 是否触发增加 1 个额外 trial，1=是，0=否
- `SecondPracticeExtraAddedTotal`：当前 attempt 到本 trial 结束时累计增加了多少个额外 trial，范围 0–4
- `SecondPracticePlannedTotal`：当前 trial 结束后，本 attempt 当前计划总 trial 数，范围 4–8
- `SecondPracticeNoResponseStreak`：当前 trial 结束后连续 NoResponse 的次数；有任何 S/L 键盘反应即清零
- `SecondPracticeRestartTriggered`：当前 trial 是否正好触发“连续 4 个 NoResponse”重启，1=触发，0=未触发
- `SecondPracticeRestartCount`：截至当前 trial 已触发的累计重启次数；触发重启的那一行已经计入本次重启

旧版的：

```text
FirstPracticeErrorsForSecondPractice
```

已删除，因为第一轮错误不再决定第二轮题数。

旧版 `SecondPracticeTotal` 被更明确的：

```text
SecondPracticePlannedTotal
```

替代。

---

## 7. 数据判定示例

### 正确反应

```text
Correct = 1
Error = 0
NoResponse = 0
ResponseOutcome = Correct
```

### 按错键

```text
Correct = 0
Error = 1
NoResponse = 0
ResponseOutcome = WrongKey
```

如果发生在 Practice2 且额外题尚未达到 4 个，则增加 1 个 trial。

### 超时未按键

```text
Correct = 0
Error = 1
NoResponse = 1
ResponseOutcome = NoResponse
RT = 0
```

如果发生在 Practice2：

1. 若额外题尚未达到 4 个，增加 1 个 trial；
2. `SecondPracticeNoResponseStreak + 1`；
3. 若 streak 达到 4，显示对应 `_2` 提醒 slide，并重启整个 Practice2 attempt。

---

## 8. 本地与 Pavlovia

### 本地预览

直接本地运行时不执行 Pavlovia init/finish。实验结束后按 SPACEBAR 下载 CSV。

本地按 ESC 会停止实验并下载当前 partial CSV。

### Pavlovia

在 `run.pavlovia.org` 上运行时使用 Pavlovia plugin：

```text
init
→ experiment
→ finish / save CSV
```

正式收数前建议使用 Piloting 模式至少测试以下情况：

1. 第一轮全错/多次错题不会改变第二轮初始题数，第二轮仍从 4 题开始；
2. 第二轮全部正确时恰好 4 题结束；
3. 第二轮按错 1 次时增加到 5 题；
4. 第二轮按错/漏答累计 4 次时最多 8 题，不再继续加题；
5. 连续 3 个 NoResponse 后只要第 4 个 trial 按了任意 S/L 键，即使按错，也不会触发 `_2` slide；
6. 连续 4 个 NoResponse 后正确显示 `practice_1_2.png` 或 `practice_2_2.png`；
7. `_2` slide 按 SPACEBAR 后重新显示对应的 `practice_1 + practice_1_1` 或 `practice_2 + practice_2_1`；
8. 重启后重新从固定 4 题开始，并再次按 Error 动态加题；
9. CSV 中 `SecondPracticeAttempt`、`NoResponseStreak`、`RestartTriggered` 等字段与实际行为一致。

---

## 9. 本次版本涉及文件

需要替换/更新：

```text
experiment.js
index.html
README.md
```

并确保 `resources/` 中存在：

```text
practice_1.png
practice_1_1.png
practice_1_2.png
practice_2.png
practice_2_1.png
practice_2_2.png
```

其余现有实验材料继续使用你当前 `resources/` 文件夹中的原文件，不需要改名。
