/**
 * Lightweight Windows Chrome smoke test for the learner journey.
 *
 * This intentionally uses Chrome DevTools Protocol and Node's built-in
 * WebSocket API so static-export compatibility is not coupled to a test
 * framework or a second browser automation dependency.
 */

const baseUrl = process.env.BHAVYA_QA_URL ?? "http://localhost:3001";
const cdpPort = process.env.BHAVYA_QA_CDP ?? "9223";
const pages = await (await fetch(`http://127.0.0.1:${cdpPort}/json`)).json();
const target = pages.find((page) => page.type === "page");

if (!target) throw new Error(`No Chrome page target found on port ${cdpPort}`);

const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});

let messageId = 0;
const pending = new Map();
const runtimeEvents = [];
const failedRequests = [];

socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  if (message.method === "Runtime.exceptionThrown") {
    const details = message.params.exceptionDetails ?? {};
    runtimeEvents.push({ type: "exception", text: details.text ?? "runtime exception", description: details.exception?.description ?? "", url: details.url ?? "", lineNumber: details.lineNumber ?? 0, columnNumber: details.columnNumber ?? 0 });
  }
  if (message.method === "Log.entryAdded" && ["error", "warning"].includes(message.params.entry.level)) {
    runtimeEvents.push({ type: message.params.entry.level, text: message.params.entry.text });
  }
  if (message.method === "Network.responseReceived" && message.params.response.status >= 400) {
    failedRequests.push({ status: message.params.response.status, url: message.params.response.url });
  }
  if (message.id && pending.has(message.id)) {
    pending.get(message.id)(message);
    pending.delete(message.id);
  }
});

function send(method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = ++messageId;
    pending.set(id, resolve);
    socket.send(JSON.stringify({ id, method, params }));
    setTimeout(() => {
      if (pending.has(id)) {
        pending.delete(id);
        reject(new Error(`Chrome CDP timeout: ${method}`));
      }
    }, 10000);
  });
}

const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function waitFor(selector, timeout = 15000) {
  const started = Date.now();
  while (Date.now() - started < timeout) {
    if (await evaluate(`Boolean(document.querySelector(${JSON.stringify(selector)}))`)) return;
    await wait(250);
  }
  throw new Error(`Browser element did not become ready: ${selector}`);
}

async function waitForExpression(expression, timeout = 15000) {
  const started = Date.now();
  while (Date.now() - started < timeout) {
    if (await evaluate(expression)) return;
    await wait(250);
  }
  throw new Error(`Browser condition did not become ready: ${expression}`);
}

async function evaluate(expression) {
  const response = await send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  if (response.result?.exceptionDetails) {
    throw new Error(response.result.exceptionDetails.text ?? "Browser evaluation failed");
  }
  return response.result?.result?.value;
}

async function navigate(path) {
  await send("Page.navigate", { url: `${baseUrl}${path}` });
  await waitFor(path === "/learning/" ? ".module-grid" : path === "/learning/coach/" ? ".coach-session" : path === "/learning/diagnostic/" ? ".diagnostic-card" : ".lesson-lab");
}

async function click(selector) {
  return evaluate(`(() => {
    const element = document.querySelector(${JSON.stringify(selector)});
    if (!element) return false;
    element.click();
    return true;
  })()`);
}

async function clearAndReload(path) {
  await navigate(path);
  await evaluate("localStorage.clear(); location.reload()");
  await waitFor(path === "/learning/coach/" ? ".coach-session" : path === "/learning/diagnostic/" ? ".diagnostic-card" : ".lesson-lab");
  if (path !== "/learning/coach/" && path !== "/learning/diagnostic/") await waitFor('[data-learning-hydrated="true"]');
}

async function pressKey(key, code, virtualKeyCode) {
  await send("Input.dispatchKeyEvent", { type: "keyDown", key, code, text: key === "Enter" ? "\r" : undefined, unmodifiedText: key === "Enter" ? "\r" : undefined, windowsVirtualKeyCode: virtualKeyCode, nativeVirtualKeyCode: virtualKeyCode });
  await send("Input.dispatchKeyEvent", { type: "keyUp", key, code, windowsVirtualKeyCode: virtualKeyCode, nativeVirtualKeyCode: virtualKeyCode });
}

async function fillText(selector, value) {
  await evaluate(`(() => {
    const field = document.querySelector(${JSON.stringify(selector)});
    if (!field) throw new Error('Field is missing: ' + ${JSON.stringify(selector)});
    const prototype = field instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
    const setter = Object.getOwnPropertyDescriptor(prototype, 'value').set;
    setter.call(field, ${JSON.stringify(value)});
    field.dispatchEvent(new Event('input', { bubbles: true }));
    field.dispatchEvent(new Event('change', { bubbles: true }));
  })()`);
}

async function state() {
  return evaluate(`({
    path: location.pathname,
    completion: document.querySelector('.lesson-completion strong')?.textContent?.trim() ?? '',
    feedback: document.querySelector('.activity-feedback')?.textContent?.trim() ?? '',
    completionDisabled: document.querySelector('.lesson-completion button')?.disabled ?? true,
  })`);
}

async function storage() {
  return evaluate(`({
    lesson: localStorage.getItem('bhavya-lesson:' + location.pathname.split('/').filter(Boolean).at(-1)),
    activity: localStorage.getItem('bhavya-activity:' + location.pathname.split('/').filter(Boolean).at(-1)),
  })`);
}

async function completeLesson() {
  const hasProject = await evaluate("Boolean(document.querySelector('#project-draft'))");
  if (hasProject) {
    await fillText('#project-draft', 'The claim is a forecast. I would inspect the evidence, source, and date. If uncertain, I would check before trust.');
    await click('.project-milestone .button');
    await waitForExpression("Boolean(document.querySelector('.project-feedback.success'))");
  }
  await evaluate(`(() => { const field = document.querySelector('#lesson-reflection'); if (!field) throw new Error('Reflection field is missing'); const setter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set; field.focus(); setter.call(field, 'I would test one more example and compare its evidence.'); field.dispatchEvent(new Event('input', { bubbles: true })); field.dispatchEvent(new Event('change', { bubbles: true })); return true; })()`);
  await wait(200);
  await click(".lesson-completion button");
  await wait(120);
  return { state: await state(), storage: await storage(), project: hasProject ? await evaluate(`({ complete: Boolean(document.querySelector('.project-feedback.success')), feedback: document.querySelector('.project-feedback')?.textContent?.trim() ?? '' })`) : null };
}

await send("Runtime.enable");
await send("Page.enable");
await send("Log.enable");
await send("Network.enable");

const report = {
  browser: "Chrome via Windows DevTools Protocol",
  home: {},
  interactions: {},
  responsive: {},
  keyboard: {},
};

await navigate("/learning/");
report.home = await evaluate(`({
  path: location.pathname,
  heading: document.querySelector('h1')?.textContent?.trim() ?? '',
  moduleCount: document.querySelectorAll('.module-card').length,
  firstLessonVisible: Boolean(document.querySelector('a[href*="/learning/what-is-a-computer/"]')),
})`);

await clearAndReload("/learning/coach/");
report.coach = { initial: await evaluate(`({ path: location.pathname, heading: document.querySelector('.coach-session h2')?.textContent?.trim() ?? '', profileSaved: Boolean(localStorage.getItem('bhavya-learner-profile')) })`) };
await fillText("#learner-name", "Asha");
await click(".coach-form .button");
await wait(100);
await fillText("#coach-answer", "It does something useful.");
await click(".coach-answer .button");
await wait(100);
report.coach.wrong = await evaluate(`({ feedback: document.querySelector('.coach-feedback')?.textContent?.trim() ?? '', attempts: document.querySelector('.coach-attempts')?.textContent?.trim() ?? '' })`);
await fillText("#coach-answer", "The input is received, instructions are followed, and an output is produced.");
await click(".coach-answer .button");
await wait(100);
report.coach.correct = await evaluate(`({ feedback: document.querySelector('.coach-feedback')?.textContent?.trim() ?? '', reviewSaved: Boolean(localStorage.getItem('bhavya-review:what-is-a-computer')), coachComplete: localStorage.getItem('bhavya-coach:what-is-a-computer') })`);

await clearAndReload("/learning/diagnostic/");
report.diagnostic = { initial: await evaluate(`({ path: location.pathname, question: document.querySelector('.diagnostic-card h2')?.textContent?.trim() ?? '', questionNumber: document.querySelector('.learning-status')?.textContent?.trim() ?? '' })`) };
await evaluate(`(() => { const input = document.querySelector('.diagnostic-options input[value="screen-keyboard"]'); if (!input) throw new Error('Diagnostic wrong-answer option is missing'); input.click(); return input.checked; })()`);
await waitForExpression("Boolean(document.querySelector('.diagnostic-options label.selected'))");
await click(".diagnostic-card form > .button");
await wait(80);
report.diagnostic.wrong = await evaluate(`({ feedback: document.querySelector('.diagnostic-feedback')?.textContent?.trim() ?? '', retryVisible: Boolean(document.querySelector('.diagnostic-feedback .button.light')) })`);
await click(".diagnostic-feedback .button.light");
await evaluate(`document.querySelector('.diagnostic-options input[value="input-output"]').click()`);
await click(".diagnostic-card form > .button");
await click(".diagnostic-feedback:not(.hint) .button");
await evaluate(`document.querySelector('.diagnostic-options input[value="context"]').click()`);
await click(".diagnostic-card form > .button");
await click(".diagnostic-feedback:not(.hint) .button");
await evaluate(`document.querySelector('.diagnostic-options input[value="test"]').click()`);
await click(".diagnostic-card form > .button");
await click(".diagnostic-feedback:not(.hint) .button");
await fillText("#diagnostic-answer", "Examples help a model find a pattern and make a prediction.");
await click(".diagnostic-card form > .button");
await click(".diagnostic-feedback:not(.hint) .button");
await wait(80);
report.diagnostic.result = await evaluate(`({ result: Boolean(document.querySelector('.diagnostic-result')), recommendation: document.querySelector('.diagnostic-recommendation h2')?.textContent?.trim() ?? '', saved: Boolean(localStorage.getItem('bhavya-diagnostic')) })`);
await navigate("/learning/");
report.diagnostic.pathChanged = await evaluate(`({ nextAction: document.querySelector('.desk-plan h3')?.textContent?.trim() ?? '', weakSlugs: JSON.parse(localStorage.getItem('bhavya-diagnostic') ?? '{}').weakSlugs ?? [] })`);

await clearAndReload("/learning/what-is-a-computer/");
report.interactions.sequence = { initial: await state() };
await click(".lesson-completion button");
report.interactions.sequence.beforeActivity = await state();
await click(".activity-frame .button");
await wait(80);
report.interactions.sequence.wrong = await state();
await click('.sequence-row:nth-child(2) button[aria-label*="up"]');
await wait(80);
await click('.sequence-row:nth-child(4) button[aria-label*="up"]');
await wait(80);
await click(".activity-frame .button");
await wait(80);
report.interactions.sequence.correct = await state();
report.interactions.sequence.completed = await completeLesson();
report.nextLessonHref = await evaluate("document.querySelector('.completion-actions a.button.light')?.getAttribute('href') ?? ''");
await click('.completion-actions a.button.light');
await waitForExpression("location.pathname.includes('/learning/what-is-data/')");
report.nextLessonPath = await evaluate("location.pathname");
await navigate("/learning/");
await waitForExpression("document.querySelectorAll('.module-card.is-complete').length === 1");
report.progressBeforeRefresh = await evaluate(`({
  heading: document.querySelector('.learning-progress h2')?.textContent?.trim() ?? '',
  completeCards: document.querySelectorAll('.module-card.is-complete').length,
})`);
await evaluate("location.reload()");
await waitForExpression("document.querySelectorAll('.module-card.is-complete').length === 1");
report.progressAfterRefresh = await evaluate(`({
  heading: document.querySelector('.learning-progress h2')?.textContent?.trim() ?? '',
  completeCards: document.querySelectorAll('.module-card.is-complete').length,
})`);
await click('a[href="/learning/what-is-data/"]');
await wait(700);

const cases = [
  {
    name: "dataset",
    path: "/learning/what-is-data/",
    wrong: async () => state(),
    act: async () => {
      await click(".filter-row button:nth-child(2)");
      await wait(100);
    },
  },
  {
    name: "decision",
    path: "/learning/algorithms-and-instructions/",
    wrong: async () => {
      await click(".choice-grid button:nth-child(2)");
      await wait(80);
      return state();
    },
    act: async () => {
      await click(".choice-grid button:nth-child(1)");
      await wait(80);
    },
  },
  {
    name: "classification",
    path: "/learning/what-is-ai/",
    wrong: async () => {
      await evaluate(`(() => {
        document.querySelectorAll('.classification-list select').forEach((element) => {
          const setter = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value').set;
          setter.call(element, 'ai');
          element.dispatchEvent(new Event('change', { bubbles: true }));
        });
      })()`);
      await wait(120);
      await click(".activity-frame .button");
      await wait(80);
      return state();
    },
    act: async () => {
      await evaluate(`(() => {
        const values = ['data', 'instructions', 'ai', 'not-ai'];
        document.querySelectorAll('.classification-list select').forEach((element, index) => {
          const setter = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value').set;
          setter.call(element, values[index]);
          element.dispatchEvent(new Event('change', { bubbles: true }));
        });
      })()`);
      await wait(120);
      await click(".activity-frame .button");
      await wait(80);
    },
  },
  {
    name: "model",
    path: "/learning/machine-learning-by-example/",
    wrong: async () => state(),
    act: async () => {
      await evaluate(`(() => {
        const element = document.querySelector('#threshold');
        const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
        setter.call(element, '70');
        element.dispatchEvent(new Event('input', { bubbles: true }));
        element.dispatchEvent(new Event('change', { bubbles: true }));
      })()`);
      await wait(120);
    },
  },
  {
    name: "verification",
    path: "/learning/classification-and-patterns/",
    wrong: async () => {
      await evaluate(`(() => {
        document.querySelectorAll('.verification-list > div').forEach((group) => group.querySelectorAll('button')[0].click());
      })()`);
      await wait(120);
      await click(".activity-frame .button");
      await wait(80);
      return state();
    },
    act: async () => {
      await evaluate(`(() => {
        const groups = document.querySelectorAll('.verification-list > div');
        [1, 0, 1].forEach((buttonIndex, index) => groups[index].querySelectorAll('button')[buttonIndex].click());
      })()`);
      await wait(80);
      await click(".activity-frame .button");
      await wait(80);
    },
  },
];

for (const lesson of cases) {
  await clearAndReload(lesson.path);
  const initial = await state();
  const wrong = await lesson.wrong();
  await lesson.act();
  const after = await state();
  let adaptiveBeforeProject = null;
  if (lesson.name === "verification") {
    await navigate("/learning/");
    adaptiveBeforeProject = await evaluate(`({ heading: document.querySelector('.desk-plan h3')?.textContent?.trim() ?? '', action: document.querySelector('.desk-plan .button')?.textContent?.trim() ?? '', href: document.querySelector('.desk-plan .button')?.getAttribute('href') ?? '' })`);
    await navigate(lesson.path);
  }
  const completed = await completeLesson();
  report.interactions[lesson.name] = { initial, wrong, after, adaptiveBeforeProject, completed };
}

await clearAndReload("/learning/what-is-data/");
await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
report.responsive.mobile = await evaluate(`({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth, overflow: document.documentElement.scrollWidth > innerWidth })`);
await send("Emulation.setDeviceMetricsOverride", { width: 768, height: 900, deviceScaleFactor: 1, mobile: true });
report.responsive.tablet = await evaluate(`({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth, overflow: document.documentElement.scrollWidth > innerWidth })`);
await send("Emulation.setDeviceMetricsOverride", { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
report.responsive.desktop = await evaluate(`({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth, overflow: document.documentElement.scrollWidth > innerWidth })`);
await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
report.responsive.reducedMotion = await evaluate(`({ matches: matchMedia('(prefers-reduced-motion: reduce)').matches })`);
await send("Emulation.setEmulatedMedia", { features: [] });
await send("Emulation.clearDeviceMetricsOverride");

await clearAndReload("/learning/what-is-a-computer/");
await pressKey("Tab", "Tab", 9);
report.keyboard.firstTab = await evaluate(`({
  tag: document.activeElement?.tagName ?? '',
  name: document.activeElement?.getAttribute('aria-label') ?? document.activeElement?.textContent?.trim()?.slice(0, 60) ?? '',
})`);
for (let index = 0; index < 9; index += 1) {
  await pressKey("Tab", "Tab", 9);
}
report.keyboard.activityControl = await evaluate(`({
  tag: document.activeElement?.tagName ?? '',
  text: document.activeElement?.textContent?.trim() ?? '',
})`);
await evaluate("document.querySelector('.activity-frame .button')?.focus()");
await pressKey("Enter", "Enter", 13);
await wait(120);
report.keyboard.afterEnter = await state();
await evaluate(`document.querySelector('.sequence-row:nth-child(2) button[aria-label*="up"]')?.focus()`);
await pressKey("Enter", "Enter", 13);
await evaluate(`document.querySelector('.sequence-row:nth-child(4) button[aria-label*="up"]')?.focus()`);
await pressKey("Enter", "Enter", 13);
await evaluate("document.querySelector('.activity-frame .button')?.focus()");
await pressKey("Enter", "Enter", 13);
await wait(120);
report.keyboard.afterCorrection = await state();

report.runtime = {
  exceptions: runtimeEvents.filter((event) => event.type === "exception"),
  errors: runtimeEvents.filter((event) => event.type !== "exception"),
};
report.failedRequests = failedRequests;

console.log(JSON.stringify(report, null, 2));
socket.close();
