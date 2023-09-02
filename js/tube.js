let isSortViews = false;
let id = 1000;

const handleCategory = async () => {
    const btnCategory = document.getElementById('btn-category')

    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');

    const data = await res.json();
    const category1 = data.data;

    category1.forEach((category) => {
        const div = document.createElement('div')
        div.innerHTML = `<button class="btn hover:bg-red-600 hover:text-white font-semibold" onclick="loadCard('${category.category_id}')">${category.category}</button>`;
        btnCategory.appendChild(div)
    });

}


const loadCard = async (id) => {
    const cardContainer = document.getElementById('card-container')
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)

    
    const data = await res.json();
    const cards = data.data;

    cardContainer.innerHTML = "" ;

   
    if(cards.length===0){
        const div=document.createElement('div') 
        div.classList="w-full my-20"
        div.innerHTML = `
            <img class="lg:mx-[900px]" src="images/Icon.png" alt="">
            <p class="text-[#171717] text-center text-3xl font-bold lg:mx-[925px]">Oops!! Sorry, There is no content here</p>
             
        `
        cardContainer.appendChild(div)
     }

     if(isSortViews){
        cards.sort((x,y)=>parseFloat(y.others.views.split(" ")[0])-parseFloat(x.others.views.split(" ")[0]));
        
        isSortViews = !isSortViews;
      }

     cards.forEach(cards => {
        //console.log(cards)

        const time = cards.others.posted_date
        //console.log(time)
        const hour = parseInt((time/60)/60);
        const minute = parseInt(time%3600)/60;
        const min = minute.toFixed(0);
        //console.log(hour, min)


        const tubeCards = document.createElement('div')
        tubeCards.classList = `card card-compact w-full bg-base-100 shadow-xl mx-auto`
        tubeCards.innerHTML = `
        <figure><img class="w-[500px] h-[200px]" src="${cards.thumbnail}" alt="Shoes" /></figure>
        <div>
            <p class=" bg-[#171717] rounded w-[30%] text-center  mt-[-1.2rem] ml-auto mr-2 text-xs text-white"> ${time ? `${hour} hrs ${min} min ago` : ""} </p>
        </div>
        <div class="card-body">
            <div class="flex items-center gap-3">
                <img class="rounded-full w-10 h-10" src="${cards.authors[0].profile_picture}" alt="Shoes" />
                <h2 class="card-title">${cards.title}</h2>
            </div>
            <div class="flex items-center">
                <p class="ml-[53px]">${cards.authors[0].profile_name}</p>
                <p>${cards.authors[0].verified ? `<img src="images/verified.png" alt="">`:""}</p>
            </div>
            <p class="ml-[53px]">${cards.others.views} views</p>
        </div>
    `

        cardContainer.appendChild(tubeCards)
    });

 }

const handleBlog =()=>{
    window.location.href = "blog.html"
    }

loadCard("1000")

handleCategory()

function handleSort(){
    isSortViews = !isSortViews;
    loadCard(id)
  }