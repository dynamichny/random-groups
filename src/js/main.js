const numInput = document.querySelector('#num-of-gr>input');
const nameForm = document.querySelector('#add-person-form');
const nameInput = document.querySelector('#add-person-form>input');
const addBtn = document.querySelector('.add-person-btn');
const generateBtn = document.querySelector('#generate-groups>.btn');
const peopleSection = document.querySelector('#people');
const groupList = document.querySelector('#groups');

const people = [];
let randomPicks = [];


window.onload = function () {
    addBtn.addEventListener('click', addPerson);
    nameForm.addEventListener('submit', addPerson);
    generateBtn.addEventListener('click', generateGroups)
}

function addPerson(e) {
    e.preventDefault();
    if (nameInput.value) { //if value isn't '' it will add it to array
        people.push(nameInput.value)
    } else { //else it will add next number
        people.push(people.length + 1)
    }
    buildPeopleList();
    nameInput.value = '';
}

function buildPeopleList(e) {
    peopleSection.innerHTML = '';
    people.forEach((person) => {
        let newDiv = document.createElement('div');
        let newP = document.createElement('p');
        newP.classList.add('names');
        newP.innerHTML = person;
        let newA = document.createElement('a');
        newA.classList.add('remove-btn');
        newA.innerHTML = 'remove';
        newDiv.appendChild(newP);
        newDiv.appendChild(newA);
        peopleSection.appendChild(newDiv);
    });

    document.querySelectorAll('.remove-btn').forEach((btn) => {
        btn.addEventListener('click', removePerson);
    })
}

function removePerson(e) {
    e.preventDefault();
    let value = e.target.parentElement.children[0].innerHTML
    people.splice(people.findIndex((element) => element == value), 1)
    buildPeopleList();
}

function generateGroups(e) {
    e.preventDefault();

    randomPicks = [];
    if (numInput.value >= 1 && people.length >= numInput.value) {
        let peopleTemp = [...people];
        for (let l = 0; l < numInput.value; l++) {
            randomPicks.push([]);
        }

        let i = 0;
        //randomiser 
        for (each in people) {
            randomPicks[i].push(peopleTemp.splice(Math.floor(Math.random() * peopleTemp.length), 1)[0]);
            i++;
            if (i >= numInput.value) {
                i = 0;
            }
        }
        let group_count = 1;
        groupList.innerHTML = '';
        randomPicks.forEach((group) => {
            let gr = document.createElement('li');
            let groupname = document.createElement('p');
            groupname.innerHTML = `Group ${group_count}`;
            let btn = document.createElement('a')
            let arrow = document.createElement('img');
            arrow.src = 'src/img/arrow.svg';
            btn.appendChild(arrow)
            let newDiv = document.createElement('div')
            newDiv.appendChild(groupname)
            newDiv.appendChild(btn)

            let listOfPeople = document.createElement('ul');
            listOfPeople.classList.add('group-parts');
            group.forEach((person) => {
                let personLi = document.createElement('li');
                personLi.innerHTML = person;
                listOfPeople.appendChild(personLi);
            })
            gr.appendChild(newDiv);
            gr.appendChild(listOfPeople);

            groupList.appendChild(gr)
            group_count++;
        })

        let showPeople = document.querySelectorAll('#groups>li>div>a')
        showPeople.forEach((each) => {
            each.addEventListener('click', switchPeopleVis)
        })
    } else if (!numInput.value) {
        alert('How many groups do you want?')
    } else {
        alert('Too many groups! Add more peolple or decrease number of groups.')
    }
}

function switchPeopleVis(e) {
    e.preventDefault();
    this.children[0].classList.toggle('clicked')
    this.parentElement.parentElement.children[1].classList.toggle('visible')
}