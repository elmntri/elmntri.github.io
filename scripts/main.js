var submit_sample = function(){
    var req_type = "text";
    var textarea = document.getElementById("test_textarea");
    var txt = textarea.value;
    const apiUrl = 'http://128.199.167.86:443';
    // const apiUrl = 'http://bern2.korea.ac.kr/plain';
    // Create the JSON payload
    const payload = {
      text: txt
    };

    // Make the API request
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(response => response.json())
      .then(data => {
        console.log('Response:', data);
        resultDiv.textContent = data.result;
    }).catch(error => {
        console.error('Error:', error);
    });

}
