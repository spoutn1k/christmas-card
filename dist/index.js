var states = {};
var found = [];

function missingPeeps() {
    return Object.keys(states.christmas_card.people).filter(dude => !found.includes(dude));
}

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

    document.querySelectorAll(".find-button").forEach(b => b.remove());

    let peoplePresent = (stateData.people || []).filter(dude => missingPeeps().includes(dude));
    peoplePresent.forEach((dude) => {
        let find = document.createElement('button');
        find.innerText = `Find ${dude}`;
        find.id = `find-${dude}`;
        find.className = `find-button`;
        find.onclick = () => {
            found.push(dude);
            initCard();
            document.querySelector(`#find-${dude}`).remove();
        }
        document.body.appendChild(find);
    });
}

function initStates() {
    let initialState = fetchState(states.initial_state, states);
    displayState(initialState);
}

function initCard() {
    let cardHolder = document.querySelector("#cardholder");
    cardHolder.innerHTML = "";

    let background = document.createElement('img');
    background.src = `assets/${states.christmas_card.full}`;

    cardHolder.appendChild(background);

    missingPeeps().forEach((dude) => {
        let mask = document.createElement('img');
        mask.src = `assets/${states.christmas_card.people[dude].mask}`;

        cardHolder.appendChild(mask);
    });
}

fetch('./house.json')
    .then(response => response.json())
    .then(json => {
        states = json;

        initStates();
        initCard();
    });
