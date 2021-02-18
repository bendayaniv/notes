var noteDataArray = [];
var index = 1;

function save() {
    var descriptionBox = document.getElementById("descriptionBox");
    var dateBox = document.getElementById("dateBox");
    var timeBox = document.getElementById("timeBox");


    var noteData = {
        description: descriptionBox.value,
        date: dateBox.value,
        time: timeBox.value,
        id: index++
    };


    noteDataArray.push(noteData);

    localStorage.setItem("userDataNote", JSON.stringify(noteDataArray));
    return noteData;

}

function load() {

    var noteDataArrayText = localStorage.getItem("userDataNote");

    if (noteDataArrayText) {
        noteDataArray = JSON.parse(noteDataArrayText);

        if (noteDataArray) {

            for (var i = 0; i < noteDataArray.length; i++) {
                createNewNote(noteDataArray[i]);
            }
        }
        else {
            noteDataArray = [];
        }
    }
}

function createNewNote(noteData) {
    var newElement = document.createElement('div');
    newElement.classList.add("container");
    newElement.id = noteData.id;
    document.getElementById("bottom").appendChild(newElement);

    var descriptionP = document.createElement('p');
    descriptionP.classList.add("descriptionP");
    descriptionP.innerHTML = noteData.description;
    newElement.appendChild(descriptionP);

    var dateP = document.createElement('p');
    dateP.classList.add("dateP");
    dateP.innerHTML = noteData.date;
    newElement.appendChild(dateP);

    var timeP = document.createElement('p');
    timeP.classList.add("timeP");
    timeP.innerHTML = noteData.time;
    newElement.appendChild(timeP);

    var xButton = document.createElement('button');
    xButton.classList.add("xButton");
    xButton.onclick = function(){deleteNote(newElement)};
    newElement.appendChild(xButton);

}


function add() {
    var descriptionBox = document.getElementById("descriptionBox");
    var dateBox = document.getElementById("dateBox");

    
    if (descriptionBox.value == "" && dateBox.value == "") {
        alert("Description and Date are missing!");
        return;
    }

    if (descriptionBox.value == "") {
        alert("Description is missing!");
        return;
    }

    if (dateBox.value == "") {
        alert("Date is missing!");
        return;
    }

    var noteData = save();
    createNewNote(noteData);
    clearBox();
}


function clearBox() {
    var descriptionBox = document.getElementById("descriptionBox");
    var dateBox = document.getElementById("dateBox");
    var timeBox = document.getElementById("timeBox");

    descriptionBox.value = "";
    dateBox.value = "";
    timeBox.value = "";
}


function deleteNote(domElement) {

    for (var i = 0 ; i < noteDataArray.length ; i++) {
        if (noteDataArray[i].id == domElement.id) {
            
            noteDataArray.splice(i , 1);
        }
    }

    localStorage.setItem("userDataNote", JSON.stringify(noteDataArray));

    domElement.remove();    
}