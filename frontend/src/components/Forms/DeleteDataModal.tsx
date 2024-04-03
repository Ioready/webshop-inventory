import { Modal, Row, Col, Button } from "antd";
import { useDelete } from "../../contexts";
import { toast } from 'react-toastify';
export const DeleteDataModal = ({ resource, close, data }: any) => {
    const { remove, data: respond, loading } = useDelete();
    const handleUpdate = (body: any) => {
        remove(resource, body)
    }
    if (respond) {
        toast.success(`${resource} remove successfully`);
        close()
    }
    return (
        <Modal
            open={true}
            onCancel={() => close()}
            footer={null}
        >
            <h3>Are you sure you want to delete this?</h3>
            <p>This action cannot be undone. This will be deleted forever.</p>
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
                        Delete
                    </Button>
                </Col>
            </Row>
        </Modal>
    );
};