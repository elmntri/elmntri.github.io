const generateColor = (index, total) => {
    const hue = (index / total) * 360;
    const saturation = 100;
    const lightness = 50;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

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
            divElement.innerHTML = "<div>"
            if(data.hasOwnProperty("text")){
                text = data['text']
            }
            if(data.hasOwnProperty("annotations")){
                annotations = data.annotations
            }
            const catalogys = {};
            const boxes = {};
            const links = {};
            for (const key of annotations) {
                console.log(key)
                id = key['id'][0];
                const [id_type, id_value] = id.split(":");
                if(id_type.startsWith("mesh")){
                    links[id]="https://meshb.nlm.nih.gov/record/ui?ui=" + id_value
                } else if ( id_type.startsWith("NCBIGene")){
                    links[id]="https://www.ncbi.nlm.nih.gov/gene/" + id_value
                }
                is_n = key['is_neural_normalized'];
                word = key['mention'];
                obj = key['obj'];
                if (catalogys[obj]) {
                    catalogys[obj]++;
                } else {
                    catalogys[obj] = 1;
                }
                boxes[word] ="<div class='box'><span class='key-name'>Mention</span><span class='key-value'>:" +
                    word + "</span><br><span class='key-name'>Entity type</span><span class='key-value'>:" +
                    obj + "</span><br><span class='key-name'>ID</span><span class='key-value'>:" +
                    "<a href='" + links[id] + "' target='_blank'>" + id + "</a></span></div>"

                const spanHTML = `<span class='keyword' style='background-color:<${obj}-color>'>${word}</span>`;
                text = text.replace(new RegExp(word, 'g'), `<span class="highlight">${spanHTML}</span>`);
                prob = key['prob'];
                span = key['span'];
            } 
            divElement.innerHTML += "<div id='keyword'>"
            let index = 0;
            for(cat in catalogys) {
                console.log(Object.keys(catalogys).length)
                const color = generateColor(index, Object.keys(catalogys).length);
                divElement.innerHTML += `<span class='keyword' style='color:${color}'>` + catalogys[cat] + " " + cat + "</span>";
                text = text.replace(new RegExp(`<${cat}-color>`, 'g'), color);
                index++;
            }
            divElement.innerHTML += "</div>"
            divElement.innerHTML += "<div>"+text+" </div>";
            divElement.innerHTML += "</div>";
      })
    .catch(error => {
        console.error('Error:', error);
    });
}
