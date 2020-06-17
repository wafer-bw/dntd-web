function tagOnClick(event, query) {
    if (!event.metaKey && !event.ctrlKey) { return }
    let el = document.getElementById("searchQuery");
    if (el !== null) {
        el.innerText = (el.innerText !== query) ? query : "";
        el.dispatchEvent(new Event("input"));
    }
}
