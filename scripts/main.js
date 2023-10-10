var submit_sample = function(){
    var req_type = "text";
    var textarea = document.getElementById("test_textarea");
    var txt = textarea.value;
    const apiUrl = 'https://dev.limago123.com/plain';
    // const apiUrl = 'http://bern2.korea.ac.kr/plain';
    // Create the JSON payload
    const payload = {
      text: txt
    };
    console.log('Payload:', payload);
    // Make the API request
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(response => response.json())
      .then(data => {
            console.log(data);
            for (let key in data) {
                if (data.hasOwnProperty(key)) {
                    let value = json[key];
                    console.log(value);
                }
            }
            divElement = document.getElementById("demo_result");
            divElement.textContent = data.result;
      })
    .catch(error => {
        console.error('Error:', error);
    });
}
