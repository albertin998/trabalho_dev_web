import ReactDOM from 'react-dom/client';
import App from './App';
import { ConfigProvider } from 'antd'
import ptBr from 'antd/lib/locale/pt_BR'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ConfigProvider locale={ptBr}>
    <App />
  </ConfigProvider>
);