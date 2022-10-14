import inquirer from "inquirer";
import colors from 'colors';

const showMenuOptions = async () => {

      console.clear();
      console.log(colors.blue( '==========================' ));
      console.log(colors.bold('  SELECCIONE UNA OPCIÓN'));
      console.log(colors.blue( '==========================\n' ));

      const optionsApp = [
            {     
                  type: 'list',
                  name: 'option',
                  message: 'Selecciona: ',
                  choices: [
                        {
                              value: '1',
                              name: `${ colors.blue('1.' ) } Crear Tarea`
                        },
                        {
                              value: '2',
                              name: `${ colors.blue('2.' ) } Listar Tareas`
                        },
                        {
                              value: '3',
                              name: `${ colors.blue('3.' ) } Listar Tareas Completas`
                        },
                        {
                              value: '4',
                              name: `${ colors.blue('4.' ) } Listar Tareas Pendientes`
                        },
                        {
                              value: '5',
                              name: `${ colors.blue('5.' ) } Completar Tarea(s)`
                        },
                        {
                              value: '6',
                              name: `${ colors.blue('6.' ) } Borrar Tarea`
                        },
                        {
                              value: '7',
                              name: `${ colors.blue('7.' ) } Salir de la aplicación`
                        },
                  ]
            }
      ]

      const { option } = await inquirer.prompt( optionsApp );

      return option;
}

const pauseApp = async() => {
      console.log('\n');

      const pauseQuestion = [
            {
                  type: 'input',
                  name: 'pause',
                  message: `Presione ${ colors.blue('ENTER') } para continuar`
            }
      ]

      const { pause } = await inquirer.prompt( pauseQuestion );

      return pause;

}

const readTextFromUser = async ( message ) => {

      const question = [
            {
                  type: 'input',
                  name: 'text',
                  message
            }
      ]

      const { text } = await inquirer.prompt( question );

      return text;
}

const showCheckListTasks = async ( tasks = [] ) => {

      const choices = tasks.map( ( task, i ) => {
      
            const idx = colors.blue( `${i + 1}.` );

            return  {
                  value: task.id,
                  name: `${ idx } ${ task.desc }`,
                  checked: ( task.completedOn ) ? true : false
            }

      });

      const question = [
            {
                  type: 'checkbox',
                  name: 'ids',
                  message: 'Selecciona las tareas completas: ',
                  choices
            }
      ]

      const { ids } = await inquirer.prompt( question );

      return ids;

}

const showTasksToEliminate = async ( tasks = [] ) => {

      const choices = tasks.map( ( task, i ) => {
      
            const idx = colors.blue( `${i + 1}.` );

            return  {
                  value: task.id,
                  name: `${ idx } ${ task.desc }`,
            }
      });

      choices.unshift( 
            {
                  value: '0',
                  name: `${ colors.blue('0.') } Cancelar`
            }
      )

      const question = [
            {
                  type: 'list',
                  name: 'id',
                  message: 'Selecciona la tarea a borrar: ',
                  choices
            }
      ]

      const { id } = await inquirer.prompt( question );

      return id;
}   

const confirmUser = async ( message ) => {

      const question = [
            {
                  type: 'confirm',
                  name: 'decision',
                  message
            }
      ]

      const { decision } = await inquirer.prompt( question );

      return decision;
}

export {
      showMenuOptions,
      pauseApp,
      readTextFromUser,
      showCheckListTasks,
      showTasksToEliminate,
      confirmUser
}