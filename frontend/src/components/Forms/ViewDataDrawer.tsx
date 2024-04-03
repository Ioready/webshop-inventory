import { Drawer } from "antd";

export const ViewDataDrawer = ({ resource, close, ViewData, data }: any) => {
    return (
        <Drawer maskClosable={false} mask={true} width="70%" title={`View ${resource}`} placement="right" onClose={() => close(null)} open={true} footer={null}>
            <ViewData data={data} />
        </Drawer>
    );
};