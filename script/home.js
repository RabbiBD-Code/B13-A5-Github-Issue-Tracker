
const loadLabIssue = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then((res) => res.json())
        .then((data) => displayLoadLabIssue(data.data))
};


const priorityClasses = (priority) =>{
    if(priority === 'high'){
        return 'bg-[#FEECEC] text-[#EF4444]'
    }
    if(priority === 'medium'){
        return 'bg-[#FFF6D1] text-[#F59E0B]'
    }
    if(priority === 'low'){
        return 'bg-[#EEEFF2] text-[#9CA3AF]'
    }
}

const displayLoadLabIssue = (data) => {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = ""
//  {
//       "id": 1,
//       "title": "Fix navigation menu on mobile devices",
//       "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
//       "status": "open",
//       "labels": [
//         "bug",
//         "help wanted"
//       ],
//       "priority": "high",
//       "author": "john_doe",
//       "assignee": "jane_smith",
//       "createdAt": "2024-01-15T10:30:00Z",
//       "updatedAt": "2024-01-15T10:30:00Z"
//     }
    data.forEach(ele => {
        const div = document.createElement("div")
        div.innerHTML = `
            <div 
            class=" shadow-2xl rounded-xl bg-stone-50 h-full">
                <div class="space-y-3 p-4">
                    <div class="flex justify-between">
                    <img src="${ele.priority === 'low' ? './assets/./Closed- Status .png' : './assets/Open-Status.png'}" alt="">
                    <span
                        class="${priorityClasses(ele.priority)} px-4 py-1 rounded-full font-semibold text-[12px]">${ele.priority}</span>
                </div>
                <h2 class="font-semibold text-sm">${ele.title}</h2>
                <p class="text-[12px] line-clamp-2">${ele.description}</p>
                <div class="inline-block">
                    <div
                        class="flex items-center gap-2 bg-[#FEECEC] border-2 rounded-full py-1.5 px-2 border-[#FECACA]">
                        <img class="" src="./assets/Vector.png" alt="">
                        <span class="text-[#EF4444] text-[12px] font-medium">BUG</span>
                    </div>
                </div>
                <div class="inline-block">
                    <div
                        class="flex items-center gap-2 bg-[#FFF8DB] border-2 rounded-full py-1.5 px-2 border-[#FDE68A]">
                        <img class="" src="./assets/Vector (1).png" alt="">
                        <span class="text-[#D97706] text-[12px] font-medium">HELP WANTED</span>
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
}

loadLabIssue()