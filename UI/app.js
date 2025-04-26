const dropzone = document.querySelector(".dragndrop");
let finalans = document.querySelector(".outputname");
let outputimage = document.querySelector(".outputvalue");
let base64Image = "";

dropzone.addEventListener('dragover', function(e){
    e.preventDefault();
});
dropzone.addEventListener('drop', function(e){
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if(file && file.type.startsWith('image/')){
        const reader = new FileReader();
        reader.onload = function(event) {
            base64Image = event.target.result;
            console.log("base64:",base64Image);
            sendImageToServer(base64Image);
        }
        reader.readAsDataURL(file);
    }
    else{
        console.log("drop valid image!");
    }
});
function setImageAndName(ans){
    if(ans=="Virat_Kholi"){
        finalans.innerText = "Virat Kholi";
        outputimage.style.backgroundImage= "url('virat.png')";
    }
    else if(ans=="KL_Rahul"){
        finalans.innerText = "KL Rahul";
        outputimage.style.backgroundImage= "url('klrahul.jpg')";
    }
    else if(ans=="Bumrah"){
        finalans.innerText = "Jasprit Bumrah";
        outputimage.style.backgroundImage= "url('bumrah.jpg')";
    }
    else if(ans=="MS_Dhoni"){
        finalans.innerText = "MS Dhoni";
        outputimage.style.backgroundImage= "url('dhoni.jpg')";
    }
    else if(ans=="Rohit_Sharma"){
        finalans.innerText = "Rohit Sharma";
        outputimage.style.backgroundImage= "url('rohit.jpg')";
    }
    else{
        finalans.innerText = "Please use the images of the above cricketers";
        outputimage.style.backgroundImage= "none";
    }
}
function sendImageToServer(base64){
    fetch('http://127.0.0.1:5000/classify_images',{
        method: 'POST',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded',
        },
        body: `image_data=${encodeURIComponent(base64)}`
    })
    .then(response => response.json())
    .then(data => {
        console.log("Result",data);
        if(data.length == 0){
            console.log("Face not clear");
            finalans.innerText = "Unable to detect. Please use a clear image!";
            outputimage.style.backgroundImage= "none";
        }
        else{
            let ans = data[0].class;
            console.log(ans);
            setImageAndName(ans);
        }
    })
    .catch(error=>{
        console.error("error:",error);
    });
}