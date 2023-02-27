import React, { useEffect, useState, useMemo } from 'react';
import {
  Sandpack
} from '@codesandbox/sandpack-react';

function CodeViewer({
  exampleName,
  showConsole,
}) {
  const [filesNamesToFilesSrcMap, setFilesNamesToFilesSrcMap] = useState(null);

  useEffect(() => {
    const loadFiles = async () => {
      const entryPointFileContent = await import(`!raw-loader!./${exampleName}/index.js`);
      const defaultExportFromEntryPointFile = entryPointFileContent.default;
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
    <div style={{ paddingBottom: 16 }}>
      <Sandpack options={{
        editorHeight,
        showConsole,
      }} files={filesNamesToFilesSrcMap} template="react" />
    </div>
  )
}

export default CodeViewer