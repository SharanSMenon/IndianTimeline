import events from "./data.json"

interface TimelineEvent {
    year: string | number
    date: string
    content: string
}

function elemClassName(elemName: string, cName: string): HTMLElement {
    let elem = document.createElement(elemName)
    elem.className = cName;
    return elem
}

let divClassName = cName => elemClassName("div", cName);

function createEvent(event: TimelineEvent, direction: string) {
    let eventContainer = divClassName(`event ${direction}`)

    let itemsContainer = divClassName("items");
    let topMatter = divClassName("topMatter")

    let titleBlock = elemClassName("h2", "year");
    titleBlock.innerText = "" + event.year;


    if (event.date != "None") {
        let span = elemClassName("span", "name");
        span.innerText = event.date;
        titleBlock.appendChild(span);
    }

    let content = divClassName("content")
    if (event.content != "Marker") {
        content.innerText = event.content;
    } else {
        titleBlock.classList.add("marker")
        eventContainer.id = ("" + event.year).trim();
    }

    topMatter.appendChild(titleBlock);
    itemsContainer.appendChild(topMatter)
    itemsContainer.appendChild(content);
    eventContainer.appendChild(itemsContainer);
    return eventContainer
}

function generateNavigation(markers: TimelineEvent[]) {
    let header = document.getElementById("header");
    markers.forEach((marker) => {
        let container = divClassName("navigation-item")
        let link = elemClassName("a", "nav-link")
        link.innerText = ("" + marker.year).trim();
        link.setAttribute("href", "#" + marker.year)

        container.appendChild(link);
        header?.appendChild(container);
    })
}

function main() {
    let timeline = document.getElementById("timeline")
    let markers = events.filter((event) => event.content == "Marker")
    generateNavigation(markers);

    events.forEach((event, i) => {
        let direction = i % 2 == 0 ? "left" : "right"
        let element = createEvent(event, direction);
        timeline?.appendChild(element);
    })


}

main()