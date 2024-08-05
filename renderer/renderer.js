const locations = ["luz_guarita", "ar_guarita", "luz_estacionamento", "luz_galpao_externo", "luz_galpao_interno", "luz_escritorios", "ar_escritorios", "luz_sala_reunioes", "ar_sala_reunioes"];
const wrapper = document.getElementById("wrapper");

const getAllButton = document.getElementById("get-all");

class Message {
    constructor(command, locate, value, status) {
        this.command = command;
        this.locate = locate;
        this.value = value;
        this.status = status
    }
}

warmupLocations();

getAllButton.addEventListener("click", (event) => {
    let msg = new Message("get_all");

    ipcRenderer.send('message', JSON.stringify(msg));
})

function warmupLocations() {
    locations.forEach((location) => {
        const locationTitle = document.createElement("h3");
        locationTitle.innerText = location.replace('_', ' ');

        const statusWrapper = document.createElement("div");
        statusWrapper.setAttribute("class", "status-wrapper");

        const statusText = document.createElement("p");
        statusText.innerText = "Status: ";

        const statusValue = document.createElement("p");
        statusValue.innerText = "";
        statusValue.setAttribute("class", "status-indicator");
        statusValue.setAttribute("id", location);

        statusWrapper.append(statusText);
        statusWrapper.append(statusValue);

        const leftInfo = document.createElement("div");
        leftInfo.setAttribute("class", "left-info");
        leftInfo.appendChild(locationTitle);
        leftInfo.appendChild(statusWrapper);

        const getButton = document.createElement("button");
        getButton.innerText = "Get";
        getButton.addEventListener("click", onGetPressed);

        const onButton  = document.createElement("button");
        onButton.innerText = "On";
        onButton.addEventListener("click", onOnPressed);

        const offButton = document.createElement("button");
        offButton.innerText = "Off";
        offButton.addEventListener("click", onOffPressed);

        const rightInfo = document.createElement("div");
        rightInfo.setAttribute("id", locations.indexOf(location).toString());
        rightInfo.setAttribute("class", "right-info");
        rightInfo.appendChild(getButton);
        rightInfo.appendChild(onButton);
        rightInfo.appendChild(offButton);

        const locateDiv = document.createElement("div");
        locateDiv.setAttribute("class", "locate");
        locateDiv.appendChild(leftInfo);
        locateDiv.appendChild(rightInfo);

        wrapper.appendChild(locateDiv);
    });
}

//TODO: MAKE THIS BETTER
function onGetPressed(event) {
    let id = event.target.parentNode.getAttribute("id");
    let msg = new Message("get", locations.at(parseInt(id, 10)));

    ipcRenderer.send('message', JSON.stringify(msg));
}

function onOnPressed(event) {
    let id = event.target.parentNode.getAttribute("id");
    let msg = new Message("set", locations.at(parseInt(id, 10)), "on");

    ipcRenderer.send('message', JSON.stringify(msg));
}

function onOffPressed(event) {
    let id = event.target.parentNode.getAttribute("id");
    let msg = new Message("set", locations.at(parseInt(id, 10)), "off");

    ipcRenderer.send('message', JSON.stringify(msg));
}

ipcRenderer.on("reply", message => {
    let messageObject = JSON.parse(message);
    let locate = document.getElementById(messageObject.locate);

    if (messageObject.status === "true") {
        locate.innerText = "ON";
    } else if (messageObject.status === "false") {
        locate.innerText = "OFF";
    } else {
        locate.innerText = messageObject.status.toUpperCase();
    }
})