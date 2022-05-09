let empPayrollList;
window.addEventListener('DOMContentLoaded',(event)=>{
    empPayrollList = getEmployeePayrollDataFromStorage();
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHtml();
    localStorage.removeItem('editEmp');
});

const getEmployeePayrollDataFromStorage=()=>{
    return localStorage.getItem('EmployeePayRollList')?
    JSON.parse(localStorage.getItem('EmployeePayRollList')):[];
}
//Template literal es6 feature
const createInnerHtml =() =>{
    const headerHtml ="<th></th><th>Name</th><th>Gender</th><th>Department"+
                      "</th><th>Salary</th><th>StartDate</th><th>Actions</th>";
    //if(empPayrollList.length ==0) return;
    let empPayrollList = createEmployeePayRollJSON();
    let innerHtml =`${headerHtml}`;
    for (const empPayRollData of empPayrollList) {            
    const innerHtml = `${headerHtml}
        <tr>
            <td><img class="profile"
                src="${empPayRollData._profilePic}.jpg" alt=""></td>
                <td>${empPayRollData._name}</td>
                <td>${empPayRollData._gender}</td>
                <td>${getDeptHtml(empPayRollData._department)}</td>
                <td>${empPayRollData._salary}</td>
                <td>${stringifyDate(empPayRollData._startDate)}</td>
                <td>
                    <img id="${empPayRollData.id}" onclick="remove(this)" 
                    src="../assets/icons/delete-black-18dp.svg" alt="delete">
                    <img id="${empPayRollData.id}" onclick="update(this)"
                    src="../assets/icons/create-black-18dp.svg" alt="edit">
                </td> 
        </tr>
    `;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;
}

/*
    const createEmployeePayRollJSON=()=>{
        let employeePayRollListLocal=[
            {
                _name:'Murgendra',
                _gender:'male',
                _department:['Engineering','Finance'],
                _salary:'50000',
                _startDate:'29 Oct 2019',
                _note:'',
                _id:new Date().getTime(),
                _profilePic:'Ellipse3.jpg'
            },
            {
                _name:'Suresh',
                _gender:'male',
                _department:['Engineering','Finance'],
                _salary:'30000',
                _startDate:'21 Oct 2019',
                _note:'',
                _id:new Date().getTime(),
                _profilePic:'Ellipse3.jpg'
            }
    
        ];
        return employeePayRollListLocal;
    }
    */
    const getDepHtml=(depList)=>
    {
    let depHtml='';
    for(const dept of depList)
    {
        depHtml=`${depHtml}<div class='dept-label'>${dept}</div>`
    }
    return depHtml;
    }
    
    
    const remove=(node)=>{
        let empPayrollData=empPayrollList.find(empData=>empData._name==node.name);
        if(!empPayrollData)return;
        const index=empPayrollList
                   .map(empData=>empData._name)
                   .indexOf(empPayrollData._name);
        empPayrollList.splice(index,1);
        localStorage.setItem("EmployeePayrollList",JSON.stringify(empPayrollList));
        document.querySelector(".emp-count").textContent=empPayrollList.length;
        createInnerHtml();
    }