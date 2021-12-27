document.querySelector(".documents").style.marginLeft = "0";

const addBtn = document.querySelector("#add");
const backBtn = document.querySelector("#back");

const regOpenForDocs = (paramDot) => {
    let dots;

    if (paramDot) {
        dots = [paramDot];
    } else {
        dots = document.querySelectorAll(".title-dot");
    }

    for (let dot of dots) {
        dot.addEventListener("click", () => {
            // RESET
            const activeDoc = document.querySelector(".active-doc");
            if (activeDoc) {
                activeDoc.classList.remove("active-doc");
            }

            dot.parentElement.classList.add("active-doc");
            backBtn.style.display = "inline-block";
        });
    }
};

const back = () => {
    document.querySelector(".active-doc").classList.remove("active-doc");
    backBtn.style.display = "none";
};

const addDoc = (e) => {
    // outer doc
    const doc = document.createElement("div");
    doc.classList.add("document");
    doc.setAttribute("draggable", "true");

    // bullet
    const titleDot = document.createElement("div");
    titleDot.classList.add("title-dot");

    const actualDot = document.createElement("div");
    actualDot.classList.add("actual-dot");
    titleDot.appendChild(actualDot);

    // title
    const title = document.createElement("INPUT");
    title.classList.add("title");
    title.value = "New Document";
    title.setAttribute("type", "text");

    // insert in doc
    doc.appendChild(titleDot);
    doc.appendChild(title);

    const docActive = document.querySelector(".active-doc");
    if (!docActive) {
        // Insert in overall
        document.querySelector(".documents").appendChild(doc);
    } else {
        // Insert in the opened one
        if (docActive.children[1].nextElementSibling) {
            const docs = docActive.children[1].nextElementSibling;
            docs.appendChild(doc);
        } else {
            const docs = document.createElement("div");
            docs.classList.add("documents");
            regDragOver(docs);

            docs.appendChild(doc);
            docActive.appendChild(docs);
        }
    }

    regOpenForDocs(titleDot);
    regDrag(doc);
};

const regDrag = (newElem) => {
    let docs;

    if (newElem) {
        docs = [newElem];
    } else {
        docs = document.querySelectorAll(".document");
    }

    for (let doc of docs) {
        doc.addEventListener("dragstart", () => {
            doc.classList.add("dragging");
        });
        doc.addEventListener("dragend", () => {
            doc.classList.remove("dragging");
        });
    }
};

const regDragOver = (newElem) => {
    let conts;
    if (newElem) {
        conts = [newElem];
    } else {
        conts = document.querySelectorAll(".documents");
    }

    for (let cont of conts) {
        cont.addEventListener("dragover", (e) => {
            e.preventDefault();
            const afterElem = getDragAfterElem(cont, e.clientY);
            const draggable = document.querySelector(".dragging");

            if (afterElem === null) {
                cont.appendChild(draggable);
            } else {
                cont.insertBefore(draggable, afterElem);
            }
        });
    }
};

function getDragAfterElem(container, y) {
    const draggableElems = [
        ...container.querySelectorAll(".document:not(.dragging)"),
    ];

    return draggableElems.reduce(
        (closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;

            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, elem: child };
            } else {
                return closest;
            }
        },
        { offset: Number.NEGATIVE_INFINITY }
    ).elem;
}

// Primary call
regOpenForDocs();
regDrag();
regDragOver();
