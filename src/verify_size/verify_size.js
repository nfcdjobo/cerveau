const verify_file_size=input=>{
    const div_error=document.getElementById(input.target.name+"-error");
    if(input.target.files[0].size>1024*1024*1000){
        console.log(input)
        input.target.value="";
        div_error.textContent="Fichier trop volumuneux";
    }else{
        div_error.textContent="";
    }
}

export default verify_file_size;