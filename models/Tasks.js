import colors from 'colors';
import Task from "./Task.js";

class Tasks {

      _list = {};

      constructor() {
            this._list = {};
      }

      get listArr () {

            let list = [];

            Object.keys( this._list ).forEach( id => {
                  list = [ ...list, this._list[ id ] ];
            })

            return list;

      }

      deleteTask( id = '' ) {
            if ( this._list[ id ] ) {
                  delete this._list[id];
            }
      }

      createTask ( desc ) {
            const newTask = new Task( desc );
            this._list[ newTask.id ] = newTask;
      }

      setTasksFromArray ( tasks = [] ) {
            tasks.forEach( task => {
                  this._list[ task.id ] = task;
            })
      }

      showTasksList() {

            console.log('\n');
            const tasks = this.listArr;

            tasks.forEach( (task, i) => {

                  const idx = colors.blue(`${i+1}.`);
                  const { desc, completedOn } = task;
                  const isCompleted = completedOn ? colors.blue('Completada') : colors.red('Pendiente');
                  console.log(`${ idx } ${ desc } :: ${ isCompleted }`);

            });   

      }

      showPendingCompletedTasks( completed = true ) {

            console.log('\n');
            const tasks = this.listArr;
            let counter = 0;

            tasks.forEach( task => {

                  const { desc, completedOn } = task;
                  const isCompleted = completedOn || colors.red('Pendiente');

                  if ( completed ) {

                        if ( completedOn ) {
                              counter++;
                              console.log(`${ colors.blue( counter.toString() ) } ${ desc } :: ${ colors.green( completedOn ) }`);
                        }

                  } else {

                        if ( !completedOn ) {
                              counter++;
                              console.log(`${ colors.blue( counter.toString() ) } ${ desc } :: ${ colors.green( isCompleted )}`);
                        }

                  }

            });

      }

      toggleTasks ( ids = [] ) {

            // Completed tasks
            ids.forEach( id => {

                  const completedTask = this._list[ id ];

                  if ( !completedTask.completedOn ) {
                        completedTask.completedOn = new Date().toISOString();
                  }

            });


            // Uncompleted tasks
            this.listArr.forEach( task => {

                  if ( !ids.includes( task.id ) ) {
                        const uncompletedTask = this._list[ task.id ];
                        uncompletedTask.completedOn = null;
                  }

            })

      }

}

export default Tasks;