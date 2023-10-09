var table = document.getElementById("results"),
  text = document.getElementById("text"),
  loader = document.getElementById("loader"),
  error = document.getElementById("error");
text.addEventListener("input", () => {
  const e = text.value.trim();
  if ("" === e)
    return (table.style.display = "none"), void (error.innerText = "");
  (loader.style.display = "block"),
    fetch(`https://api.tvmaze.com/search/shows?q=${e}`)
      .then((e) => e.json())
      .then((e) => {
        setTimeout(() => {
          const t = table.querySelector("tbody");
          (t.innerHTML = ""),
            0 === e.length
              ? ((error.innerText = "Nema rezultata."),
                (table.style.display = "none"))
              : ((error.innerText = ""),
                e.forEach((e) => {
                  const n = e.show,
                    r = document.createElement("tr"),
                    a = document.createElement("td");
                  a.innerText = n.name || "";
                  const d = document.createElement("td");
                  d.innerHTML = n.summary || "";
                  const l = document.createElement("td");
                  l.innerHTML = `<img src="${
                    n.image ? n.image.medium : ""
                  }" width="50" height="50" />`;
                  const o = document.createElement("td");
                  o.innerText = n.genres || "";
                  const i = document.createElement("td");
                  (i.innerText = n.rating ? n.rating.average : ""),
                    r.appendChild(a),
                    r.appendChild(d),
                    r.appendChild(l),
                    r.appendChild(o),
                    r.appendChild(i),
                    t.appendChild(r);
                }),
                (table.style.display = "table")),
            (loader.style.display = "none");
        }, 2e3);
      })
      .catch((e) => console.error(e));
});
