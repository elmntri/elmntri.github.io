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
    }).then(response => response.text())
      .then(text => {
        try {
            console.log("Text:"+text);
            const data = JSON.parse(text);
            // Process the parsed JSON data
            console.log(data);
            divElement = document.getElementById("demo_result");
            divElement.textContent = data.result;
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
      })
    .catch(error => {
        console.error('Error:', error);
    });
}
