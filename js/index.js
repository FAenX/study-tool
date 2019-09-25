//pomodoro learning technique

const container = document.getElementById('pomodoro-table');
const panels = document.querySelectorAll('.p-1');
const startButton = document.getElementById('start-button');

const dateField = document.getElementById('date');
const totalDone = document.getElementById('completed');


const today = new Date();
const date = today.getDate() +'-'+(today.getMonth()+1)+'-'+ today.getFullYear();

const showDate =()=>{
	dateField.textContent = 'Today is: ' + new Date;
};

showDate();

startButton.addEventListener('click', ()=>{
	container.style.display = 'flex';
	startButton.style.display = 'none';
});

const clicked = () =>{	
    for (let i = 0; i < panels.length; i++){
        panels[i].addEventListener('click', ($event)=>{
            let target = $event.target
            target.classList.add('p-clicked'); 
            countDown();
            done(target);
        });
    }
    
};


let i = 0;
const done = (target) => {
    alert('25 minute countdown started');
    setTimeout(()=>{
        target.classList.add('p-done');
        i = i +25;
        alert('1 pomodoro cycle done');
        counter(i);
    }, 1.5e+6);
}

/* 1.5e+6 */
let progressBar;
const countDown = () => {
    progressBar = setInterval(progress, 15000);
};

/*15000 */

const counterField = document.getElementById('counter');
const counter = (i) => {
    counterField.textContent='Minutes done: ' + i;
};

let width = 1;
const progress =()=> {
	const progressField = document.getElementById('progress');	
	if (width >= 100) {
		clearInterval(progressBar)
		width = 1;

	}else{
		if (width >= 90){
			width++;
			progressField.style.width = width + '%';
			progressField.innerHTML = width + '%';
			progressField.classList.add('progress-bar-danger');

		} else {
			width++;
			progressField.style.width = width + '%';
			progressField.innerHTML = width + '%';
			progressField.classList.remove('progress-bar-danger');

		}


	};
	
};
	
	



clicked();
