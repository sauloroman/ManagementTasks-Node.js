import { v4 as uuidv4 } from 'uuid';

class Task {

      id = '';
      desc = '';
      completedOn = '';

      constructor( desc ) {
            this.id = uuidv4();
            this.desc = desc;
            this.completedOn = null;
      }

}

export default Task;