let labIssueData = [];
let searchCard = [];
const openBtn = document.getElementById("open-btn")
const closedBtn = document.getElementById("closed-btn");
const allBtn = document.getElementById("all-btn");
const issuesCount = document.getElementById("issues-count")
const spinner = document.getElementById("spinner")
const searchBtn = document.getElementById("search-btn")
// console.log(openBtnText.toLowerCase())

searchBtn.addEventListener("click", () => {
    const inputSearch = document.getElementById("input-search")
    const searchValue = inputSearch.value.trim().toLowerCase();
    console.log(searchValue)
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)
        .then((res) => res.json())
        .then((searchData) => {
            searchCard = searchData.data
            displayLoadLabIssue(searchCard)
            openBtn.classList.remove("btn-primary")
            allBtn.classList.remove("btn-primary")
            closedBtn.classList.remove("btn-primary")
        })
})

const createElements = (array) => {
    const createHtml = array.map((element) => `
                        <span
                        class="flex items-center gap-1 bg-[#FFF8DB] border-2 rounded-full px-2 border-[#FDE68A]">
                        <span class="text-[#EF4444] text-[12px] font-medium"><i class="fa-solid fa-bug"></i> ${element}</span>
                        </span>`)
    return createHtml.join(" ")
}
const manageSpinner = (status) => {
    if (status === true) {
        spinner.classList.remove('hidden')
        document.getElementById('card-container').classList.add('hidden')
    }
    else {
        spinner.classList.add('hidden')
        document.getElementById('card-container').classList.remove('hidden')
    }
}

const loadLabIssue = () => {
    manageSpinner(true)
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then((res) => res.json())
        .then((data) => {
            labIssueData = data.data;
            displayLoadLabIssue(labIssueData)
        })
};

const displayModal = (id) => {
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
        .then((res) => res.json())
        .then((data) => loadDisplayModal(data.data))
}

const loadDisplayModal = (data) => {
    console.log(data)
    const modalContainer = document.getElementById("modal-container")
    modalContainer.innerHTML = `
                <h2 class="font-bold text-2xl">${data.title}</h2>
                    <div class="space-x-2">
                        <span class="text-[12px] text-[#ffffff] font-medium bg-[#00A96E] rounded-full px-4 py-1">${data.status}</span>
                        
                        <span class="text-[12px] text-[#64748B]">${data.author}</span>
                        <span class="text-[12px] text-[#64748B]">${data.createdAt ? data.createdAt : "not found"}</span>
                    </div>
                    <div class="inline-block">
                    <div class="flex gap-3">
                        ${createElements(data.labels)}
                    </div>
                </div>
                    <p class="text-[#64748B]">${data.description}</p>
                    <div class="bg-[#F8FAFC] rounded-xl flex p-3 gap-24 items-center">
                         <div>
                            <p class="text-[#64748B]">Assignee:</p>
                            <p class="font-semibold">${data.assignee}</p>
                         </div>
                         <div>
                            <p class="text-[#64748B]">Priority:</p>
                            <span class="text-[12px] text-[#ffffff] font-medium bg-[#EF4444] rounded-full px-4 py-1">${data.priority}</span>
                         </div>
                    </div>
    `;
    document.getElementById('show-modal').showModal()
}

const displayOpenIssue = (data) => {
    manageSpinner(true)
    openBtn.classList.add("btn-primary")
    allBtn.classList.remove("btn-primary")
    closedBtn.classList.remove("btn-primary")
    const issueData = data.filter(item => item.status === "open")
    issuesCount.innerText = issueData.length
    displayLoadLabIssue(issueData)
    manageSpinner(false)
};
const displayClosedIssue = (data) => {
    manageSpinner(true)
    closedBtn.classList.add("btn-primary")
    allBtn.classList.remove("btn-primary")
    openBtn.classList.remove("btn-primary")
    const issueData = data.filter(item => item.status === "closed")
    issuesCount.innerText = issueData.length
    displayLoadLabIssue(issueData)
    console.log(issueData)
    manageSpinner(false)

};
const displayAllIssue = (data) => {
    manageSpinner(true)
    allBtn.classList.add("btn-primary")
    closedBtn.classList.remove("btn-primary")
    openBtn.classList.remove("btn-primary")
    issuesCount.innerText = data.length
    displayLoadLabIssue(data)
    manageSpinner(false)
};



const priorityClasses = (priority) => {
    if (priority === 'high') {
        return 'bg-[#FEECEC] text-[#EF4444]'
    }
    if (priority === 'medium') {
        return 'bg-[#FFF6D1] text-[#F59E0B]'
    }
    if (priority === 'low') {
        return 'bg-[#EEEFF2] text-[#9CA3AF]'
    }
}
const displayLoadLabIssue = (data) => {
    issuesCount.innerText = data.length
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = ""


    data.forEach(ele => {
        const div = document.createElement("div")
        div.innerHTML = `
            <div 
            class="${ele.status == "open" ? 'border-t-4 border-[#00A96E]' : 'border-t-4 border-[#A855F7]'} shadow-2xl rounded-xl bg-stone-50 h-full" onclick="displayModal(${ele.id})">
                <div class="space-y-3 p-4">
                    <div class="flex justify-between">
                    <img src="${ele.status === 'closed' ? './assets/./Closed- Status .png' : './assets/Open-Status.png'}" alt="">
                    <span
                        class="${priorityClasses(ele.priority)} px-4 py-1 rounded-full font-semibold text-[12px]">${ele.priority}</span>
                </div>
                <h2 class="font-semibold text-sm">${ele.title}</h2>
                <p class="text-[12px] line-clamp-2">${ele.description}</p>
                <div class="inline-block">
                    <div class="flex gap-1">
                        ${createElements(ele.labels)}
                    </div>
                </div>
                
                </div>
                <hr class="border-gray-300">
                <div class="space-y-2 p-4">
                    <p class="text-[12px] text-[#64748B]">#1
                    ${ele.author}</p>
                <p class="text-[12px] text-[#64748B]">${ele.updatedAt}</p>
                </div>
            </div>
        `
        cardContainer.appendChild(div)
    });
    manageSpinner(false)
}

loadLabIssue()


/**
 * <div class="inline-block">
                    <div
                        class="flex items-center gap-2 bg-[#FFF8DB] border-2 rounded-full py-1.5 px-2 border-[#FDE68A]">
                        <img class="" src="./assets/Vector (1).png" alt="">
                        <span class="text-[#D97706] text-[12px] font-medium">HELP WANTED</span>
                    </div>
                </div>
 */