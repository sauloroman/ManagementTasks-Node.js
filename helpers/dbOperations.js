import fileSystem from 'fs';

const file = './db/data.json';

const saveFile = data => {
      fileSystem.writeFileSync( file, JSON.stringify( data ) );
}

const readFile = () => {

      if ( !fileSystem.existsSync( file ) ) {
            return null;
      }

      const data = fileSystem.readFileSync( file, { encoding: 'utf-8' } );
      const info = JSON.parse( data );

      return info;
}

export {
      saveFile,
      readFile
}