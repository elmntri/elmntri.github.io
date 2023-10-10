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
            divElement = document.getElementById("demo_result");
            annotations = data.hasOwnProperty("annotations")
            divElement.innerHTML = "<div>"
            for (let key in annotations) {
                id = key.id
                is_n = key.is_neural_normalized
                word = key.mention
                obj = key.obj
                prob = key.prob
                span = key.span
                divElement.innerHTML += "<div>ID:"+id+" Key:"+obj+" </div>";
            } 
            text = data.hasOwnProperty("text")
            divElement.innerHTML += "<div>"+text+" </div>";
      })
    .catch(error => {
        console.error('Error:', error);
    });
}
