"use client"
import { Doughnut, Line } from 'react-chartjs-2'
import { FaAmazon } from "react-icons/fa";
import { LuUsers2 } from "react-icons/lu";
import { CiShoppingCart } from "react-icons/ci";
import { CiTrophy } from "react-icons/ci";
import { FiUserCheck } from "react-icons/fi";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from "chart.js";
import { useFetchByLoad } from '../../contexts';
import { useEffect } from 'react';

// Register the required components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

const resource = "products";

export default function Lists() {

    const { fetch, data, loading } = useFetchByLoad();
    useEffect(() => {
        fetch({ url: resource });
    }, []);
    console.log(data, " data");
    const datas = [
        {
            "label": "ads",
            "value": 200
        },
        {
            "label": "subscription",
            "value": 100
        },
        {
            "label": "sponsership",
            "value": 150
        },
    ]

    return (
        <>
            <div className="main_caed_block" style={{ gap: "2rem", padding: "2rem" }}>
                <div className=" d-flex align-items-center justify-content-between rounded-3 shadow-lg blocks_cards" style={{ padding: "1rem", gap: "3rem" }}>
                    <div>
                        <p className="h1">17</p>
                        <p className="h5"> Total Inventory Stock</p>
                    </div>
                    <div>
                        <CiShoppingCart style={{ fontSize: "3rem" }} />
                    </div>
                </div>
                <div className=" d-flex align-items-center justify-content-between rounded-3 shadow-lg blocks_cards" style={{ padding: "1rem", gap: "3rem" }}>
                    <div>
                        <p className=" h1">32</p>
                        <p className=" h5">Amazon</p>
                    </div>
                    <div>
                        <FaAmazon style={{ fontSize: "3rem" }} />
                    </div>
                </div>
                <div className=" d-flex align-items-center justify-content-between rounded-3 shadow-lg blocks_cards" style={{ padding: "1rem", gap: "3rem" }}>
                    <div>
                        <p className=" h1">23</p>
                        <p className=" h5">Bol.com</p>
                    </div>
                    <div>
                        <CiTrophy style={{ fontSize: "3rem" }} />
                    </div>
                </div>
                <div className=" d-flex align-items-center justify-content-between rounded-3 shadow-lg blocks_cards" style={{ padding: "1rem", gap: "3rem" }}>
                    <div>
                        <p className=" h1">17</p>
                        <p className=" h5">Total Product Webshop</p>
                    </div>
                    <div>
                        <LuUsers2 style={{ fontSize: "3rem" }} />
                    </div>
                </div>
                <div className=" d-flex align-items-center justify-content-between rounded-3 shadow-lg blocks_cards" style={{ padding: "1rem", gap: "1rem" }}>
                    <div>
                        <p className=" h1">17</p>
                        <p className=" h5">Total Order</p>
                    </div>
                    <div>
                        <FiUserCheck style={{ fontSize: "3rem" }} />
                    </div>
                </div>
                <div className=" d-flex align-items-center justify-content-between rounded-3 shadow-lg blocks_cards" style={{ padding: "1rem", gap: "1rem" }}>
                    <div>
                        <p className=" h1">17</p>
                        <p className=" h5">Total Customers</p>
                    </div>
                    <div>
                        <LuUsers2 style={{ fontSize: "3rem" }} />
                    </div>
                </div>
                <div className=" d-flex align-items-center justify-content-between rounded-3 shadow-lg blocks_cards" style={{ padding: "1rem", gap: "1rem" }}>
                    <div>
                        <p className=" h1">17</p>
                        <p className=" h5">Total Earning</p>
                    </div>
                    <div>
                        <LuUsers2 style={{ fontSize: "3rem" }} />
                    </div>
                </div>
                <div className=" d-flex align-items-center justify-content-between rounded-3 shadow-lg blocks_cards" style={{ padding: "1rem", gap: "1rem" }}>
                    <div>
                        <p className=" h1">17</p>
                        <p className=" h5">Demo</p>
                    </div>
                    <div>
                        <LuUsers2 style={{ fontSize: "3rem" }} />
                    </div>
                </div>

            </div>

            <div className=' d-flex align-items-center justify-content-center p-2' style={{width:"100%", height:"70vh"}}>
                <Line
                    data={{
                        labels: ['jan','feb','mar','apr','may','june','july','aug','sept'],
                                datasets: [{
                                  label: 'Webshop Revenue',
                                  data: [0, 0, 20, 0, 0, 0, 0, 0, 50],
                                  borderColor: 'rgb(75, 192, 192)',
                                  tension: 0.5,
                                }]
                            }
                    }

                />
            </div>

            {/* <div className=' d-flex bottom_dashboard justify-content-center ' style={{ gap: "1rem", alignItems: "flex-start" }}>
                <div className='d-flex justify-content-center flex-column p-2 charts_block'>
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
                            {data?.data.map((product: any, index: number) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{product?.title}</td>
                                    <td>{product?.price}</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>


                    <nav aria-label="Page navigation example" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", width: "100%" }}>

                        <ul className="pagination">
                            <li className="page-item">
                                <a className="page-link" href="#" aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                </a>
                            </li>
                            <li className="page-item"><a className="page-link" href="#">1</a></li>
                            <li className="page-item">
                                <a className="page-link" href="#" aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                </a>
                            </li>
                        </ul>

                        <p>Showing 1 to 2 of entries</p>

                    </nav>
                </div>
                <div className='d-flex justify-content-center flex-column p-2 charts_block'>
                    <h3> Recently Added Webshop</h3>

                    <table className="table table-striped table-bordered table-hover">
                        <thead className="thead-dark ">
                            <tr className='bg-info'>
                                <th>S.No</th>
                                <th>Product</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.data.map((product: any, index: number) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{product?.title}</td>
                                    <td>{product?.price}</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>


                    <nav aria-label="Page navigation example" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", width: "100%" }}>

                        <ul className="pagination">
                            <li className="page-item">
                                <a className="page-link" href="#" aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                </a>
                            </li>
                            <li className="page-item"><a className="page-link" href="#">1</a></li>
                            <li className="page-item">
                                <a className="page-link" href="#" aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                </a>
                            </li>
                        </ul>

                        <p>Showing 1 to 2 of entries</p>

                    </nav>
                </div>
            </div> */}
        </>
    )
}
