//pomodoro learning technique

const container = document.getElementById('pomodoro-table');
const startButton = document.getElementById('start-button');

const dateField = document.getElementById('date');
const totalDone = document.getElementById('completed');


const today = new Date();
const date = today.getDate() +'-'+(today.getMonth()+1)+'-'+ today.getFullYear();

const showDate =()=>{
	dateField.textContent = 'Today is: ' + new Date;
};

showDate();

setInterval(showDate, 1);

startButton.addEventListener('click', ()=>{
	const promise1 = new Promise((resolve, reject)=>{			
		createPomodoroTable();			
		resolve('done');
		reject('error');		
	});

	const promise2 =new Promise((resolve, reject) => {		
		disableAllTiles();
		resolve('done');
		reject('error');
	});

	const promise3 = new Promise ((reject,resolve)=>{
		tileOnClick();
		resolve('done');
		reject('error');
	});

	promise1.then(
		(value)=>{
			container.style.display = 'flex';
			startButton.style.display = 'none';
			setInterval(popupRandomCheck, 3.6e+6);
		}).catch(
			(error)=>{
				error: error;
	});

	promise2.then(
		(value) => {
			console.log(value);

		}).catch(
			(error)=>{
				console.log(error);
			});
	promise3.then(
		(value) => {
			console.log(value);

		}).catch(
			(error)=>{
				console.log(error);
			});

});

const randomCheckInputField = document.getElementById('subject-input');
const randomCheckField = document.getElementById('random-check-popup-div');
const randomCheckButton = document.getElementById('random-check-button');


const popupRandomCheck =()=> {
	randomCheckInputField.innerHTML = '<input id="subject-check" type="radio" value="true">The right thing </input>';
	randomCheckField.style.display = 'flex';
};

const randomCheck = randomCheckButton.addEventListener('click', ()=>{
		const subjectCheck = document.getElementById("subject-check");
		if (subjectCheck.checked){
			console.log(subjectCheck.value);
			randomCheckField.style.display = 'none';
		};
	});

const disableAllTiles =()=>{
	const panels = document.querySelectorAll('.p-1');
	for (let i = 0; i < panels.length - 1; i++){
		panels[i+1].classList.add('p-1-disabled');
	};	
};


const createPomodoroTable =()=> {
	for (let i = 0; i <= 19; i++){
		const elem = document.createElement('div');
		elem.classList.add('p-1');
		elem.innerHTML = i;
		container.appendChild(elem);
	}

}

const tileOnClick = () =>{	
	const panels = document.querySelectorAll('.p-1');
	const progressBarField = document.getElementById('progress-bar');
    for (let i = 0; i < panels.length; i++){
        panels[i].addEventListener('click', ($event)=>{
        let target = $event.target;
        target.classList.add('p-clicked'); 
        target.innerHTML = 'In progress...'
        progressBarField.style.display = 'block';
        setInterval(progress, 1875);
        done(target);
        });
    }
    
};


let i = 0;
const done = (target) => {
    alert('25 minute countdown started');
    setTimeout(()=>{
    	target.classList.add('p-1-disabled');
        target.classList.add('p-done');
        target.innerHTML = 'Done';
        i = i +25;
        alert('1 pomodoro cycle done');        
        counter(i);
        enableNextSlide(target);
    }, 1.5e+6);
}

/* 1.5e+6 */

 

/*15000 */
const enableNextSlide =(target) => {
	target.nextSibling.classList.remove('p-1-disabled');
};

const counterField = document.getElementById('counter');
const counter = (i) => {
    counterField.textContent='Minutes done: ' + i;
};

let width = 0.875;
const progress =()=> {
	const progressField = document.getElementById('progress');
	const progressPercentageField = document.getElementById("progress-percentage");	
	progressField.style.width = width + '%';
	if (width >= 100) {
		clearInterval(progressBar)
		width = 0.875;
	}else{
		if (width >= 90){
			width = width + 0.125;
			progressField.style.width = width + '%';
			progressField.classList.add('progress-bar-danger');
			if (width % 1 === 0){
				progressPercentageField.innerHTML = width + '%';
			}

		} else {
			width = width + 0.125;
			progressField.style.width = width + '%';
			progressField.classList.remove('progress-bar-danger');
			if (width % 1 === 0){
				progressPercentageField.innerHTML = width + '%';
			}
			
		}


	};
	
};
	
	




