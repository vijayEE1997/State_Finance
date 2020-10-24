import React, { useState, useEffect } from "react"

import { feature } from "topojson-client"
import {select,scaleLinear}  from "d3"
import * as d3 from 'd3'

import _ from 'lodash';




export default function DemographMap({data}){

  
    const [geographies, setGeographies] = useState([])

    
          let w = -1120;
      
    useEffect(() =>
     {

        fetch("/india.json")
          .then(response => {
            if (response.status !== 200) {
              console.log(`There was a problem: ${response.status}`)
              return
                            }
            response.json().then(worlddata => {
              let x = feature(worlddata, worlddata.objects.india).features
              setGeographies(x)
            })
            
          })
        }, [data])


        useEffect(() => {   
            var cmin=10000000,cmax=0;      
            for(let state in data)
            {
                if(data[state]!=undefined)
                {
              
                  var value = parseFloat(data[state])      
                  if(state!="ALL INDIA")
                  {
                     if(value < cmin)
                       {cmin=value;}
                     if(value>cmax)
                       {cmax=value}
                  }
                }
              
            }
       

          
          
          
            const  colorScale= scaleLinear()
                    .domain([100, 1])
                    .range(["#ffcccb", "maroon"]);

            const projection  = d3.geoMercator()
                             
                                  .scale(1000)
                                  .translate([w,720]);
                                  

            const pathGenerator = d3.geoPath().projection(projection);

           const svg = select(".mapsvg");

           const states = svg
                .selectAll(".countries")
                .data(geographies)
                .join("path") 
                              
                .attr("fill",(d,i)=>{ 
                        var place = d.properties.st_nm
                        var val ;
                        var ref = data[place];
                       
                        if(!ref)
                         {
                       
                             return colorScale(0)
                         }
                        val = parseInt(data[place])
           
                        return colorScale(val)
                        } )
              .attr("d",(d,i)=>pathGenerator(d))
              .attr("stroke","#101010")
              .attr("stroke-width","0.4");

             
         
      
          },[geographies])


    return(<div>
        
     
    <svg className = "mapsvg" width='100%' height='600'>
    </svg>

    </div>)
}