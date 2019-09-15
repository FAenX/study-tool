const panels = document.querySelectorAll('.p-1');

const clicked = () =>{
    for (let i = 0; i < panels.length; i++){
        panels[i].addEventListener('click', ($event)=>{
            let target = $event.target
            target.classList.add('p-clicked'); 
            console.log(target);
            done(target);
        });
       
    }
    
};


const done = (target) => {
    console.log('Timeout started');
    setTimeout(()=>{
        target.classList.add('p-done');
        alert('1 pomodoro cycle done');
    }, 1.5e+6);
}

const countDown = () => {
    setInterval(() => {
        let currentDate = '[' + new Date().toUTCString() + '] ';
        alert(currentDate);
    }, 600000);
};




clicked();
countDown();
