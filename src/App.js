import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios'
import './App.css';
import DemographMap from './Components/Map'

function App() {

  const [X, setX_data] = useState([]);
  const [Y, setY_data] = useState([]);
  const [X2, setX2_data] = useState([]);
  const [Y2, setY2_data] = useState([]);
  const [P1V, setP1] = useState([]);
  const [P2V, setP2] = useState([]);
  const [P3V, setP3] = useState([]);
  const [P4V, setP4] = useState([]);

  const URL = "https://elastic.airesearch.in/demographics_state_finance/_search"

  ///////////// BAR /////////////

  const query_body1 = {
    "query": {
      "bool": {
        "must": [
          { "match": { "VariableName.keyword": " I. TAX REVENUE (A+B)" } },
          { "match": { "Level3.keyword": " I. TAX REVENUE (A+B)" } }
        ]
      }
    }
  }

  const query_body2 = {
    "query": {
      "bool": {
        "must": [
          { "match": { "VariableName.keyword": " TOTAL EXPENDITURE (I+II+III)" } },
          { "match": { "Level2.keyword": "Revenue Expenditure (Revised Estimates)" } },
          { "match": { "Level3.keyword": " TOTAL EXPENDITURE (I+II+III)" } }



        ]
      }
    }
  }
  ///////////// BAR /////////////

  ///////////// PIE /////////////

  const query_body_P1 = {
    "query": {
      "bool": {
        "must": [
          { "match": { "VariableName.keyword": " A. State's Own Tax Revenue (1 to 3)" } },
          { "match": { "VariableName.keyword": " A. State's Own Tax Revenue (1 to 3)" } },
          { "match": { "Level2.keyword": "Revenue Receipts (Revised Estimates)" } },
          { "match": { "Level3.keyword": " A. State's Own Tax Revenue (1 to 3)" } }


        ]
      }
    }

  }
  const query_body_P2 = {
    "query": {
      "bool": {
        "must": [
          { "match": { "VariableName.keyword": " B. Share in Central Taxes (i to ix)" } },
          { "match": { "VariableName.keyword": " B. Share in Central Taxes (i to ix)" } },
          { "match": { "Level2.keyword": "Revenue Receipts (Revised Estimates)" } },
          { "match": { "Level3.keyword": " B. Share in Central Taxes (i to ix)" } }


        ]
      }
    }
  }
  const query_body_P3 = {
    "query": {
      "bool": {
        "must": [
          { "match": { "VariableName.keyword": " D.  Grants from the Centre (1 to 5)" } },
          { "match": { "VariableName.keyword": " D.  Grants from the Centre (1 to 5)" } },
          { "match": { "Level2.keyword": "Revenue Receipts (Revised Estimates)" } },
          { "match": { "Level3.keyword": " D.  Grants from the Centre (1 to 5)" } }


        ]
      }
    }
  }

  const query_body_P4 = {
    "query": {
      "bool": {
        "must": [
          { "match": { "VariableName.keyword": " C. State's Own Non-Tax Revenue (1 to 6)" } },
          { "match": { "VariableName.keyword": " C. State's Own Non-Tax Revenue (1 to 6)" } },
          { "match": { "Level2.keyword": "Revenue Receipts (Revised Estimates)" } },
          { "match": { "Level3.keyword": " C. State's Own Non-Tax Revenue (1 to 6)" } }


        ]
      }
    }
  }


  ///////////// PIE /////////////

  const url = "https://elastic.airesearch.in/demographics_v1_test/_search";


const [mapdata,setMapdata] = useState({})


    var query_body = {
        "query": {
          "bool": {
            "must": [
              {"match": {"Level1.keyword": "State Finances"}},
              {"match": {"Level2.keyword":"Gross Fiscal Deficit"}}
            ]
          }
        },
        "size": 50
      }


  useEffect(() => {

    var x_data;
    var y_data;

    var x2_data;
    var y2_data;

    var P1 = 0, P2 = 0, P3 = 0, P4 = 0;

///////////// BAR /////////////

    axios.post(URL, query_body1)
      .then(data => {

        var d = data.data.hits.hits.map(d => { return d._source.data }).map((data) => {
          return Object.values(data)
        })

        var dk = data.data.hits.hits.map(d => { return d._source.data }).map((data) => {
          return Object.keys(data)
        })

        x_data = dk[0]
        // x_data=x_data.map((value)=>{
        //   return parseInt(value)
        // })
        y_data = d[0]
        y_data = y_data.map((temp) => { return 0 })

        d.map((data) => {
          data.map((idata, i) => {
            if (idata != "")
              y_data[i] += parseFloat(idata)
          })
        })

        setX_data(x_data)
        setY_data(y_data)

      })
      .catch((er) => {
        console.log(er)
      })

    axios.post(URL, query_body2)
      .then(data => {
        var d = data.data.hits.hits.map(d => { return d._source.data }).map((data) => {
          return Object.values(data)
        })

        var dk = data.data.hits.hits.map(d => { return d._source.data }).map((data) => {
          return Object.keys(data)
        })

        x2_data = dk[0]
        // x_data=x_data.map((value)=>{
        //   return parseInt(value)
        // })
        y2_data = d[0]
        y2_data = y2_data.map((temp) => { return 0 })

        d.map((data) => {
          data.map((idata, i) => {
            if (idata != "")
              y2_data[i] += parseFloat(idata)
          })
        })

        setX2_data(x2_data)
        setY2_data(y2_data)

      })
      .catch((er) => {
        console.log(er)
      })


///////////// BAR /////////////
///////////// PIE /////////////

    axios.post(URL, query_body_P1)
      .then(data => {
        data.data.hits.hits.map((d) => {
          var qqq = Object.values(d._source.data)
          P1 += parseFloat(qqq[28])
        })
        setP1(P1)
      })
      .catch((er) => {
        console.log(er)
      })

    axios.post(URL, query_body_P2)
      .then(data => {
        data.data.hits.hits.map((d) => {
          var qqq = Object.values(d._source.data)
          P2 += parseFloat(qqq[28])
        })
        setP2(P2)
      })
      .catch((er) => {
        console.log(er)
      })

    axios.post(URL, query_body_P3)
      .then(data => {
        data.data.hits.hits.map((d) => {
          var qqq = Object.values(d._source.data)
          P3 += parseFloat(qqq[28])
        })
        setP3(P3)
      })
      .catch((er) => {
        console.log(er)
      })

    axios.post(URL, query_body_P4)
      .then(data => {
        data.data.hits.hits.map((d) => {
          var qqq = Object.values(d._source.data)
          P4 += parseFloat(qqq[28])
        })
        setP4(P4)
      })
      .catch((er) => {
        console.log(er)
      })

  ///////////// PIE /////////////

  axios.post(url,query_body)
  .then(d=>{
         var i = d.data.hits.hits
         var statedata={}
         i.map((item)=>{
             
         statedata[item._source.State]=item._source.data

         })
        
         //  console.log(statedata)

          var map = {}                  
         Object.keys(statedata).map((state)=>{    
         map[state] = statedata[state][2000]
        
          })
  
         setMapdata(map)
         // console.log(mapdata)
  }).catch(e=>{
      console.log(e)
  })

  }, [])

  return (
    <div className="App">
      <Plot
        data={[
          {
            x: X,
            y: Y,
            type: 'bar',
            name: 'Total Revenue',
            marker: { color: 'rgb(53, 61, 49)' },
          },
          {
            x: X2,
            y: Y2,
            type: 'bar',
            name: 'Total Expenditure',
            marker: { color: 'rgb(150, 18, 40)' },
          }
        ]}
        layout={{
          width: 1000, yaxis: {
            zeroline: true,
            showline: true
          }
        }}

      />

      <Plot
        data={[
          {
            values: [P1V, P2V, P3V, P4V],
            labels: ['State\'s Own Tax Revenue', 'Share in Central Taxes', 'Grants from the Centre', 'State\'s Own Non-Tax Revenue'],
            type: 'pie',
            // marker: { colors: ['rgb(156, 175, 126)', 'rgb(118, 36, 137)', 'rgb(134, 53, 101)', 'rgb(136, 55, 157)']},
          }
        ]}
        layout={{
          width: 1000, yaxis: {
            zeroline: true,
            showline: true
          }
        }}

      />
  <DemographMap data={mapdata}/>
    </div>
  );
}

export default App;
