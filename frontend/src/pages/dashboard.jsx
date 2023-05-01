import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, BarController } from "chart.js";
import { Bar } from 'react-chartjs-2';
import Layout from '../components/layout';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, BarController);

const Dashboard = () => {
    return (
        <Layout title="Dashboard">
            <div class="w-full flex flex-wrap">
                <Bar
                    data={{
                        labels: ["January", "February", "March", "April", "May", "June", "July"],
                        datasets: [
                            {
                                label: "User registrations",
                                backgroundColor: "rgba(0, 0, 0, 0.8)",
                                borderColor: "rgba(220, 220, 220, 1)",
                                pointBackgroundColor: "rgba(220, 220, 220, 1)",
                                pointBorderColor: "#fff",
                                data: [40, 20, 12, 39, 10, 40, 39, 80, 40]
                            }
                        ],
                    }}
                />
            </div>
        </Layout>
    );
};

export default Dashboard;