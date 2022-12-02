var states = {};

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

function initStates() {
    let initialState = fetchState(states.initial_state, states);
    displayState(initialState);
}

function initCard() {
    let cardHolder = document.querySelector("#cardholder");

    let background = document.createElement('img');
    background.src = `assets/${states.christmas_card.full}`;

    cardHolder.appendChild(background);

    for (dude in states.christmas_card.people) {
        let mask = document.createElement('img');
        mask.src = `assets/${states.christmas_card.people[dude].mask}`;

        cardHolder.appendChild(mask);
    }
}

fetch('./house.json')
    .then(response => response.json())
    .then(json => {
        states = json;

        initStates();
        initCard();
    });
