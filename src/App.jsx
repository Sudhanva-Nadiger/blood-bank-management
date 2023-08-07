import { ConfigProvider} from 'antd'

function App() {
  return (
    <ConfigProvider>
     <div className="flex justify-center items-start bg-red-500">
        <h1 className="text-white">
          Hello World
        </h1>
     </div>
    </ConfigProvider>
  )
}

export default App
