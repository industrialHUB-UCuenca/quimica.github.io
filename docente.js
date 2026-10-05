const facultyGrid = document.querySelector("#facultyGrid");
const facultyStats = document.querySelector("#facultyStats");
const facultyDetail = document.querySelector("#facultyDetail");
const searchInput = document.querySelector("#facultySearch");
const levelSelect = document.querySelector("#facultyLevel");
const loadSelect = document.querySelector("#facultyLoad");

let activeQuery = "";
let activeLevel = "all";
let activeLoad = "all";
let activeTeacherKey = "";

const directorKeys = new Set(["JORGE DELGADO"]);
const technicalTeacherKeys = new Set(["VERONICA SAETAMA", "JAIME CUENCA", "MARCELA IDROVO", "PABLO CASTRO", "PAULINA ESCOBAR"]);

function normalize(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function displayHours(value) {
  return value ? value : "0";
}

function teacherLevels(teacher) {
  return [...new Set(teacher.courses.map((course) => course.level).filter(Boolean))].sort((a, b) => a - b);
}

function cyclesLabel(courses) {
  const cycles = [...new Set(courses.map((course) => course.level).filter(Boolean))].sort((a, b) => a - b);
  if (!cycles.length) return "Ciclo no registrado";
  return `${cycles.length === 1 ? "Ciclo" : "Ciclos"} ${cycles.join(" / ")}`;
}

function teacherTotalHours(teacher) {
  return teacher.totalAcd + teacher.totalApe;
}

function matchesLoad(teacher) {
  if (activeLoad === "high") return teacherTotalHours(teacher) >= 12 || teacher.courseCount >= 4;
  if (activeLoad === "medium") return teacher.courseCount > 1 && teacherTotalHours(teacher) < 12;
  if (activeLoad === "single") return teacher.courseCount === 1;
  return true;
}

function visibleCourses(teacher) {
  if (activeLevel === "all") return teacher.courses;
  return teacher.courses.filter((course) => String(course.level) === activeLevel);
}

function courseTotals(courses) {
  return courses.reduce(
    (totals, course) => ({
      acd: totals.acd + course.acdTotal,
      ape: totals.ape + course.apeTotal,
    }),
    { acd: 0, ape: 0 },
  );
}

function filteredFaculty() {
  const query = normalize(activeQuery);
  return facultyTeachingData
    .filter((teacher) => {
      const courses = visibleCourses(teacher);
      const haystack = normalize([teacher.name, teacher.key, ...teacher.courses.map((course) => course.subject)].join(" "));
      return courses.length && matchesLoad(teacher) && (!query || haystack.includes(query));
    })
    .sort((a, b) => teacherTotalHours(b) - teacherTotalHours(a) || a.name.localeCompare(b.name));
}

function renderAvatar(teacher, size = "card") {
  if (teacher.photo) {
    return `<img src="${escapeHtml(teacher.photo)}" alt="${escapeHtml(teacher.name)}" loading="lazy" />`;
  }
  return `<span class="faculty-initials faculty-initials--${size}" aria-hidden="true">${escapeHtml(teacher.initials)}</span>`;
}

function renderControls() {
  const levels = [...new Set(facultyTeachingData.flatMap((teacher) => teacher.courses.map((course) => course.level)).filter(Boolean))].sort(
    (a, b) => a - b,
  );

  levelSelect.innerHTML = [
    `<option value="all">Todos los ciclos</option>`,
    ...levels.map((level) => `<option value="${level}">Ciclo ${level}</option>`),
  ].join("");
  levelSelect.value = activeLevel;
}

function renderStats(people) {
  const visibleAssignments = people.reduce((sum, teacher) => sum + visibleCourses(teacher).length, 0);
  const totalAcd = people.reduce((sum, teacher) => sum + visibleCourses(teacher).reduce((courseSum, course) => courseSum + course.acdTotal, 0), 0);
  const totalApe = people.reduce((sum, teacher) => sum + visibleCourses(teacher).reduce((courseSum, course) => courseSum + course.apeTotal, 0), 0);

  facultyStats.innerHTML = `
    <article><strong>${people.length}</strong><span>docentes</span></article>
    <article><strong>${visibleAssignments}</strong><span>asignaciones</span></article>
    <article><strong>${totalAcd}</strong><span>horas ACD</span></article>
    <article><strong>${totalApe}</strong><span>horas APE</span></article>
  `;
}

function renderFacultyGrid(people) {
  if (!people.some((teacher) => teacher.key === activeTeacherKey)) {
    activeTeacherKey = people[0]?.key || facultyTeachingData[0]?.key || "";
  }

  const renderCard = (teacher) => {
    const courses = visibleCourses(teacher);
    const totals = courseTotals(courses);
    return `
      <button class="faculty-page-card" type="button" data-teacher="${escapeHtml(teacher.key)}" aria-pressed="${teacher.key === activeTeacherKey}">
        ${renderAvatar(teacher)}
        <div>
          <span>${escapeHtml(cyclesLabel(courses))}</span>
          <strong>${escapeHtml(teacher.name)}</strong>
          <p>ACD ${totals.acd} / APE ${totals.ape} / Total ${totals.acd + totals.ape}</p>
          <small>${courses.length} asignatura${courses.length === 1 ? "" : "s"}</small>
        </div>
      </button>
    `;
  };

  const sections = [
    {
      title: "Director de carrera",
      people: people.filter((teacher) => directorKeys.has(teacher.key)),
    },
    {
      title: "Técnicos docentes",
      people: people.filter((teacher) => technicalTeacherKeys.has(teacher.key)),
    },
    {
      title: "Planta docente",
      people: people.filter((teacher) => !directorKeys.has(teacher.key) && !technicalTeacherKeys.has(teacher.key)),
    },
  ].filter((section) => section.people.length);

  facultyGrid.innerHTML = people.length
    ? sections
        .map(
          (section) => `
            <section class="faculty-card-section">
              <h3>${section.title}</h3>
              <div>${section.people.map(renderCard).join("")}</div>
            </section>
          `,
        )
        .join("")
    : `<article class="empty-state">No hay docentes con los filtros activos.</article>`;
}

function renderCourse(course) {
  const level = course.level ? `Ciclo ${course.level}` : "Ciclo no registrado";
  const parallel = course.parallel ? ` / Paralelo ${escapeHtml(course.parallel)}` : "";
  return `
    <article>
      <span>${level}${parallel}</span>
      <strong>${escapeHtml(course.subject)}</strong>
      <small>ACD ${displayHours(course.acd)} / APE ${displayHours(course.ape)}</small>
    </article>
  `;
}

function renderDetail() {
  const teacher = facultyTeachingData.find((item) => item.key === activeTeacherKey) || facultyTeachingData[0];
  if (!teacher) return;

  const courses = visibleCourses(teacher);
  const totals = courseTotals(courses);
  facultyDetail.innerHTML = `
    <div class="faculty-detail-head">
      ${renderAvatar(teacher, "detail")}
      <div>
        <p class="kicker">Detalle docente</p>
        <h2>${escapeHtml(teacher.name)}</h2>
        <p>${teacher.courseCount} asignatura${teacher.courseCount === 1 ? "" : "s"} registradas</p>
      </div>
    </div>
    <div class="faculty-detail-kpis">
      <div><strong>${courses.length}</strong><span>asignaturas</span></div>
      <div><strong>${totals.acd}</strong><span>horas ACD</span></div>
      <div><strong>${totals.ape}</strong><span>horas APE</span></div>
    </div>
    <div class="faculty-detail-meta">
      ${teacherLevels(teacher)
        .map((level) => `<span>Ciclo ${level}</span>`)
        .join("")}
    </div>
    <div class="faculty-subject-list">
      ${courses.length ? courses.map(renderCourse).join("") : `<article><strong>Sin asignaturas en el nivel seleccionado</strong></article>`}
    </div>
  `;
}

function render() {
  const people = filteredFaculty();
  renderStats(people);
  renderFacultyGrid(people);
  renderDetail();
}

renderControls();
render();

searchInput.addEventListener("input", (event) => {
  activeQuery = event.target.value;
  render();
});

levelSelect.addEventListener("change", (event) => {
  activeLevel = event.target.value;
  render();
});

loadSelect.addEventListener("change", (event) => {
  activeLoad = event.target.value;
  render();
});

facultyGrid.addEventListener("click", (event) => {
  const card = event.target.closest("[data-teacher]");
  if (!card) return;
  activeTeacherKey = card.dataset.teacher;
  render();
});
