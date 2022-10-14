import colors from 'colors';
import { readFile, saveFile } from "./helpers/dbOperations.js";
import { confirmUser, pauseApp, readTextFromUser, showCheckListTasks, showMenuOptions, showTasksToEliminate } from "./helpers/inquirer.js";
import Tasks from "./models/Tasks.js";

const main = async () => {

      let opt = '';
      const tasks = new Tasks();
      const tasksOnDB = readFile();

      if ( tasksOnDB ) {
            tasks.setTasksFromArray( tasksOnDB );
      }

      do {

            opt = await showMenuOptions();
            
            switch( opt ) {
            
                  case '1':   
                        const desc = await readTextFromUser('Descripción: ');
                        tasks.createTask( desc );
                        console.log(`${ colors.green('TAREA CREADA') }`);
                  break;
            
                  case '2':
                        tasks.showTasksList();
                  break;

                  case '3':
                        tasks.showPendingCompletedTasks( true );
                  break;

                  case '4':
                        tasks.showPendingCompletedTasks( false );
                  break;

                  case '5':
                        const ids = await showCheckListTasks( tasks.listArr );
                        tasks.toggleTasks( ids );
                  break;
            
                  case '6':
                        const id = await showTasksToEliminate( tasks.listArr );

                        if ( id !== '0' ) {

                              const answerUser = await confirmUser('¿Está seguro de eliminar esta tarea?');

                              if ( answerUser ) {
                                    tasks.deleteTask( id );
                                    console.log(`${ colors.green('TAREA ELIMINADA')}`);
                              }

                        }

                  break;
            }

            saveFile( tasks.listArr );

            await pauseApp();

      } while( opt !== '7' );

}

main();