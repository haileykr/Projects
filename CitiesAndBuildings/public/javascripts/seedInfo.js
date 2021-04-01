const wikiBtn = document.querySelector('.wikiBtn');

wikiBtn.addEventListener('click',async function (){
    const title = document.querySelector("input[id='name']").value.replace(' ','_');
    const res= await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${title}?redirect=false`);
    const wikiData = await res.json();
    console.log(wikiData);

    const description = document.querySelector('input[id="description"]');
    description.value = wikiData.description;
    
    const container = document.querySelector(".data");
    container.innerText = wikiData.extract;

    const link = document.createElement("a");
    link.target="_blank";
    link.innerText=" Go to Wiki!";
    link.href = `https://en.wikipedia.org/wiki/${title}`;
    container.appendChild(link);
});