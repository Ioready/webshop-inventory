import { Link } from "react-router-dom";
import { Breadcrumb } from "antd";
interface BreadcrumbProps {
  pageName: string;
}
const Breadcrumbs = ({ pageName }: BreadcrumbProps) => {
  return (
    <div className="breadcrumbs">
      <Breadcrumb>
        <Breadcrumb.Item><Link className="font-medium" to="/">Home</Link></Breadcrumb.Item>
        <Breadcrumb.Item>{pageName}</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
};

export default Breadcrumbs;
