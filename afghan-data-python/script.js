let translations = {};
let currentLang = "en";

function setLang(lang) {
    currentLang = lang;
    document.body.setAttribute("lang", lang);
    document.getElementById("title").textContent = translations[lang]["title"];
    document.getElementById("start-lesson").textContent = translations[lang]["start_lesson"];
    document.getElementById("lang-label").textContent = translations[lang]["select_language"];
}

function loadTranslations() {
    fetch("i18n/en.json").then(res => res.json()).then(data => {
        translations["en"] = data;
        fetch("i18n/fa.json").then(res => res.json()).then(data => {
            translations["fa"] = data;
            setLang("en");
        });
    });
}

function loadLesson() {
    fetch("lessons/lesson1_variables.json")
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById("lesson-container");
            const step = data.steps[0];
            container.textContent = step.instruction[currentLang];
        });
}

document.getElementById("lang-select").addEventListener("change", (e) => {
    setLang(e.target.value);
});

loadTranslations();
