import { useEffect, useRef, useMemo } from "react";
import * as d3 from "d3";
import { useFetch } from "../hooks/useFetch";
import "./login.css"; // Asegúrate de agregar este CSS

const Dashboard = () => {
    const { data, loading, error } = useFetch("http://localhost:5000/api/data");

    const barChartRef = useRef(null);
    const lineChartRef = useRef(null);
    const pieChartRef = useRef(null);
    const areaChartRef = useRef(null);

    // 🔹 Transformar datos de la API usando useMemo
    const transformedData = useMemo(() => {
        return data?.data?.map(d => ({
            date: d.date,
            co2: d.co2_emissions,
            water: d.water_consumption,
            waste: d.waste_generated
        })) || [];
    }, [data]);

    useEffect(() => {
        if (transformedData.length > 0) {
            drawBarChart(transformedData);
            drawLineChart(transformedData);
            drawPieChart(transformedData);
            drawAreaChart(transformedData);
        }
    }, [transformedData]);

    // 📌 Gráfico de Barras - Emisiones de CO₂
    const drawBarChart = (data) => {
        const svg = d3.select(barChartRef.current);
        svg.selectAll("*").remove();

        const margin = { top: 20, right: 30, bottom: 40, left: 60 };
        const width = 300 - margin.left - margin.right;
        const height = 250 - margin.top - margin.bottom;

        const chart = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

        const xScale = d3.scaleBand().domain(data.map(d => d.date)).range([0, width]).padding(0.2);
        const yScale = d3.scaleLinear().domain([0, d3.max(data, d => d.co2)]).range([height, 0]);

        chart.append("g").attr("transform", `translate(0,${height})`).call(d3.axisBottom(xScale));
        chart.append("g").call(d3.axisLeft(yScale));

        chart.selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", d => xScale(d.date))
            .attr("y", d => yScale(d.co2))
            .attr("width", xScale.bandwidth())
            .attr("height", d => height - yScale(d.co2))
            .attr("fill", "red");
    };

    // 📌 Gráfico de Líneas - Consumo de Agua
    const drawLineChart = (data) => {
        const svg = d3.select(lineChartRef.current);
        svg.selectAll("*").remove();

        const margin = { top: 20, right: 30, bottom: 40, left: 60 };
        const width = 300 - margin.left - margin.right;
        const height = 250 - margin.top - margin.bottom;

        const chart = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

        const xScale = d3.scalePoint().domain(data.map(d => d.date)).range([0, width]);
        const yScale = d3.scaleLinear().domain([0, d3.max(data, d => d.water)]).range([height, 0]);

        const line = d3.line().x(d => xScale(d.date)).y(d => yScale(d.water));

        chart.append("g").attr("transform", `translate(0,${height})`).call(d3.axisBottom(xScale));
        chart.append("g").call(d3.axisLeft(yScale));

        chart.append("path").datum(data).attr("fill", "none").attr("stroke", "blue").attr("stroke-width", 2).attr("d", line);
    };

    // 📌 Gráfico de Pastel - Gestión de Residuos
    const drawPieChart = (data) => {
        const svg = d3.select(pieChartRef.current);
        svg.selectAll("*").remove();

        const width = 250;
        const height = 250;
        const radius = Math.min(width, height) / 2;

        const pie = d3.pie().value(d => d.waste);
        const arc = d3.arc().innerRadius(0).outerRadius(radius);

        const color = d3.scaleOrdinal(d3.schemeCategory10);

        const chart = svg.append("g").attr("transform", `translate(${width / 2},${height / 2})`);

        const arcs = chart.selectAll("g").data(pie(data)).enter().append("g");

        arcs.append("path").attr("d", arc).attr("fill", (d, i) => color(i));
    };

    // 📌 Gráfico de Área - Comparación General
    const drawAreaChart = (data) => {
        const svg = d3.select(areaChartRef.current);
        svg.selectAll("*").remove();

        const margin = { top: 20, right: 30, bottom: 40, left: 60 };
        const width = 300 - margin.left - margin.right;
        const height = 250 - margin.top - margin.bottom;

        const chart = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

        const xScale = d3.scalePoint().domain(data.map(d => d.date)).range([0, width]);
        const yScale = d3.scaleLinear().domain([0, d3.max(data, d => d.co2 + d.water + d.waste)]).range([height, 0]);

        const area = d3.area().x(d => xScale(d.date)).y0(height).y1(d => yScale(d.co2 + d.water + d.waste));

        chart.append("g").attr("transform", `translate(0,${height})`).call(d3.axisBottom(xScale));
        chart.append("g").call(d3.axisLeft(yScale));

        chart.append("path").datum(data).attr("fill", "green").attr("opacity", 0.5).attr("d", area);
    };

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <aside id="sidebar">
                <nav id="sidebar-nav">
                    <ul>
                        <li className="active"><a href="#">📊 Dashboard</a></li>
                        <li><a href="#">🌿 Indicadores Ambientales</a></li>
                        <li><a href="#">📈 Comparación de Datos</a></li>
                        <li><a href="#">📄 Generación de Reportes</a></li>
                        <li><a href="#">👥 Comunidad</a></li>
                    </ul>
                </nav>
            </aside>

            <main id="content">
                {/* Header */}
                <header id="header">
                    <div className="nav-profile">
                        <img src="https://via.placeholder.com/40" alt="User Avatar" className="user-avatar" />
                        <span className="nav-profile-name">Jane Smith</span>
                    </div>
                </header>

                {/* Dashboard Content */}
                <section className="content">
                    <h1>📊 Dashboard - EcoStats 🌍</h1>

                    {/* Loading/Error Messages */}
                    {loading && <p className="loading-text">Cargando datos...</p>}
                    {error && <p className="error-text">Error al cargar los datos: {error}</p>}

                    {/* Chart Grid */}
                    <div className="dashboard-grid">
                        <div className="chart-card"><h3>📈 Emisiones de CO₂</h3><svg ref={barChartRef}></svg></div>
                        <div className="chart-card"><h3>💧 Consumo de Agua</h3><svg ref={lineChartRef}></svg></div>
                        <div className="chart-card"><h3>♻ Gestión de Residuos</h3><svg ref={pieChartRef}></svg></div>
                        <div className="chart-card"><h3>📊 Comparación General</h3><svg ref={areaChartRef}></svg></div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Dashboard;
