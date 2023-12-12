import { Modal, Input, Form, Row, Col } from "antd"
import { useState, React } from 'react';
import LivroRequest from './livro'

function CadastroLivro({ visible, form, afterPost, onCancel }) {
    const [confirmLoading, setConfirmLoading] = useState(false);

    const sucess = () => {
        Modal.success({
            content: 'Registro gravado com sucesso.',
        });
    }

    async function CadastrarLivro(livro) {
        const response = await LivroRequest.CadastrarLivro(livro);
        if (response.status === 201 | response.status === 200) {
            form.resetFields();
            sucess();
            setConfirmLoading(false)
            afterPost(response.data)
        }
    }

    const handleOk = () => {
        form
            .validateFields()
            .then(values => {
                setConfirmLoading(true)
                CadastrarLivro(values)
            })
            .catch(info => {
                console.log('erro:', info);
            });
    }

    return (
        <Modal
            width={400}
            title="Cadastro"
            visible={visible}
            onOk={handleOk}
            onCancel={onCancel}
            destroyOnClose={true}
            confirmLoading={confirmLoading}
        >

            <Form
                form={form}
                layout="vertical"
                preserve={false}
            >

                <Row gutter={20}>

                    <Col span={0} >
                        <Form.Item
                            name='livro_id'
                        ></Form.Item>
                    </Col>
                    <Col span={20} >
                        <Form.Item
                            name='nome_livro'
                            label='Nome Livro:'
                            rules={[
                                {
                                    required: true,
                                    message: 'Informe o nome do livro'
                                },
                            ]}

                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col span={20} >
                        <Form.Item
                            name='descricao'
                            label='Descricão:'
                            rules={[
                                {
                                    required: true,
                                    message: 'Informe a descrição do livro'
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

            </Form>
        </Modal>


    )
}

export default CadastroLivro