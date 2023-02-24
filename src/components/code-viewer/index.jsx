import React, { useEffect, useState, useMemo } from 'react';
import {
  Sandpack
} from '@codesandbox/sandpack-react';

function CodeViewer({
  exampleName
}) {
  const [filesNamesToFilesSrcMap, setFilesNamesToFilesSrcMap] = useState(null);

  useEffect(() => {
    const loadFiles = async () => {
      const entyPointFileContent = await import(`!raw-loader!./${exampleName}/index.js`);
      const defaultExportFromEntryPointFile = entyPointFileContent.default;
      const entyPointFileName = `/App.js`
      setFilesNamesToFilesSrcMap({
        [entyPointFileName]: defaultExportFromEntryPointFile
      });
    };

    loadFiles();
  }, []);

  const editorHeight = '70vh';
  const isFilesNotLoaded = !filesNamesToFilesSrcMap

  if (isFilesNotLoaded) {
    return <div style={{ minHeight: editorHeight }} />;
  }


  return (
    <Sandpack options={{
      editorHeight
    }} files={filesNamesToFilesSrcMap} template="react" />
  )
}

export default CodeViewer