import React from "react";
import jsonData from "../json-data.json";
const diseaseID = jsonData.metaData.dimensions.dx;
const periodID = jsonData.metaData.dimensions.pe;
const regionID = jsonData.metaData.dimensions.ou;
const rowsData = jsonData.rows;

const Home = () => {
  const TableColumnsNames = () => {
    let header1titles = [];
    let header2sectiontitle = [];

    regionID.forEach((region) => {
      let regionName = jsonData.metaData.items[region].name;
      header1titles.push(regionName);
    });

    diseaseID.forEach((disease) => {
      let diseaseName = jsonData.metaData.items[disease].name;
      header2sectiontitle.push(diseaseName);
    });

    const header2titles = header2sectiontitle.concat(header2sectiontitle);

    return [header1titles, header2titles];
  };

  const TableRows = () => {
    const rowData = [];

    periodID.forEach((period) => {
      let periodName = [jsonData.metaData.items[period].name];

      regionID.forEach((region) => {
        diseaseID.forEach((disease) => {
          rowsData.forEach((row) => {
            if (row[0] === disease && row[2] === period && row[1] === region) {
              periodName.push(Math.round(row[3]));
            }
          });
        });
      });

      rowData.push(periodName);
    });

    return rowData;
  };

  const tableData = TableRows();
  const [header1titles, header2titles] = TableColumnsNames();

  return (
    <div style={styles.mainContainer}>
      <header style={headerStyle}>HISP Tanzania</header>
      <center>
        
      <div style={{display:'flex',textAlign:'center',justifyContent:'center',marginTop:20,alignItems:'center'}}>
      <img src="https://hisptanzania.org/assets/img/logo/HISP-LOGO.svg" width={100}/>
      <p style={{fontFamily:'Montserrat'}}>| Saroni Saitoria</p>
      </div>
      <div style={{display:'flex',textAlign:'center',justifyContent:'center',marginTop:20,alignItems:'center'}}>
      <h2 style={{fontFamily:'Montserrat'}}>Table of diagnostic Homes per region</h2>
      </div>
      <table style={{ borderCollapse: "collapse", width: "80%", marginTop: "2%",marginBottom: "10%", }}>
        <thead>
          <tr>
            <th rowSpan={2} style={tableHeadersideBoxStyle}></th>
            {header1titles.map((title, index) => (
              <th key={index} style={tableHeaderStyle} colSpan={header2titles.length / 2}>
                {title}
              </th>
            ))}
          </tr>
          <tr>
            {header2titles.map((title, index) => (
              <th key={index} style={tableHeaderStyle}>
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} style={{ ...tableCellStyle, textAlign: "right" }}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      </center>
      <footer style={footerStyle}>HISP Physical teaser@2023 Created by @Saroni_Saitoria</footer>
    </div>
  );
};

const styles = {
  mainContainer:{
      width:'100vw',
      flex: 1,
      height:'100vh',
      justifyContent:'center',
      alignItems:'center',
      background: 'url(https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80) no-repeat center center fixed',
      backgroundSize: 'cover',
  },
}
const headerStyle = {
  backgroundColor: "#00a3e6",
  color: "white",
  textAlign: "center",
  padding: "20px",
  fontSize: "24px",
  fontFamily:'Montserrat-Bold',
};

const footerStyle = {
  backgroundColor: "#00a3e6",
  color: "white",
  textAlign: "center",
  padding: "10px",
  fontSize: "14px",
  fontFamily:'Montserrat',
  marginTop:'10%',
  height:'40px',
};

const tableHeaderStyle = {
  border: "1px solid black",
  padding: "8px",
  backgroundColor: "lightgray",
  textAlign: "center",
  fontFamily:'Montserrat',
};

const tableHeadersideBoxStyle = {
  border: "1px solid black",
};

const tableCellStyle = {
  border: "1px solid black",
  padding: "8px",
  textAlign: "right",
  fontFamily:'Montserrat',
};

export default Home;
