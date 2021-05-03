const img = document.querySelector('#images');

const container = document.querySelector('#uploadedImg');
const container2 = document.querySelector('#contrast');
const container3 = document.querySelector('#grayscale');
const container4 = document.querySelector('#sepia');
const container5 = document.querySelector('#edge');

const imageSrc = '';
//event handler on file change
img.onchange = (e, imageSrc) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onload = (e) => {
        imageSrc = e.target.result;
        container.setAttribute('src', e.target.result);
        container2.setAttribute('src', e.target.result);
        container3.setAttribute('src', e.target.result);
        container4.setAttribute('src', e.target.result);
        container5.setAttribute('src',e.target.result);
    }
	reader.readAsDataURL(file)
}
const getFilteredCanvas = (i) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d');
        
    if (i === 1) ctx.filter = "contrast(200%)";
    if (i === 2) ctx.filter = "grayscale()";
    if (i === 3) ctx.filter = "sepia()";
    if (i === 4) ctx.filter = "hue-rotate(180deg)";

    var img = document.getElementById("uploadedImg");
    ctx.drawImage(img,0,0, canvas.width, canvas.height);

    return canvas;
};

for (let i=1; i<5; i++){
    var downloadFile = document.getElementById(`download${i}`);
  
    downloadFile.addEventListener('click',function download(){
        const canvas = getFilteredCanvas(i);
        var dt = canvas.toDataURL('image/jpeg');
        this.href = dt;
        this.download = "filtered.png";
    }, false);
}