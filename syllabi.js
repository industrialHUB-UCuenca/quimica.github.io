const syllabiMetrics = document.querySelector("#syllabiMetrics");
const syllabiSearch = document.querySelector("#syllabiSearch");
const syllabiLevel = document.querySelector("#syllabiLevel");
const syllabiGroup = document.querySelector("#syllabiGroup");
const syllabiList = document.querySelector("#syllabiList");
const syllabiPreview = document.querySelector("#syllabiPreview");

const syllabiItems = syllabiContentData.items
  .slice()
  .sort((a, b) => a.level - b.level || a.title.localeCompare(b.title, "es") || String(a.group).localeCompare(String(b.group), "es"));

let activeQuery = "";
let activeLevel = "all";
let activeGroup = "all";
let activeSyllabusId = syllabiItems[0]?.id || "";

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

function unique(values) {
  return [...new Set(values.filter((value) => value !== null && value !== undefined && value !== ""))].sort((a, b) =>
    String(a).localeCompare(String(b), "es", { numeric: true }),
  );
}

function hoursValue(value) {
  return value ? Number(value).toLocaleString("es-EC") : "N/D";
}

function countLabel(count, singular, plural) {
  return `${count} ${count === 1 ? singular : plural}`;
}

function syllabusText(item) {
  return [
    item.title,
    item.code,
    item.group,
    item.level,
    item.description,
    ...item.teachers.map((teacher) => `${teacher.name} ${teacher.email}`),
    ...item.units.flatMap((unit) => [unit.title, ...unit.subunits.map((subunit) => subunit.title)]),
  ].join(" ");
}

function filteredSyllabi() {
  const query = normalize(activeQuery);
  return syllabiItems.filter((item) => {
    const matchesLevel = activeLevel === "all" || String(item.level) === activeLevel;
    const matchesGroup = activeGroup === "all" || String(item.group || "Sin grupo") === activeGroup;
    const matchesQuery = !query || normalize(syllabusText(item)).includes(query);
    return matchesLevel && matchesGroup && matchesQuery;
  });
}

function selectedSyllabus(items = filteredSyllabi()) {
  return syllabiItems.find((item) => item.id === activeSyllabusId) || items[0] || syllabiItems[0];
}

function matchingUnits(item) {
  const query = normalize(activeQuery);
  if (!query) return item.units;
  return item.units
    .map((unit) => {
      const unitMatch = normalize(unit.title).includes(query);
      const subunits = unit.subunits.filter((subunit) => unitMatch || normalize(subunit.title).includes(query));
      if (unitMatch || subunits.length) return { ...unit, subunits };
      return null;
    })
    .filter(Boolean);
}

function renderMetrics() {
  const levels = unique(syllabiItems.map((item) => item.level));
  syllabiMetrics.innerHTML = `
    <article><strong>${syllabiContentData.summary.count}</strong><span>sílabos</span></article>
    <article><strong>${levels.length}</strong><span>ciclos</span></article>
    <article><strong>${syllabiContentData.summary.units}</strong><span>unidades</span></article>
    <article><strong>${syllabiContentData.summary.subunits}</strong><span>subunidades</span></article>
  `;
}

function renderControls() {
  const levels = unique(syllabiItems.map((item) => item.level)).sort((a, b) => Number(a) - Number(b));
  const groups = unique(syllabiItems.map((item) => String(item.group || "Sin grupo")));

  syllabiLevel.innerHTML = [
    `<option value="all">Todos los ciclos</option>`,
    ...levels.map((level) => `<option value="${level}" ${String(level) === activeLevel ? "selected" : ""}>Ciclo ${level}</option>`),
  ].join("");

  syllabiGroup.innerHTML = [
    `<option value="all">Todos</option>`,
    ...groups.map((group) => `<option value="${escapeHtml(group)}" ${group === activeGroup ? "selected" : ""}>${escapeHtml(group)}</option>`),
  ].join("");
}

function renderList() {
  const items = filteredSyllabi();
  if (!items.some((item) => item.id === activeSyllabusId)) {
    activeSyllabusId = items[0]?.id || syllabiItems[0]?.id || "";
  }

  syllabiList.innerHTML = items.length
    ? items
        .map((item) => {
          const units = matchingUnits(item);
          const unitCount = units.length || item.unitCount;
          const teacher = item.teachers[0]?.name || "Docente no registrado";
          return `
            <button type="button" class="syllabus-card" data-syllabus="${escapeHtml(item.id)}" aria-pressed="${item.id === activeSyllabusId}">
              <span>Ciclo ${item.level || "N/D"}${item.group ? ` / Grupo ${escapeHtml(item.group)}` : ""}</span>
              <strong>${escapeHtml(item.title)}</strong>
              <small>${escapeHtml(teacher)}</small>
              <em>${countLabel(unitCount, "unidad", "unidades")} / ${countLabel(item.subunitCount, "subunidad", "subunidades")}</em>
            </button>
          `;
        })
        .join("")
    : `<article class="empty-state">No hay sílabos con los filtros activos.</article>`;
}

function renderUnits(item) {
  const units = matchingUnits(item);
  if (!units.length) {
    return `<article class="empty-state">No se encontraron unidades relacionadas con la búsqueda actual.</article>`;
  }

  return `
    <div class="syllabi-content-units">
      ${units
        .map(
          (unit, index) => `
            <article class="syllabi-unit-card">
              <button type="button" class="syllabi-unit-trigger" aria-expanded="${index === 0 ? "true" : "false"}">
                <span>${escapeHtml(unit.code)}</span>
                <strong>${escapeHtml(unit.title)}</strong>
                <em>${countLabel(unit.subunits.length, "subunidad", "subunidades")}</em>
              </button>
              <div class="syllabi-subunit-list" ${index === 0 ? "" : "hidden"}>
                ${
                  unit.subunits.length
                    ? unit.subunits
                        .map(
                          (subunit) => `
                            <div>
                              <span>${escapeHtml(subunit.code)}</span>
                              <p>${escapeHtml(subunit.title)}</p>
                            </div>
                          `,
                        )
                        .join("")
                    : `<p>Esta unidad no registra subunidades separadas en el texto extraído.</p>`
                }
              </div>
            </article>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderSimilar(item) {
  const similar = syllabiContentData.similar[item.id] || [];
  if (!similar.length) return `<p class="syllabi-similar-empty">No se detectaron relaciones temáticas cercanas.</p>`;

  return `
    <div class="syllabi-similar-list">
      ${similar
        .map(
          (entry) => `
            <button type="button" data-syllabus="${escapeHtml(entry.id)}">
              <span>Ciclo ${entry.level} / ${(entry.score * 100).toFixed(0)}% afinidad</span>
              <strong>${escapeHtml(entry.title)}</strong>
              <small>${entry.keywords.length ? escapeHtml(entry.keywords.join(" / ")) : "Temas compartidos"}</small>
            </button>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderPreview() {
  const item = selectedSyllabus();
  if (!item) {
    syllabiPreview.innerHTML = `<article class="empty-state">Selecciona un sílabo para explorar contenidos.</article>`;
    return;
  }

  syllabiPreview.innerHTML = `
    <div class="syllabi-preview-head">
      <span>Ciclo ${item.level || "N/D"}${item.group ? ` / Grupo ${escapeHtml(item.group)}` : ""}</span>
      <h2>${escapeHtml(item.title)}</h2>
      <p>${escapeHtml(item.description || "Descripción no disponible en el texto extraído.")}</p>
      <div class="syllabi-load-grid" aria-label="Carga horaria del sílabo">
        <div><strong>${hoursValue(item.hours.acd)}</strong><span>ACD</span></div>
        <div><strong>${hoursValue(item.hours.ape)}</strong><span>APE</span></div>
        <div><strong>${hoursValue(item.hours.aa)}</strong><span>AA</span></div>
        <div><strong>${item.credits || "N/D"}</strong><span>Créditos</span></div>
      </div>
      <div class="syllabi-teacher-list">
        ${
          item.teachers.length
            ? item.teachers
                .map(
                  (teacher) => `
                    <span>${escapeHtml(teacher.name)}${teacher.email ? ` / ${escapeHtml(teacher.email)}` : ""}</span>
                  `,
                )
                .join("")
            : `<span>Docente no registrado</span>`
        }
      </div>
    </div>
    <section class="syllabi-content-panel">
      <div class="section-heading compact">
        <p class="kicker">Contenidos categorizados</p>
        <h3>Unidades y subunidades</h3>
      </div>
      ${renderUnits(item)}
    </section>
    <section class="syllabi-content-panel">
      <div class="section-heading compact">
        <p class="kicker">Relaciones temáticas</p>
        <h3>Sílabos relacionados</h3>
      </div>
      ${renderSimilar(item)}
    </section>
  `;
}

function render() {
  renderControls();
  renderList();
  renderPreview();
}

syllabiSearch.addEventListener("input", (event) => {
  activeQuery = event.target.value;
  render();
});

syllabiLevel.addEventListener("change", (event) => {
  activeLevel = event.target.value;
  render();
});

syllabiGroup.addEventListener("change", (event) => {
  activeGroup = event.target.value;
  render();
});

document.addEventListener("click", (event) => {
  const syllabusCard = event.target.closest("[data-syllabus]");
  if (syllabusCard) {
    activeSyllabusId = syllabusCard.dataset.syllabus;
    render();
    return;
  }

  const trigger = event.target.closest(".syllabi-unit-trigger");
  if (!trigger) return;
  const content = trigger.nextElementSibling;
  const expanded = trigger.getAttribute("aria-expanded") === "true";
  trigger.setAttribute("aria-expanded", String(!expanded));
  if (content) content.hidden = expanded;
});

renderMetrics();
render();
