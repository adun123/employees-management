import { useEffect, useState, useMemo } from "react";
import { getEmployees } from "../services/api"; 

import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

import { Users, DollarSign, Briefcase, CalendarCheck } from 'lucide-react'; 

// ChartJS setup
ChartJS.register(BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend);

const chartColors = [
    '#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#3B82F6', '#EC4899'
];

// Card Component
function Card({ title, value, iconName }) {
    const iconMap = { "Total Employees": Users, "Avg Salary": DollarSign, "Recent Additions": CalendarCheck };
    const Icon = iconMap[iconName] || Briefcase;

    return (
        <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition w-full">
            <div className="flex justify-between items-start">
                <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</p>
                <div className="p-2 rounded-full bg-indigo-100 text-indigo-600">
                    <Icon className="w-5 h-5" />
                </div>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 mt-2">
                {typeof value === "number" ? value.toLocaleString("id-ID") : value}
            </h3>
        </div>
    );
}

// Section Component
function Section({ title, children, className = "" }) {
    return (
        <div className={`bg-white p-5 sm:p-6 rounded-xl shadow-md border border-gray-100 ${className}`}>
            <h2 className="font-bold text-lg sm:text-xl text-gray-800 mb-4 border-b pb-2">{title}</h2>
            {children}
        </div>
    );
}

export default function Dashboard() {
    const [employees, setEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        load();
    }, []);

    async function load() {
        setIsLoading(true);
        try {
            const res = await getEmployees();
            setEmployees(res);
        } catch (error) {
            console.error("Failed to fetch employees:", error);
        } finally {
            setIsLoading(false);
        }
    }

    const { totalEmployees, departmentMap, avgSalaryData, globalAvgSalary, recent } = useMemo(() => {
        const totalEmployees = employees.length;

        const departmentMap = employees.reduce((acc, e) => {
            acc[e.department] = (acc[e.department] || 0) + 1;
            return acc;
        }, {});

        const salaryMap = employees.reduce((acc, e) => {
            if (!acc[e.department]) acc[e.department] = { total: 0, count: 0 };
            acc[e.department].total += Number(e.salary);
            acc[e.department].count++;
            return acc;
        }, {});

        const avgSalaryData = Object.keys(salaryMap).map(d => ({
            dept: d, avg: Math.round(salaryMap[d].total / salaryMap[d].count)
        }));

        const totalSalary = employees.reduce((sum, e) => sum + Number(e.salary), 0);
        const globalAvgSalary = totalEmployees > 0 ? Math.round(totalSalary / totalEmployees) : 0;

        const recent = [...employees]
            .sort((a, b) => new Date(b.hire_date) - new Date(a.hire_date))
            .slice(0, 5);

        return { totalEmployees, departmentMap, avgSalaryData, globalAvgSalary, recent };
    }, [employees]);

    const departmentPieData = {
        labels: Object.keys(departmentMap),
        datasets: [{
            label: 'Jumlah Karyawan',
            data: Object.values(departmentMap),
            backgroundColor: chartColors.slice(0, Object.keys(departmentMap).length).map(c => `${c}B0`),
            borderColor: chartColors,
            borderWidth: 1,
        }]
    };

    const avgSalaryBarData = {
        labels: avgSalaryData.map(d => d.dept),
        datasets: [{
            label: 'Rata-rata Gaji (IDR)',
            data: avgSalaryData.map(d => d.avg),
            backgroundColor: '#4F46E5',
            borderWidth: 1,
            borderRadius: 5,
        }]
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[70vh]">
                <p className="text-lg text-indigo-600 animate-pulse">Memuat Dashboard...</p>
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-8">

            {/* Page Title */}
            <h1 className="text-xl mt-5 sm:text-2xl font-bold text-gray-900 mb-6">Dashboard Utama</h1>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                <Card title="Total Karyawan" value={totalEmployees} iconName="Total Employees" />
                <Card title="Rata-rata Gaji Global" value={globalAvgSalary} iconName="Avg Salary" />
                <Card title="Jumlah Departemen" value={Object.keys(departmentMap).length} iconName="Briefcase" />
                <Card title="Tambahan Terbaru" value={recent.length} iconName="Recent Additions" />
            </div>

            {/* Charts & Recent */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Pie Chart */}
                <Section title="Karyawan per Departemen" className="lg:col-span-2">
                    <div className="max-w-full flex justify-center">
                        <div className="w-full sm:w-3/4">
                            <Pie data={departmentPieData} />
                        </div>
                    </div>
                </Section>

                {/* Recent Additions */}
                <Section title="Tambahan Terbaru">
                    <ul className="space-y-3">
                        {recent.map(r => (
                            <li key={r.id} className="p-3 bg-gray-50 rounded-lg border flex justify-between items-center">
                                <div>
                                    <p className="font-semibold">{r.name}</p>
                                    <p className="text-sm text-indigo-600">{r.department}</p>
                                </div>
                                <span className="text-xs text-gray-500 bg-indigo-50 px-2 py-1 rounded-full">
                                    {r.hire_date}
                                </span>
                            </li>
                        ))}
                    </ul>
                </Section>

                {/* Bar chart */}
                <Section title="Rata-rata Gaji per Departemen" className="lg:col-span-3">
                    <Bar data={avgSalaryBarData} />
                </Section>

            </div>
        </div>
    );
}
