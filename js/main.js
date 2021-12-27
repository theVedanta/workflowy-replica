document.querySelector(".documents").style.marginLeft = "0";

const addBtn = document.querySelector("#add");
const backBtn = document.querySelector("#back");

const RegOpenForDocs = (paramDot) => {
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

            docs.appendChild(doc);
            docActive.appendChild(docs);
        }
    }

    RegOpenForDocs(titleDot);
};

// Primary call
RegOpenForDocs();
