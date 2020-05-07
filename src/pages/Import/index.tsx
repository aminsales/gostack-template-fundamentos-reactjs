import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import filesize from 'filesize';

import Header from '../../components/Header';
import FileList from '../../components/FileList';
import Upload from '../../components/Upload';

import { Container, Title, ImportFileContainer, Footer, Error } from './styles';

import alert from '../../assets/alert.svg';
import api from '../../services/api';

interface FileProps {
  file: File;
  name: string;
  readableSize: string;
}

const Import: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);
  const [inputError, setInputError] = useState('');
  const history = useHistory();

  async function handleUpload(): Promise<void> {
    const data = new FormData();
    // TODO
    try {
      data.append('file', uploadedFiles[0].file);
      await api.post('/transactions/import', data);
    } catch (err) {
      setInputError(
        'Importação não realizada. Adicione um arquivo com a estrutura correta!',
      );
    }
  }

  function submitFile(files: File[]): void {
    // TODO
    const submitedFiles: FileProps[] = files.map(file => {
      const fileprops: FileProps = {
        file,
        name: file.name,
        readableSize: filesize(file.size),
      };
      return fileprops;
    });

    setUploadedFiles(submitedFiles);
  }

  return (
    <>
      <Header size="small" />
      <Container>
        <Title>Importar uma transação</Title>
        <ImportFileContainer>
          <Upload onUpload={submitFile} />
          {!!uploadedFiles.length && <FileList files={uploadedFiles} />}
          {inputError && <Error>{inputError}</Error>}
          <Footer>
            <p>
              <img src={alert} alt="Alert" />
              Permitido apenas arquivos CSV
            </p>
            <button onClick={handleUpload} type="button">
              Enviar
            </button>
          </Footer>
        </ImportFileContainer>
      </Container>
    </>
  );
};

export default Import;
