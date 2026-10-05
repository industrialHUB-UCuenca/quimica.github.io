const courseByCode = new Map(iqCurriculum.map((course) => [course.code, course]));
const levels = [...new Set(iqCurriculum.map((course) => course.level))].sort((a, b) => a - b);
const dependentsByCode = new Map(iqCurriculum.map((course) => [course.code, []]));

iqCurriculum.forEach((course) => {
  course.prerequisites.forEach((code) => {
    if (dependentsByCode.has(code)) dependentsByCode.get(code).push(course.code);
  });
});

const courseSelect = document.querySelector("#mallaCourseSelect");
const relationSelect = document.querySelector("#mallaRelationSelect");
const grid = document.querySelector("#mallaGrid");
const summary = document.querySelector("#mallaMapSummary");

function relationState(selectedCode, mode) {
  const selected = courseByCode.get(selectedCode);
  const prerequisites = new Set((selected?.prerequisites || []).filter((code) => courseByCode.has(code)));
  const corequisites = new Set((selected?.corequisites || []).filter((code) => courseByCode.has(code)));
  const dependents = new Set(dependentsByCode.get(selectedCode) || []);
  const active = new Set([selectedCode]);

  if (mode === "prerequisites" || mode === "all") prerequisites.forEach((code) => active.add(code));
  if (mode === "corequisites" || mode === "all") corequisites.forEach((code) => active.add(code));
  if (mode === "dependents" || mode === "all") dependents.forEach((code) => active.add(code));

  return { selected, prerequisites, corequisites, dependents, active };
}

function hoursLabel(course) {
  return `ACD ${course.acd} · APE ${course.ape} · AA ${course.aa}`;
}

function renderSelects() {
  courseSelect.innerHTML = iqCurriculum
    .map((course) => `<option value="${course.code}">${course.level}. ${course.title}</option>`)
    .join("");
  courseSelect.value = "INGE-00024";
  relationSelect.value = "all";
}

function renderGrid() {
  grid.innerHTML = levels
    .map((level) => {
      const courses = iqCurriculum.filter((course) => course.level === level);
      return `
        <section class="malla-level requests-map-level" aria-label="Nivel ${level}">
          <header class="requests-map-level__head">
            <span>Nivel ${level}</span>
            <small>${courses.length} asignaturas</small>
          </header>
          <div class="requests-map-courses">
            ${courses
              .map(
                (course) => `
                  <button class="malla-course requests-map-course" type="button" data-course="${course.code}">
                    <span>${course.code}</span>
                    <strong>${course.title}</strong>
                    <small>${hoursLabel(course)}</small>
                  </button>
                `,
              )
              .join("")}
          </div>
        </section>
      `;
    })
    .join("");
}

function updateView() {
  const selectedCode = courseSelect.value;
  const mode = relationSelect.value;
  const state = relationState(selectedCode, mode);

  document.querySelectorAll(".malla-course").forEach((button) => {
    const code = button.dataset.course;
    const isSelected = code === selectedCode;
    const isPrerequisite = state.prerequisites.has(code) && (mode === "prerequisites" || mode === "all");
    const isCorequisite = state.corequisites.has(code) && (mode === "corequisites" || mode === "all");
    const isDependent = state.dependents.has(code) && (mode === "dependents" || mode === "all");

    button.classList.toggle("requests-map-course--current", isSelected);
    button.classList.toggle("requests-map-course--prerequisite", isPrerequisite);
    button.classList.toggle("requests-map-course--corequisite", isCorequisite);
    button.classList.toggle("requests-map-course--next", isDependent);
    button.classList.toggle("requests-map-course--dimmed", !state.active.has(code));
  });

  const nextCourses = [...state.dependents].map((code) => courseByCode.get(code)).filter(Boolean);
  summary.innerHTML = `
    <article>
      <strong>${state.selected.title}</strong>
      <span>${state.selected.code} / Nivel ${state.selected.level}</span>
    </article>
    <article>
      <strong>${state.prerequisites.size}</strong>
      <span>prerrequisitos directos</span>
    </article>
    <article>
      <strong>${nextCourses.length}</strong>
      <span>asignaturas dependientes</span>
    </article>
    <article>
      <strong>${hoursLabel(state.selected)}</strong>
      <span>horas de la asignatura</span>
    </article>
  `;
}

renderSelects();
renderGrid();
updateView();

courseSelect.addEventListener("change", updateView);
relationSelect.addEventListener("change", updateView);
grid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-course]");
  if (!button) return;
  courseSelect.value = button.dataset.course;
  updateView();
});
