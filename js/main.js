document.querySelector(".documents").style.marginLeft = "0";

const addBtn = document.querySelector("#add");
const backBtn = document.querySelector("#back");

const RegOpenForDocs = (paramDot) => {
    // const docs = document.querySelectorAll(".document");
    let dots;

    if (paramDot) {
        dots = [paramDot];
    } else {
        dots = document.querySelectorAll(".title-dot");
    }

    for (let dot of dots) {
        dot.addEventListener("click", (e) => {
            // RESET
            const activeDoc = document.querySelector(".active-doc");
            if (activeDoc) {
                activeDoc.classList.remove("active-doc");
            }

            let doc = dot.parentElement;
            doc.classList.add("active-doc");

            // clear other documents
            // for (let sibling of doc.parentElement.children) {
            //     sibling.style.display = "none";
            // }

            // get all the documents classes from the parent, compare to current and make others disappear

            if (doc.children[2]) {
                for (let subDoc of doc.children[2].children) {
                    subDoc.style.display = "flex";
                }
            }

            // dot
            // title
            // doc.children[1].classList.add("title-active");

            // back btn
            backBtn.style.display = "inline-block";
        });
    }
};

const back = () => {
    // bring back docs
    const docs = document.querySelectorAll(".document");
    for (let doc of docs) {
        doc.style.display = "flex";
    }

    // title reset
    document.querySelector(".active-doc").classList.remove("active-doc");

    // back btn
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

    // insert in overall docs
    // document.querySelector(".documents").appendChild(doc);

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
