const panels = document.querySelectorAll('.p-1');

const clicked = () =>{
    for (let i = 0; i < panels.length; i++){
        panels[i].addEventListener('click', ($event)=>{
            let target = $event.target;
            target.classList.add('p-clicked'); 
            console.log(target);
            done(target);
        });
       
    }
    
};


const done = (target) => {
    alert('25 minute countdown started');
    setTimeout(()=>{
        target.classList.add('p-done');
        alert('1 pomodoro cycle done');
    }, 1.5e+6);
}

const countDown = () => {
    setInterval(() => {
        alert('10 minutes done');
    }, 600000);
};




clicked();
countDown();
