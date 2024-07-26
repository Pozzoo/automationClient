const locations = ["luz_guarita", "ar_guarita", "luz_estacionamento", "luz_galpao_externo", "luz_galpao_interno", "luz_escritorios", "ar_escritorios", "luz_sala_reunioes", "ar_sala_reunioes"];
const wrapper = document.getElementById("wrapper");

warmupLocations();




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

        statusWrapper.append(statusText);
        statusWrapper.append(statusValue);

        const leftInfo = document.createElement("div");
        leftInfo.setAttribute("class", "left-info");
        leftInfo.appendChild(locationTitle);
        leftInfo.appendChild(statusWrapper);

        const getButton = document.createElement("button");
        getButton.innerText = "Get";
        getButton.addEventListener("click", onGetPressed)

        const onButton  = document.createElement("button");
        onButton.innerText = "On";
        const offButton = document.createElement("button");
        offButton.innerText = "Off";

        const rightInfo = document.createElement("div");
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

function onGetPressed(location) {
    console.log(location);

}