
var arrHead = new Array();
arrHead = ['', 'Message']; // table headers.

// first create a TABLE structure by adding few headers.
function createTable() {
    var sentimentTable = document.createElement('table');
    sentimentTable.setAttribute('id', 'sentimentTable');  // table id.

    var tr = sentimentTable.insertRow(-1);

    for (var h = 0; h < arrHead.length; h++) {
        var th = document.createElement('th'); // the header object.
        th.innerHTML = arrHead[h];
        tr.appendChild(th);
    }

    var div = document.getElementById('cont');
    div.appendChild(sentimentTable);    // add table to a container.
}

// function to add new row.
function addRow() {
    var empTab = document.getElementById('sentimentTable');

    var rowCnt = empTab.rows.length;    // get the number of rows.
    var tr = empTab.insertRow(rowCnt); // table row.
    tr = empTab.insertRow(rowCnt);

    for (var c = 0; c < arrHead.length; c++) {
        var td = document.createElement('td');          // TABLE DEFINITION.
        td = tr.insertCell(c);

        if (c == 0) {   // if its the first column of the table.
            // add a button control.
            var button = document.createElement('input');

            // set the attributes.
            button.setAttribute('type', 'button');
            button.setAttribute('value', 'Remove');
            // button.setAttribute('class', 'btn btn-secondary')
            // add button's "onclick" event.
            button.setAttribute('onclick', 'removeRow(this)');

            td.appendChild(button);
        }
        else {
            // the 2nd, 3rd and 4th column, will have textbox.
            var ele = document.createElement('input');
            ele.setAttribute('type', 'text');
            ele.setAttribute('value', '');
            td.appendChild(ele);
        }

    }
}
// function to delete a row.
function removeRow(oButton) {
    var empTab = document.getElementById('sentimentTable');
    empTab.deleteRow(oButton.parentNode.parentNode.rowIndex); // buttton -> td -> tr
}

// function to extract and submit table data.
function submit() {
    var myTab = document.getElementById('sentimentTable');
    var arrValues = new Array();

    // loop through each row of the table.
    for (row = 1; row < myTab.rows.length - 1; row++) {
        // loop through each cell in a row.
        for (c = 0; c < myTab.rows[row].cells.length; c++) {
            var element = myTab.rows.item(row).cells[c];
            if (element.childNodes[0].getAttribute('type') == 'text') {
                rx = /[^a-z 0-9.,?]/gi;
                arrValues.push(element.childNodes[0].value.replace(rx, ""));
            }
        }
    }

    // finally, show the result in the console.
    //console.log(arrValues);
    return arrValues;
}
function restrict(elem) {
    var tf = (elem);
    var rx = new RegExp;
    if (elem == "email") {
        rx = /[ '"]/gi;
    } else if (elem == "search" || elem == "comment") {
        rx = /[^a-z 0-9.,?]/gi;
    } else {
        rx = /[^a-z0-9]/gi;
    }
    tf.value = tf.value.replace(rx, "");
}
function renderElements(emotion) {
    // var emotion = {
    //     "classified": [
    //         {
    //             "label": "POSITIVE",
    //             "score": 0.9955455660820007
    //         },
    //         {
    //             "label": "POSITIVE",
    //             "score": 0.9536816477775574
    //         },
    //         {
    //             "label": "NEGATIVE",
    //             "score": 0.9991129040718079
    //         }
    //     ]
    // }

    for (var key in emotion) {
        if (emotion.hasOwnProperty(key)) {
            var val = emotion[key];
            for (var i = 0; i < val.length; i++) {
                for (var key in val[i]) {
                    //console.log(val[i][key]);
                    if (val[i][key] == "POSITIVE") {
                        const emojiContainer = document.createElement('p');
                        emojiContainer.style.fontSize = '50px';
                        emojiContainer.innerHTML = '&#128522;';
                        document.getElementById('contemotions').appendChild(emojiContainer);
                    }
                    if (val[i][key] == "NEGATIVE") {

                        const emojiContainer = document.createElement('p');
                        emojiContainer.style.fontSize = '50px';
                        emojiContainer.innerHTML = '&#128557;';
                        document.getElementById('contemotions').appendChild(emojiContainer);

                    }

                }
            }
        }
    }

}
//const txtMessage = document.getElementById('txtMessage')

btnWhatsUp.addEventListener('click', e => {
    var messages = submit();
    //console.log(messages);
    // restrict(txtMessage);
    // const message = txtMessage.value;
    // if (message === "") {
    //     alert("Kindly fill in the message")
    //     return;
    // }

    //renderElements('')
    userAction(messages);
})

const userAction = async (message) => {
    var payload = {
        "text": message
    }

    //console.log(payload);
    const response = await fetch('https://huggingface-raj.herokuapp.com/api/get-classify',
        {
            mode: 'cors', // 'cors' by default, 'no-cors'
            method: 'POST',
            body: JSON.stringify(payload), // string or object
            headers: {
                'Content-Type': 'application/json'
            }

        }).then(function (response) {
            console.log("In Response status check", response.ok);
            if (!response.ok) {
                throw Error(response.statusText);
            }
            // Read the response as json.
            return response.json();
        })
        .then(function (responseAsJson) {
            console.log("In Response json data get");
            // Do stuff with the JSON
            console.log(responseAsJson);
            renderElements(responseAsJson);
        })
        .catch(function (error) {
            console.log("In error");
            console.log('Looks like there was a problem: \n', error);
        });

}

