var stateData = {};

function fetchState(stateID, stateData) {
    let state = stateData.states[stateID];

    return state || {};
}

function displayState(stateData) {
    document.querySelector("#label").innerHTML = stateData.name;

    ['left', 'right', 'forward', 'back'].forEach((direction) => {
        let button = document.querySelector(`#${direction}`);
        if (direction in stateData.transitions) {
            button.disabled = false;
            button.onclick = () => {
                displayState(fetchState(stateData.transitions[direction], states))
            }
        } else {
            button.disabled = true;
        }
    });
}

fetch('./house.json')
    .then(response => response.json())
    .then(json => {
        states = json;
        let initialState = fetchState(states.initial_state, states);
        displayState(initialState);
    });
