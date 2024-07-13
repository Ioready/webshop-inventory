import { useEffect, useState, Fragment } from 'react';
import { Descriptions, Image, Tag } from 'antd';
import { LiaProductHunt } from "react-icons/lia";

export function ViewData({ data }: any) {
    const [details, setDetails] = useState([])
    useEffect(() => {
        let newData = JSON.parse(JSON.stringify(data))
        if (newData) {
            delete newData._id
            delete newData.title
            delete newData.description
            delete newData.images
            delete newData.status
            delete newData.stores
            delete newData.__v
            delete newData.createdAt
            delete newData.updatedAt

            let details: any = []
            for (let key in newData) {
                details.push({
                    label: key,
                    children: newData[key],
                })
            }
            setDetails(details)
        }
    }, [data])


    return (
        <>

            <Descriptions>
                <Descriptions.Item span={0.5}>{data?.images ? <Image width={100} src={data?.images[0]} /> : <LiaProductHunt size={30} />}</Descriptions.Item>
                <Descriptions.Item span={2}>{data?.title}</Descriptions.Item>
                <Descriptions.Item span={0.5}><Tag color={data?.status ? "success" : "error"}>{data?.status ? "ACTIVE" : "INACTIVE"}</Tag></Descriptions.Item>
            </Descriptions>

            <hr /><br />

            <Descriptions title="Location">
                {data?.stores && data.stores.map((item: any, i: number) => <span key={i} >
                    <Descriptions.Item span={2}>{item?.location}</Descriptions.Item>
                    <Descriptions.Item span={2}><span style={{ fontWeight: 'bold', marginLeft: 10, display: 'inline-block' }}> {Number(item?.qty) - Number(item?.laps)}</span></Descriptions.Item>
                </span>)}
            </Descriptions>

            <hr /><br />

            <Descriptions title="Description">
                <Descriptions.Item><div dangerouslySetInnerHTML={{ __html: data?.description }} /></Descriptions.Item>
            </Descriptions>

            <hr /><br />

            <Descriptions title="Product Details" items={details} />
        </>
    );
}