var submit_sample = function(){
    var req_type = "text";
    var req_types = document.getElementsByName("select_input_type");
    for(var i=0; i<req_types.length; i++){
        if(req_types[i].checked){
            req_type = req_types[i].value;
            break;
        }
    }
    
    var textarea = document.getElementById("test_textarea");
    var txt = textarea.value;
    var draw_keys = ['disease', 'mutation', 'gene', 'drug', 'species', 'DNA', 'RNA', 'cell_line', 'cell_type'];

    if(req_type == "pmid"){
        var pmids = txt.split(',');
        if(pmids.length > 5){
            return;
        }
    }
    
    document.getElementById("demo_result").innerHTML = "";
    $("#test_textarea").trigger('focusout');
    $("#test_textarea").trigger('blur');
    $(".loader-box").show();

    $.post('./senddata', {
        'sample_text': txt,
        'draw_keys': JSON.stringify(draw_keys),
        'req_type': req_type,
    });

    const apiUrl = 'http://bern2.korea.ac.kr/plain';

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
