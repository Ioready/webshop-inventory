import { Drawer } from "antd";
import { usePatch } from "../../contexts";
import { toast } from 'react-toastify';
export const EditDataDrawer = ({ resource, close, FormData,categoryData, data }: any) => {
    const { edit, data: respond, loading } = usePatch();
    const handleUpdate = (body: any) => {
        edit(resource, { ...body })
    }
    if (respond) {
        toast.success(`${resource} update successfully`);
        close()
    }
    return (
        <Drawer maskClosable={false} mask={true} width="70%" title={`Edit ${resource}`} placement="right" onClose={() => close(null)} open={true} footer={<div className="p-7"></div>}>
            <FormData initialValues={data} handleUpdate={handleUpdate} loading={loading} categoryData={categoryData} />
        </Drawer>
    );
};