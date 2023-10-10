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
    if(txt == ""){
        if(req_type == "text"){
            txt = "Autophagy maintains tumour growth through circulating arginine. Autophagy captures intracellular components and delivers them to lysosomes, where they are degraded and recycled to sustain metabolism and to enable survival during starvation1-5. Acute, whole-body deletion of the essential autophagy gene Atg7 in adult mice causes a systemic metabolic defect that manifests as starvation intolerance and gradual loss of white adipose tissue, liver glycogen and muscle mass1. Cancer cells also benefit from autophagy.";
        }else{
            txt = "30429607,29446767";
        }
        document.getElementById("test_textarea").value = txt;
    }

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
}
