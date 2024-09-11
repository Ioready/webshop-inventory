import { Drawer } from "antd";
import { usePost } from "../../contexts";
import { toast } from 'react-toastify';
export const CreateDataDrawer = ({ resource, close, FormData,categoryData, data }: any) => {
    // console.log('categories',categoryData);    
    
    const { create, data: respond, loading } = usePost();
    
    const handleUpdate = (body: any) => {
        create(resource, body)
    }
    if (respond) {
        toast.success(`New ${resource} add successfully`);
        close()
    }
    return (
        <Drawer maskClosable={false} mask={true} width="70%" title={`Add ${resource}`} placement="right" onClose={() => close(null)} open={true} footer={<div className="p-7"></div>}>
            <FormData initialValues={data} handleUpdate={handleUpdate} loading={loading} categoryData={categoryData}/>
        </Drawer>
    );
};