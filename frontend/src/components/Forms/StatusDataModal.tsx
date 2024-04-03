import { Modal, Row, Col, Button } from "antd";
import { usePatch } from "../../contexts";
import { toast } from 'react-toastify';
export const StatusDataModal = ({ resource, close, data }: any) => {
    const { edit, data: respond, loading } = usePatch();
    const handleUpdate = (body: any) => {
        edit(resource, { id: body._id, status: (data.status ? false : true) })
    }
    if (respond) {
        toast.success(`Status update successfully`);
        close()
    }
    return (
        <Modal
            open={true}
            onCancel={() => close()}
            footer={null}
        >
            <h3>{`Are you sure you want to ${data.status ? "inactive" : "active"} this?`}</h3>
            <Row gutter={20}>
                <Col>
                    <Button onClick={() => close(null)} size="large">
                        Cancel
                    </Button>
                </Col>
                <Col>
                    <Button
                        loading={loading}
                        onClick={() => handleUpdate(data)}
                        size="large"
                        type="primary"
                        danger
                    >
                        {data.status ? "INACTIVE" : "ACTIVE"}
                    </Button>
                </Col>
            </Row>
        </Modal>
    );
};