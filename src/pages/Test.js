import React from "react";
import jsonData from "../json-data.json";

const diseaseID = jsonData.metaData.dimensions.dx;
const periodID = jsonData.metaData.dimensions.pe;
const regionID = jsonData.metaData.dimensions.ou;
const rowsData = jsonData.rows;

const Test = () => {
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
      <img src="/logo.png" width={100}/>
      <p style={{fontFamily:'Montserrat'}}>| Saroni Saitoria</p>
      </div>
      <div style={{display:'flex',textAlign:'center',justifyContent:'center',marginTop:20,alignItems:'center'}}>
      <h2 style={{fontFamily:'Montserrat'}}>Table of diagnostic tests per region</h2>
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
      background: 'url(/background2.jpg) no-repeat center center fixed',
      backgroundSize: 'cover',
      //marginBottom:20,
      //marginTop:'10vh',
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

export default Test;
