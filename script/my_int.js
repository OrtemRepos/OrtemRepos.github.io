let count = 1
function slideChange(num)
{
    count = count + num
    if (count > 5)
    {
        count = 1
    }
    else if (count < 1)
    {
        count = 5
    }
    document.getElementById("pict").src = `../pic/${count}.png`
}
const todo = {
    action(e) {
      const target = e.target;
      if (target.classList.contains('todo__action')) {
        const action = target.dataset.todoAction;
        const elemItem = target.closest('.todo__item');
        if (action === 'deleted' && elemItem.dataset.todoState === 'deleted') {
          elemItem.remove();
        } else {
          elemItem.dataset.todoState = action;
          const lexicon = {
            active: 'восстановлено',
            completed: 'завершено',
            deleted: 'удалено'
          };
          const elTodoDate = elemItem.querySelector('.todo__date');
          const html = `<span>${lexicon[action]}: ${new Date().toLocaleString().slice(0, -3)}</span>`;
          elTodoDate.insertAdjacentHTML('beforeend', html);
        }
        this.save();
      } else if (target.classList.contains('todo__add')) {
        this.add();
        this.save();
      }
    },
    add() {
      const elemText = document.querySelector('.todo__text');
      if (elemText.disabled || !elemText.value.length) {
        return;
      }
      document.querySelector('.todo__items').insertAdjacentHTML('beforeend', this.create(elemText.value));
      elemText.value = '';
    },
    create(text) {
      const date = JSON.stringify({ add: new Date().toLocaleString().slice(0, -3) });
      return `<li class="todo__item" data-todo-state="active">
        <span class="todo__task">
          ${text}
          <span class="todo__date" data-todo-date="${date}">
            <span>добавлено: ${new Date().toLocaleString().slice(0, -3)}</span>
          </span>
        </span>
        <span class="todo__action todo__action_restore" data-todo-action="active"></span>
        <span class="todo__action todo__action_complete" data-todo-action="completed"></span>
        <span class="todo__action todo__action_delete" data-todo-action="deleted"></span></li>`;
    },
    init() {
      const fromStorage = localStorage.getItem('todo');
      if (fromStorage) {
        document.querySelector('.todo__items').innerHTML = fromStorage;
      }
      document.querySelector('.todo__options').addEventListener('change', this.update);
      document.addEventListener('click', this.action.bind(this));
    },
    update() {
      const option = document.querySelector('.todo__options').value;
      document.querySelector('.todo__items').dataset.todoOption = option;
      document.querySelector('.todo__text').disabled = option !== 'active';
    },
    save() {
      localStorage.setItem('todo', document.querySelector('.todo__items').innerHTML);
    }
  };
  
  todo.init();

  var pomodoro = {
    started : false,
    minutes : 0,
    seconds : 0,
    fillerHeight : 0,
    fillerIncrement : 0,
    interval : null,
    minutesDom : null,
    secondsDom : null,
    fillerDom : null,
    init : function(){
      var self = this;
      this.minutesDom = document.querySelector('#minutes');
      this.secondsDom = document.querySelector('#seconds');
      this.fillerDom = document.querySelector('#filler');
      this.interval = setInterval(function(){
        self.intervalCallback.apply(self);
      }, 1000);
      document.querySelector('#work').onclick = function(){
        self.startWork.apply(self);
      };
      document.querySelector('#shortBreak').onclick = function(){
        self.startShortBreak.apply(self);
      };
      document.querySelector('#longBreak').onclick = function(){
        self.startLongBreak.apply(self);
      };
      document.querySelector('#stop').onclick = function(){
        self.stopTimer.apply(self);
      };
      document.querySelector('#pause').onclick = function(){
        self.started = !self.started
      };
    },
    resetVariables : function(mins, secs, started){
      this.minutes = mins;
      this.seconds = secs;
      this.started = started;
      this.fillerIncrement = 200/(this.minutes*60);
      this.fillerHeight = 0;  
    },
    startWork: function() {
      this.resetVariables(25, 0, true);
    },
    startShortBreak : function(){
      this.resetVariables(5, 0, true);
    },
    startLongBreak : function(){
      this.resetVariables(15, 0, true);
    },
    stopTimer : function(){
      this.resetVariables(25, 0, false);
      this.updateDom();
    },
    toDoubleDigit : function(num){
      if(num < 10) {
        return "0" + parseInt(num, 10);
      }
      return num;
    },
    updateDom : function(){
      this.minutesDom.innerHTML = this.toDoubleDigit(this.minutes);
      this.secondsDom.innerHTML = this.toDoubleDigit(this.seconds);
      this.fillerHeight = this.fillerHeight + this.fillerIncrement;
      this.fillerDom.style.height = this.fillerHeight + 'px';
    },
    intervalCallback : function(){
      if(!this.started) return false;
      if(this.seconds == 0) {
        if(this.minutes == 0) {
          this.timerComplete();
          return;
        }
        this.seconds = 59;
        this.minutes--;
      } else {
        this.seconds--;
      }
      this.updateDom();
    },
    timerComplete : function(){
      this.started = false;
      this.fillerHeight = 0;
    }
};
window.onload = function(){
  pomodoro.init();
};