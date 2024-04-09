"use client"
import { Doughnut } from 'react-chartjs-2'
import { LuUsers2 } from "react-icons/lu";
import { CiShoppingCart } from "react-icons/ci";
import { CiTrophy } from "react-icons/ci";
import { FiUserCheck } from "react-icons/fi";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useFetchByLoad } from '../../contexts';
import { useEffect } from 'react';
ChartJS.register(ArcElement, Tooltip, Legend);
const resource = "products";

export default function Lists() {
    
    const { fetch, data, loading } = useFetchByLoad();
    useEffect(() => {
        fetch({ url: resource });
      }, []);
    console.log(data, " data");
    const datas = [
        {
            "label":"ads",
            "value":200
        },
        {
            "label":"subscription",
            "value":100
        },
        {
            "label":"sponsership",
            "value":150
        },
    ]

    return (
        <>
        <div className=" d-flex align-items-center justify-content-center flex-wrap p-" style={{gap:"2rem", padding:"2rem"}}>
            <div className=" d-flex align-items-center justify-content-between rounded-3 shadow-lg blocks_cards" style={{padding:"1rem", gap:"1rem"}}>
               <div>
                <p className=" h1">{data?.count}</p>
                <p className=" h5"> Total Stocked product</p>
                </div>
                <div>
                    <LuUsers2 style={{fontSize:"3rem"}}/>
                </div>
            </div>
            <div className=" d-flex align-items-center justify-content-between rounded-3 shadow-lg blocks_cards" style={{padding:"1rem", gap:"1rem"}}>
               <div>
                <p className=" h1">{data?.platformCount[0].count}</p>
                <p className=" h5">{data?.platformCount[0]._id}</p>
                </div>
                <div>
                    <CiShoppingCart style={{fontSize:"3rem"}}/>
                </div>
            </div>
            <div className=" d-flex align-items-center justify-content-between rounded-3 shadow-lg blocks_cards" style={{padding:"1rem", gap:"1rem"}}>
               <div>
                <p className=" h1">{data?.platformCount[1].count}</p>
                <p className=" h5">{data?.platformCount[1]._id}</p>
                </div>
                <div>
                    <CiTrophy style={{fontSize:"3rem"}}/>
                </div>
            </div>
            <div className=" d-flex align-items-center justify-content-between rounded-3 shadow-lg blocks_cards" style={{padding:"1rem", gap:"1rem"}}>
               <div>
                <p className=" h1">17</p>
                <p className=" h5">Total User</p>
                </div>
                <div>
                    <LuUsers2 style={{fontSize:"3rem"}}/>
                </div>
            </div>
            <div className=" d-flex align-items-center justify-content-between rounded-3 shadow-lg blocks_cards" style={{padding:"1rem", gap:"1rem"}}>
               <div>
                <p className=" h1">17</p>
                <p className=" h5">Total Order Amount</p>
                </div>
                <div>
                    <FiUserCheck style={{fontSize:"3rem"}}/>
                </div>
            </div>
            <div className=" d-flex align-items-center justify-content-between rounded-3 shadow-lg blocks_cards" style={{padding:"1rem", gap:"1rem"}}>
               <div>
                <p className=" h1">17</p>
                <p className=" h5">Total User</p>
                </div>
                <div>
                    <LuUsers2 style={{fontSize:"3rem"}}/>
                </div>
            </div>
            <div className=" d-flex align-items-center justify-content-between rounded-3 shadow-lg blocks_cards" style={{padding:"1rem", gap:"1rem"}}>
               <div>
                <p className=" h1">17</p>
                <p className=" h5">Total User</p>
                </div>
                <div>
                    <LuUsers2 style={{fontSize:"3rem"}}/>
                </div>
            </div>
            <div className=" d-flex align-items-center justify-content-between rounded-3 shadow-lg blocks_cards" style={{padding:"1rem", gap:"1rem"}}>
               <div>
                <p className=" h1">17</p>
                <p className=" h5">Total User</p>
                </div>
                <div>
                    <LuUsers2 style={{fontSize:"3rem"}}/>
                </div>
            </div>
            
        </div>

        <div className=' d-flex bottom_dashboard ' style={{gap:"1rem"}}>
            <div className=' d-flex align-items-center justify-content-center p-2' style={{flex:"1"}}>
            <Doughnut
                data={{
                    labels: datas.map((item)=> item.label),
                    datasets: [
                        {
                            label:"counts",
                            data: datas.map((item)=>item.value),
                            backgroundColor: [
                                'rgb(255, 99, 132)',
                                'rgb(54, 162, 235)',
                                'rgb(255, 205, 86)'
                              ],
                        }
                    ]
                }}

                />
            </div>
            <div className='d-flex justify-content-center flex-column p-2' style={{flex:"1"}}>
    <h3> Recently Added product</h3>

    <table className="table table-striped table-bordered table-hover">
        <thead className="thead-dark ">
            <tr className='bg-info'>
                <th>S.No</th>
                <th>Product</th>
                <th>Price</th>
            </tr>
        </thead>
        <tbody>
            {data?.data.map((product:any, index:number)=>(
            <tr>
                <td>{index + 1}</td>
                <td>{product?.title}</td>
                <td>{product?.price}</td>
            </tr>
            ))}
            {/* <tr>
                <td>2</td>
                <td>Row 2 Data 1</td>
                <td>Row 2 Data 2</td>
            </tr>
            <tr>
                <td>3</td>
                <td>Row 3 Data 1</td>
                <td>Row 3 Data 2</td>
            </tr>
            <tr>
                <td>1</td>
                <td>Row 1 Data 1</td>
                <td>Row 1 Data 2</td>
            </tr>
            <tr>
                <td>2</td>
                <td>Row 2 Data 1</td>
                <td>Row 2 Data 2</td>
            </tr>
            <tr>
                <td>3</td>
                <td>Row 3 Data 1</td>
                <td>Row 3 Data 2</td>
            </tr>
            <tr>
                <td>1</td>
                <td>Row 1 Data 1</td>
                <td>Row 1 Data 2</td>
            </tr>
            <tr>
                <td>2</td>
                <td>Row 2 Data 1</td>
                <td>Row 2 Data 2</td>
            </tr>
            <tr>
                <td>3</td>
                <td>Row 3 Data 1</td>
                <td>Row 3 Data 2</td>
            </tr> */}
        </tbody>
    </table>
</div>


        </div>
        </>
    )
}