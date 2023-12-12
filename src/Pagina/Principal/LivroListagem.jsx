import React, { useEffect, useState } from 'react';
import { Button, Table, Space, Form } from 'antd';
import LivroRequest from './livro'
import CadastroLivro from './LivroCadastro';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import confirm from 'antd/es/modal/confirm';
import "./livro.css"


const LivroListagem = () => {
  const [livros, setLivro] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const columns = [
    {
      title: 'ID',
      dataIndex: 'livro_id',
      key: 'livro_id',
    },
    {
      title: 'Nome livro',
      dataIndex: 'nome_livro',
      key: 'nome_Livro',
    },
    {
      title: 'Descrição',
      dataIndex: 'descricao',
      key: 'descricao',
    },
    {
      title: 'Ações',
      key: 'acoes',
      render: record =>
        <Space>
          <EditOutlined
            onClick={_ => onEditLivro(record.livro_id)}
          />
          <DeleteOutlined
            onClick={_ => onDeletarLivro(record.livro_id)}
          />
        </Space>

    }
  ];

  const afterPost = () => {
    setIsModalVisible(false)
    CarregarLivro()
  }

  const showModal = () => {
    setIsModalVisible(true);
  }

  async function onEditLivro(id) {
    const livro = await LivroRequest.getLivro(id);
    console.log(livro)
    form.setFieldsValue(livro)
    showModal()
  }


  function onDeletarLivro(id) {
    confirm({
      title: 'Deseja realmente excluir esse Livro',

      onOk() {
        LivroRequest.ExcluirLivro(id)     
        setLivro(prevLivros => prevLivros.filter(livros => livros.livro_id !== id));   
      },

      onCancel() {
      },
    });
  }

  async function CarregarLivro() {
    const response = await LivroRequest.getListaLivro()

    setLivro(response.data)


  }

  useEffect(() => {
    CarregarLivro()
  }, []);

  const handleAddItem = () => {
    showModal()
  };

  return (
    <div id='livro' style={{ textAlign: 'center', padding: '20px', minHeight: '580px' }}>
      <h1>Clube do livro</h1>
      <Button type="primary" onClick={handleAddItem} style={{ marginBottom: '20px' }}>
        Incluir Novo Livro
      </Button>
      <Table dataSource={livros} columns={columns} />
      <CadastroLivro visible={isModalVisible} form={form} afterPost={afterPost} onCancel={() => setIsModalVisible(false)} />
    </div>
  );
};

export default LivroListagem;